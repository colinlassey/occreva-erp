export const AUTH_PROVIDER = "Auth.js" as const;

/**
 * Temporary bootstrap note:
 * We keep request-header based identity resolution until Auth.js session wiring
 * is introduced in the next implementation step.
 */
export const AUTH_BOOTSTRAP_MODE = "header-identity" as const;
