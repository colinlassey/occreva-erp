import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const auth = await getAuthContext();

    const workspace = await prisma.workspace.findFirst({
      where: {
        id: auth.workspaceId,
        deleted_at: null,
      },
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!workspace) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    return NextResponse.json(workspace);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unauthorized" },
      { status: 401 },
    );
  }
}
