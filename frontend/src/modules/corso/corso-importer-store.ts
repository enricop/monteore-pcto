import importerStore from '@/shared/importer/importer-store';
import { CorsoService } from '@/modules/corso/corso-service';
import corsoImporterFields from '@/modules/corso/corso-importer-fields';
import { i18n } from '@/i18n';

export default importerStore(
  CorsoService.import,
  corsoImporterFields,
  i18n('entities.corso.importer.fileName'),
  i18n('entities.corso.importer.hint'),
);
