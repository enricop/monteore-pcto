import Permissions from '@/security/permissions';
import { PermissionChecker } from '@/modules/user/permission-checker';

export class CicloMonteOrePermissions {
  read: boolean;
  import: boolean;
  cicloMonteOreAutocomplete: boolean;
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
      Permissions.values.cicloMonteOreRead,
    );
    this.import = permissionChecker.match(
      Permissions.values.cicloMonteOreImport,
    );
    this.cicloMonteOreAutocomplete = permissionChecker.match(
      Permissions.values.cicloMonteOreAutocomplete,
    );
    this.create = permissionChecker.match(
      Permissions.values.cicloMonteOreCreate,
    );
    this.edit = permissionChecker.match(
      Permissions.values.cicloMonteOreEdit,
    );
    this.destroy = permissionChecker.match(
      Permissions.values.cicloMonteOreDestroy,
    );
    this.lockedForCurrentPlan = permissionChecker.lockedForCurrentPlan(
      Permissions.values.cicloMonteOreRead,
    );
  }
}
