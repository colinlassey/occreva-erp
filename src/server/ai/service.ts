export type AiContext = {
  workspaceId: string;
  actorUserId: string;
};

export class AiService {
  async assertAllowed(_context: AiContext): Promise<void> {
    // Future implementation: enforce RBAC and redaction policies.
  }

  async getPromptTemplate(_name: string): Promise<string> {
    // Future implementation: load server-side prompt template only.
    return "";
  }
}
