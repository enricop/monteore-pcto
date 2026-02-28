import corsoListStore from '@/modules/corso/corso-list-store';
import corsoViewStore from '@/modules/corso/corso-view-store';
import corsoImporterStore from '@/modules/corso/corso-importer-store';
import corsoFormStore from '@/modules/corso/corso-form-store';
import corsoDestroyStore from '@/modules/corso/corso-destroy-store';

export default {
  namespaced: true,

  modules: {
    destroy: corsoDestroyStore,
    form: corsoFormStore,
    list: corsoListStore,
    view: corsoViewStore,
    importer: corsoImporterStore,
  },
};
