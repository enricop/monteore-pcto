import importerStore from '@/shared/importer/importer-store';
import { CorsoFormazioneService } from '@/modules/corso-formazione/corso-formazione-service';
import corsoFormazioneImporterFields from '@/modules/corso-formazione/corso-formazione-importer-fields';
import { i18n } from '@/i18n';

export default importerStore(
  CorsoFormazioneService.import,
  corsoFormazioneImporterFields,
  i18n('entities.corsoFormazione.importer.fileName'),
  i18n('entities.corsoFormazione.importer.hint'),
);
