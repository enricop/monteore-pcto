import routes from '@/modules/ciclo-monte-ore/ciclo-monte-ore-routes';
import store from '@/modules/ciclo-monte-ore/ciclo-monte-ore-store';
import CicloMonteOreAutocompleteInput from '@/modules/ciclo-monte-ore/components/ciclo-monte-ore-autocomplete-input.vue';

export default {
  components: {
    'app-ciclo-monte-ore-autocomplete-input': CicloMonteOreAutocompleteInput,
  },
  routes,
  store,
};
