import cicloMonteOreListStore from '@/modules/ciclo-monte-ore/ciclo-monte-ore-list-store';
import cicloMonteOreViewStore from '@/modules/ciclo-monte-ore/ciclo-monte-ore-view-store';
import cicloMonteOreImporterStore from '@/modules/ciclo-monte-ore/ciclo-monte-ore-importer-store';
import cicloMonteOreFormStore from '@/modules/ciclo-monte-ore/ciclo-monte-ore-form-store';
import cicloMonteOreDestroyStore from '@/modules/ciclo-monte-ore/ciclo-monte-ore-destroy-store';

export default {
  namespaced: true,

  modules: {
    destroy: cicloMonteOreDestroyStore,
    form: cicloMonteOreFormStore,
    list: cicloMonteOreListStore,
    view: cicloMonteOreViewStore,
    importer: cicloMonteOreImporterStore,
  },
};
