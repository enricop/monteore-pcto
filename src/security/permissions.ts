import Roles from './roles';
import Plans from './plans';
import Storage from './storage';

const storage = Storage.values;
const roles = Roles.values;
const plans = Plans.values;

class Permissions {
  static get values() {
    return {
      tenantEdit: {
        id: 'tenantEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      tenantDestroy: {
        id: 'tenantDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      planEdit: {
        id: 'planEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      planRead: {
        id: 'planRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userEdit: {
        id: 'userEdit',
        allowedRoles: [roles.admin, roles.amministrazione],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userDestroy: {
        id: 'userDestroy',
        allowedRoles: [roles.admin, roles.amministrazione],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userCreate: {
        id: 'userCreate',
        allowedRoles: [roles.admin, roles.amministrazione],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userImport: {
        id: 'userImport',
        allowedRoles: [roles.admin, roles.amministrazione],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userRead: {
        id: 'userRead',
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente, roles.studente],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userAutocomplete: {
        id: 'userAutocomplete',
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente, roles.studente],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      auditLogRead: {
        id: 'auditLogRead',
        allowedRoles: [roles.admin, roles.amministrazione],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      settingsEdit: {
        id: 'settingsEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.settingsBackgroundImages,
          storage.settingsLogos,
        ],
      },
      annoScolasticoFormazioneImport: {
        id: 'annoScolasticoFormazioneImport',
        allowedRoles: [roles.admin, roles.amministrazione],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      annoScolasticoFormazioneCreate: {
        id: 'annoScolasticoFormazioneCreate',
        allowedRoles: [roles.admin, roles.amministrazione],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      annoScolasticoFormazioneEdit: {
        id: 'annoScolasticoFormazioneEdit',
        allowedRoles: [roles.admin, roles.amministrazione],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      annoScolasticoFormazioneDestroy: {
        id: 'annoScolasticoFormazioneDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      annoScolasticoFormazioneRead: {
        id: 'annoScolasticoFormazioneRead',
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente, roles.studente],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      annoScolasticoFormazioneAutocomplete: {
        id: 'annoScolasticoFormazioneAutocomplete',
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente, roles.studente],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      corsoFormazioneImport: {
        id: 'corsoFormazioneImport',
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      corsoFormazioneCreate: {
        id: 'corsoFormazioneCreate',
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.corsoFormazioneLogo,
        ],
      },
      corsoFormazioneEdit: {
        id: 'corsoFormazioneEdit',
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.corsoFormazioneLogo,
        ],
      },
      corsoFormazioneDestroy: {
        id: 'corsoFormazioneDestroy',
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.corsoFormazioneLogo,
        ],
      },
      corsoFormazioneRead: {
        id: 'corsoFormazioneRead',
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente, roles.studente],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      corsoFormazioneAutocomplete: {
        id: 'corsoFormazioneAutocomplete',
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente, roles.studente],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      iscrizioneImport: {
        id: 'iscrizioneImport',
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      iscrizioneCreate: {
        id: 'iscrizioneCreate',
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente, roles.studente],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      iscrizioneEdit: {
        id: 'iscrizioneEdit',
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente, roles.studente],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      iscrizioneDestroy: {
        id: 'iscrizioneDestroy',
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente, roles.studente],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      iscrizioneRead: {
        id: 'iscrizioneRead',
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente, roles.studente],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      iscrizioneAutocomplete: {
        id: 'iscrizioneAutocomplete',
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente, roles.studente],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

export default Permissions;
