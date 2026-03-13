import corsoFormazioneListStore from '@/modules/corso-formazione/corso-formazione-list-store';
import corsoFormazioneViewStore from '@/modules/corso-formazione/corso-formazione-view-store';
import corsoFormazioneImporterStore from '@/modules/corso-formazione/corso-formazione-importer-store';
import corsoFormazioneFormStore from '@/modules/corso-formazione/corso-formazione-form-store';
import corsoFormazioneDestroyStore from '@/modules/corso-formazione/corso-formazione-destroy-store';

export default {
  namespaced: true,

  modules: {
    destroy: corsoFormazioneDestroyStore,
    form: corsoFormazioneFormStore,
    list: corsoFormazioneListStore,
    view: corsoFormazioneViewStore,
    importer: corsoFormazioneImporterStore,
  },
};
