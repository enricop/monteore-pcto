import routes from '@/modules/corso/corso-routes';
import store from '@/modules/corso/corso-store';
import CorsoAutocompleteInput from '@/modules/corso/components/corso-autocomplete-input.vue';

export default {
  components: {
    'app-corso-autocomplete-input': CorsoAutocompleteInput,
  },
  routes,
  store,
};
