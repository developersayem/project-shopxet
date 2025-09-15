
export type UserRole = "owner" | "staff";

export interface IUser {
  _id: string;
  avatar?: string;
  fullName: string;
  email: string;
  role: UserRole;
  ownerId?: string; // If staff, the admin's ID
  isActive: boolean;

  // Optional license info
  licenseKey?: string;
  licenseExpiresAt?: string; // ISO date string
  licenseLastSyncedAt?: string; // ISO date string
}
