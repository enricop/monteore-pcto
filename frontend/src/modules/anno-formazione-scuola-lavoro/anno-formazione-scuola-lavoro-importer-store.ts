import importerStore from '@/shared/importer/importer-store';
import { AnnoFormazioneScuolaLavoroService } from '@/modules/anno-formazione-scuola-lavoro/anno-formazione-scuola-lavoro-service';
import annoFormazioneScuolaLavoroImporterFields from '@/modules/anno-formazione-scuola-lavoro/anno-formazione-scuola-lavoro-importer-fields';
import { i18n } from '@/i18n';

export default importerStore(
  AnnoFormazioneScuolaLavoroService.import,
  annoFormazioneScuolaLavoroImporterFields,
  i18n('entities.annoFormazioneScuolaLavoro.importer.fileName'),
  i18n('entities.annoFormazioneScuolaLavoro.importer.hint'),
);
