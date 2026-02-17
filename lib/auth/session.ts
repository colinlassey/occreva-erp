import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { RoleCode } from "@/lib/auth/roles";

export interface AuthContext {
  userId: string;
  workspaceId: string;
  role: RoleCode;
  userEmail: string;
}

export async function getAuthContext(): Promise<AuthContext> {
  const requestHeaders = await headers();
  const userId = requestHeaders.get("x-user-id");
  const workspaceId = requestHeaders.get("x-workspace-id");

  if (!userId || !workspaceId) {
    throw new Error("Unauthorized: missing auth headers");
  }

  const membership = await prisma.userWorkspace.findFirst({
    where: {
      user_id: userId,
      workspace_id: workspaceId,
      deleted_at: null,
      role: { deleted_at: null },
    },
    include: {
      user: true,
      role: true,
    },
  });

  if (!membership) {
    throw new Error("Forbidden: no workspace membership");
  }

  return {
    userId: membership.user_id,
    workspaceId: membership.workspace_id,
    role: membership.role.code as RoleCode,
    userEmail: membership.user.email,
  };
}
