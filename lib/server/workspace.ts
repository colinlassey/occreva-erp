import { prisma } from "@/lib/prisma";

export async function getWorkspaceScopedUser(workspaceId: string, userId: string) {
  return prisma.userWorkspace.findFirst({
    where: {
      workspace_id: workspaceId,
      user_id: userId,
      deleted_at: null,
    },
    include: {
      role: true,
      user: true,
    },
  });
}
