import { prisma } from "@/lib/prisma";

interface AuditLogInput {
  workspaceId: string;
  actorUserId: string;
  entityType: string;
  entityId: string;
  action: string;
  previousState?: Record<string, unknown>;
  nextState?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export async function appendAuditLog(input: AuditLogInput): Promise<void> {
  await prisma.auditLog.create({
    data: {
      workspace_id: input.workspaceId,
      actor_user_id: input.actorUserId,
      entity_type: input.entityType,
      entity_id: input.entityId,
      action: input.action,
      previous_state: input.previousState,
      next_state: input.nextState,
      metadata: input.metadata,
    },
  });
}
