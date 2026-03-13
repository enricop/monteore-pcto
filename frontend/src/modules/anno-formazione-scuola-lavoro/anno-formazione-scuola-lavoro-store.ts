import annoFormazioneScuolaLavoroListStore from '@/modules/anno-formazione-scuola-lavoro/anno-formazione-scuola-lavoro-list-store';
import annoFormazioneScuolaLavoroViewStore from '@/modules/anno-formazione-scuola-lavoro/anno-formazione-scuola-lavoro-view-store';
import annoFormazioneScuolaLavoroImporterStore from '@/modules/anno-formazione-scuola-lavoro/anno-formazione-scuola-lavoro-importer-store';
import annoFormazioneScuolaLavoroFormStore from '@/modules/anno-formazione-scuola-lavoro/anno-formazione-scuola-lavoro-form-store';
import annoFormazioneScuolaLavoroDestroyStore from '@/modules/anno-formazione-scuola-lavoro/anno-formazione-scuola-lavoro-destroy-store';

export default {
  namespaced: true,

  modules: {
    destroy: annoFormazioneScuolaLavoroDestroyStore,
    form: annoFormazioneScuolaLavoroFormStore,
    list: annoFormazioneScuolaLavoroListStore,
    view: annoFormazioneScuolaLavoroViewStore,
    importer: annoFormazioneScuolaLavoroImporterStore,
  },
};
