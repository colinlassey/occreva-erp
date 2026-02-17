export interface AIContext {
  workspaceId: string;
  userId: string;
  role: "ADMIN" | "FINANCE" | "PM" | "TEAM_MEMBER" | "CLIENT";
}

export class AIService {
  validatePermissions(_context: AIContext): void {
    // Stub for v2 AI features.
  }

  redactSensitiveData(input: string): string {
    return input;
  }
}
