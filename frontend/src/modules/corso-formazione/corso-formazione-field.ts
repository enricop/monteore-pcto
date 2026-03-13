import { CorsoFormazioneService } from '@/modules/corso-formazione/corso-formazione-service';
import RelationToOneField from '@/shared/fields/relation-to-one-field';
import RelationToManyField from '@/shared/fields/relation-to-many-field';
import Permissions from '@/security/permissions';

export class CorsoFormazioneField {
  static relationToOne(name, label, options) {
    return new RelationToOneField(
      name,
      label,
      '/corso-formazione',
      Permissions.values.corsoFormazioneRead,
      CorsoFormazioneService.listAutocomplete,
      (record) => {
        if (!record) {
          return null;
        }

        return {
          id: record.id,
          label: record.nome,
        };
      },
      options,
    );
  }

  static relationToMany(name, label, options) {
    return new RelationToManyField(
      name,
      label,
      '/corso-formazione',
      Permissions.values.corsoFormazioneRead,
      CorsoFormazioneService.listAutocomplete,
      (record) => {
        if (!record) {
          return null;
        }

        return {
          id: record.id,
          label: record.nome,
        };
      },
      options,
    );
  }
}
