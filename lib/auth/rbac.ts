import type { RoleCode } from "@/lib/auth/roles";

export function assertRole(actorRole: RoleCode, allowedRoles: RoleCode[]): void {
  if (!allowedRoles.includes(actorRole)) {
    throw new Error("Forbidden: insufficient role");
  }
}

export function canAccessAssignedRecordsOnly(actorRole: RoleCode): boolean {
  return actorRole === "TEAM_MEMBER";
}
