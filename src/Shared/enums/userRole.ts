export enum UserRole {
  administrator = 1,
  endUser = 2,
}

export function isUserRole(value: unknown): value is UserRole {
  return typeof value === 'number' && Object.values(UserRole).includes(value);
}
