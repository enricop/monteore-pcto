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
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userAutocomplete: {
        id: 'userAutocomplete',
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente],
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
      annoFormazioneScuolaLavoroImport: {
        id: 'annoFormazioneScuolaLavoroImport',
        allowedRoles: [roles.admin, roles.amministrazione],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      annoFormazioneScuolaLavoroCreate: {
        id: 'annoFormazioneScuolaLavoroCreate',
        allowedRoles: [roles.admin, roles.amministrazione],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      annoFormazioneScuolaLavoroEdit: {
        id: 'annoFormazioneScuolaLavoroEdit',
        allowedRoles: [roles.admin, roles.amministrazione],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      annoFormazioneScuolaLavoroDestroy: {
        id: 'annoFormazioneScuolaLavoroDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      annoFormazioneScuolaLavoroRead: {
        id: 'annoFormazioneScuolaLavoroRead',
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente, roles.studente],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      annoFormazioneScuolaLavoroAutocomplete: {
        id: 'annoFormazioneScuolaLavoroAutocomplete',
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

      iscrizioneCorsoImport: {
        id: 'iscrizioneCorsoImport',
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente, roles.studente],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      iscrizioneCorsoCreate: {
        id: 'iscrizioneCorsoCreate',
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente, roles.studente],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      iscrizioneCorsoEdit: {
        id: 'iscrizioneCorsoEdit',
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente, roles.studente],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      iscrizioneCorsoDestroy: {
        id: 'iscrizioneCorsoDestroy',
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente, roles.studente],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      iscrizioneCorsoRead: {
        id: 'iscrizioneCorsoRead',
        allowedRoles: [roles.admin, roles.amministrazione, roles.docente, roles.studente],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      iscrizioneCorsoAutocomplete: {
        id: 'iscrizioneCorsoAutocomplete',
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
