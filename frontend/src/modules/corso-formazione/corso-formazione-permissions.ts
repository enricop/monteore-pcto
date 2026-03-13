import Permissions from '@/security/permissions';
import { PermissionChecker } from '@/modules/user/permission-checker';

export class CorsoFormazionePermissions {
  read: boolean;
  import: boolean;
  corsoFormazioneAutocomplete: boolean;
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
      Permissions.values.corsoFormazioneRead,
    );
    this.import = permissionChecker.match(
      Permissions.values.corsoFormazioneImport,
    );
    this.corsoFormazioneAutocomplete = permissionChecker.match(
      Permissions.values.corsoFormazioneAutocomplete,
    );
    this.create = permissionChecker.match(
      Permissions.values.corsoFormazioneCreate,
    );
    this.edit = permissionChecker.match(
      Permissions.values.corsoFormazioneEdit,
    );
    this.destroy = permissionChecker.match(
      Permissions.values.corsoFormazioneDestroy,
    );
    this.lockedForCurrentPlan = permissionChecker.lockedForCurrentPlan(
      Permissions.values.corsoFormazioneRead,
    );
  }
}
