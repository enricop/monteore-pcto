import { i18n } from '@/i18n';
import IdField from '@/shared/fields/id-field';
import { GenericModel } from '@/shared/model/generic-model';
import DateTimeRangeField from '@/shared/fields/date-time-range-field';
import DateTimeField from '@/shared/fields/date-time-field';
import StringField from '@/shared/fields/string-field';
import BooleanField from '@/shared/fields/boolean-field';
import DateField from '@/shared/fields/date-field';
import DateRangeField from '@/shared/fields/date-range-field';
import { CorsoField } from '@/modules/corso/corso-field';
import { UserField } from '@/modules/user/user-field';

function label(name) {
  return i18n(`entities.cicloMonteOre.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  nomeCiclo: new StringField('nomeCiclo', label('nomeCiclo'), {}),
  inizioCiclo: new DateField('inizioCiclo', label('inizioCiclo'), {}),
  fineCiclo: new DateField('fineCiclo', label('fineCiclo'), {}),
  attivo: new BooleanField('attivo', label('attivo'), {}),
  amministratoreMonteOre: UserField.relationToOne('amministratoreMonteOre', label('amministratoreMonteOre'), {}),
  studenti: UserField.relationToMany('studenti', label('studenti'), {}),
  corsi: CorsoField.relationToMany('corsi', label('corsi'), {}),
  createdAt: new DateTimeField(
    'createdAt',
    label('createdAt'),
  ),
  updatedAt: new DateTimeField(
    'updatedAt',
    label('updatedAt'),
  ),
  createdAtRange: new DateTimeRangeField(
    'createdAtRange',
    label('createdAtRange'),
  ),
  inizioCicloRange: new DateRangeField(
    'inizioCicloRange',
    label('inizioCicloRange'),
  ),
  fineCicloRange: new DateRangeField(
    'fineCicloRange',
    label('fineCicloRange'),
  ),
};

export class CicloMonteOreModel extends GenericModel {
  static get fields() {
    return fields;
  }
}
