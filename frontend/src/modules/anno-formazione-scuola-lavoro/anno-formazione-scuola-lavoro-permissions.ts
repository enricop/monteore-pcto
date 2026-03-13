import Permissions from '@/security/permissions';
import { PermissionChecker } from '@/modules/user/permission-checker';

export class AnnoFormazioneScuolaLavoroPermissions {
  read: boolean;
  import: boolean;
  annoFormazioneScuolaLavoroAutocomplete: boolean;
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
      Permissions.values.annoFormazioneScuolaLavoroRead,
    );
    this.import = permissionChecker.match(
      Permissions.values.annoFormazioneScuolaLavoroImport,
    );
    this.annoFormazioneScuolaLavoroAutocomplete = permissionChecker.match(
      Permissions.values.annoFormazioneScuolaLavoroAutocomplete,
    );
    this.create = permissionChecker.match(
      Permissions.values.annoFormazioneScuolaLavoroCreate,
    );
    this.edit = permissionChecker.match(
      Permissions.values.annoFormazioneScuolaLavoroEdit,
    );
    this.destroy = permissionChecker.match(
      Permissions.values.annoFormazioneScuolaLavoroDestroy,
    );
    this.lockedForCurrentPlan = permissionChecker.lockedForCurrentPlan(
      Permissions.values.annoFormazioneScuolaLavoroRead,
    );
  }
}
