import importerStore from '@/shared/importer/importer-store';
import { CicloMonteOreService } from '@/modules/ciclo-monte-ore/ciclo-monte-ore-service';
import cicloMonteOreImporterFields from '@/modules/ciclo-monte-ore/ciclo-monte-ore-importer-fields';
import { i18n } from '@/i18n';

export default importerStore(
  CicloMonteOreService.import,
  cicloMonteOreImporterFields,
  i18n('entities.cicloMonteOre.importer.fileName'),
  i18n('entities.cicloMonteOre.importer.hint'),
);
