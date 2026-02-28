import Permissions from '@/security/permissions';
import { PermissionChecker } from '@/modules/user/permission-checker';

export class CorsoPermissions {
  read: boolean;
  import: boolean;
  corsoAutocomplete: boolean;
  create: boolean;
  edit: boolean;
  destroy: boolean;
  lockedForCurrentPlan: boolean;

  constructor(currentTenant, currentUser) {
    const permissionChecker = new PermissionChecker(
      currentTenant,
      currentUser,
    );

    this.read = permissionChecker.match(
      Permissions.values.corsoRead,
    );
    this.import = permissionChecker.match(
      Permissions.values.corsoImport,
    );
    this.corsoAutocomplete = permissionChecker.match(
      Permissions.values.corsoAutocomplete,
    );
    this.create = permissionChecker.match(
      Permissions.values.corsoCreate,
    );
    this.edit = permissionChecker.match(
      Permissions.values.corsoEdit,
    );
    this.destroy = permissionChecker.match(
      Permissions.values.corsoDestroy,
    );
    this.lockedForCurrentPlan = permissionChecker.lockedForCurrentPlan(
      Permissions.values.corsoRead,
    );
  }
}
