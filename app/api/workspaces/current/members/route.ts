import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthContext } from "@/lib/auth/session";
import { assertRole } from "@/lib/auth/rbac";
import { ROLE_CODES } from "@/lib/auth/roles";
import { prisma } from "@/lib/prisma";
import { appendAuditLog } from "@/lib/server/audit-log";

const memberCreateSchema = z.object({
  userId: z.string().min(1),
  roleCode: z.enum(ROLE_CODES),
});

export async function GET(request: Request) {
  try {
    const auth = await getAuthContext();

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? "1");
    const pageSize = Math.min(Number(url.searchParams.get("pageSize") ?? "20"), 100);

    const [total, items] = await Promise.all([
      prisma.userWorkspace.count({
        where: {
          workspace_id: auth.workspaceId,
          deleted_at: null,
        },
      }),
      prisma.userWorkspace.findMany({
        where: {
          workspace_id: auth.workspaceId,
          deleted_at: null,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
          role: {
            select: {
              id: true,
              code: true,
              name: true,
            },
          },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          created_at: "desc",
        },
      }),
    ]);

    return NextResponse.json({
      page,
      pageSize,
      total,
      items,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unauthorized" },
      { status: 401 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const auth = await getAuthContext();
    assertRole(auth.role, ["ADMIN"]);

    const parsed = memberCreateSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const role = await prisma.role.findFirst({
      where: {
        workspace_id: auth.workspaceId,
        code: parsed.data.roleCode,
        deleted_at: null,
      },
    });

    if (!role) {
      return NextResponse.json({ error: "Role not configured for workspace" }, { status: 422 });
    }

    const existing = await prisma.userWorkspace.findFirst({
      where: {
        workspace_id: auth.workspaceId,
        user_id: parsed.data.userId,
      },
      include: {
        role: true,
      },
    });

    if (existing && !existing.deleted_at) {
      return NextResponse.json({ error: "User already a workspace member" }, { status: 409 });
    }

    const record = await prisma.userWorkspace.upsert({
      where: {
        workspace_id_user_id: {
          workspace_id: auth.workspaceId,
          user_id: parsed.data.userId,
        },
      },
      update: {
        role_id: role.id,
        updated_by: auth.userId,
        deleted_at: null,
      },
      create: {
        workspace_id: auth.workspaceId,
        user_id: parsed.data.userId,
        role_id: role.id,
        created_by: auth.userId,
        updated_by: auth.userId,
      },
      include: {
        role: true,
      },
    });

    await appendAuditLog({
      workspaceId: auth.workspaceId,
      actorUserId: auth.userId,
      entityType: "UserWorkspace",
      entityId: record.id,
      action: existing ? "workspace.member_role_updated" : "workspace.member_created",
      previousState: existing
        ? {
            roleCode: existing.role.code,
            deletedAt: existing.deleted_at,
          }
        : undefined,
      nextState: {
        roleCode: record.role.code,
      },
      metadata: {
        affectedUserId: record.user_id,
      },
    });

    return NextResponse.json(record, { status: existing ? 200 : 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unauthorized" },
      { status: 401 },
    );
  }
}
