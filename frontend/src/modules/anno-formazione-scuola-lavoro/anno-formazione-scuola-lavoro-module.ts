import routes from '@/modules/anno-formazione-scuola-lavoro/anno-formazione-scuola-lavoro-routes';
import store from '@/modules/anno-formazione-scuola-lavoro/anno-formazione-scuola-lavoro-store';
import AnnoFormazioneScuolaLavoroAutocompleteInput from '@/modules/anno-formazione-scuola-lavoro/components/anno-formazione-scuola-lavoro-autocomplete-input.vue';

export default {
  components: {
    'app-anno-formazione-scuola-lavoro-autocomplete-input': AnnoFormazioneScuolaLavoroAutocompleteInput,
  },
  routes,
  store,
};
