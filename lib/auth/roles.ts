export const ROLE_CODES = ["ADMIN", "FINANCE", "PM", "TEAM_MEMBER", "CLIENT"] as const;

export type RoleCode = (typeof ROLE_CODES)[number];

export const MANAGEMENT_ROLES: RoleCode[] = ["ADMIN", "FINANCE", "PM"];

export function isRoleCode(value: string): value is RoleCode {
  return ROLE_CODES.includes(value as RoleCode);
}
