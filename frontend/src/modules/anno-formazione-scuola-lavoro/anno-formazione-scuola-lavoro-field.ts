import { AnnoFormazioneScuolaLavoroService } from '@/modules/anno-formazione-scuola-lavoro/anno-formazione-scuola-lavoro-service';
import RelationToOneField from '@/shared/fields/relation-to-one-field';
import RelationToManyField from '@/shared/fields/relation-to-many-field';
import Permissions from '@/security/permissions';

export class AnnoFormazioneScuolaLavoroField {
  static relationToOne(name, label, options) {
    return new RelationToOneField(
      name,
      label,
      '/anno-formazione-scuola-lavoro',
      Permissions.values.annoFormazioneScuolaLavoroRead,
      AnnoFormazioneScuolaLavoroService.listAutocomplete,
      (record) => {
        if (!record) {
          return null;
        }

        return {
          id: record.id,
          label: record.id,
        };
      },
      options,
    );
  }

  static relationToMany(name, label, options) {
    return new RelationToManyField(
      name,
      label,
      '/anno-formazione-scuola-lavoro',
      Permissions.values.annoFormazioneScuolaLavoroRead,
      AnnoFormazioneScuolaLavoroService.listAutocomplete,
      (record) => {
        if (!record) {
          return null;
        }

        return {
          id: record.id,
          label: record.id,
        };
      },
      options,
    );
  }
}
