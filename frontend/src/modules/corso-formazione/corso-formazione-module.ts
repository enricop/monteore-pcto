import routes from '@/modules/corso-formazione/corso-formazione-routes';
import store from '@/modules/corso-formazione/corso-formazione-store';
import CorsoFormazioneAutocompleteInput from '@/modules/corso-formazione/components/corso-formazione-autocomplete-input.vue';

export default {
  components: {
    'app-corso-formazione-autocomplete-input': CorsoFormazioneAutocompleteInput,
  },
  routes,
  store,
};
