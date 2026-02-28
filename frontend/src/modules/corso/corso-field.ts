import { CorsoService } from '@/modules/corso/corso-service';
import RelationToOneField from '@/shared/fields/relation-to-one-field';
import RelationToManyField from '@/shared/fields/relation-to-many-field';
import Permissions from '@/security/permissions';

export class CorsoField {
  static relationToOne(name, label, options) {
    return new RelationToOneField(
      name,
      label,
      '/corso',
      Permissions.values.corsoRead,
      CorsoService.listAutocomplete,
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
      '/corso',
      Permissions.values.corsoRead,
      CorsoService.listAutocomplete,
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
