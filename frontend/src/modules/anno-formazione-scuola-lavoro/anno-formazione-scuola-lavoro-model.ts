import { i18n } from '@/i18n';
import IdField from '@/shared/fields/id-field';
import { GenericModel } from '@/shared/model/generic-model';
import DateTimeRangeField from '@/shared/fields/date-time-range-field';
import DateTimeField from '@/shared/fields/date-time-field';
import IntegerField from '@/shared/fields/integer-field';
import IntegerRangeField from '@/shared/fields/integer-range-field';
import StringField from '@/shared/fields/string-field';
import BooleanField from '@/shared/fields/boolean-field';
import DateField from '@/shared/fields/date-field';
import DateRangeField from '@/shared/fields/date-range-field';
import { CorsoFormazioneField } from '@/modules/corso-formazione/corso-formazione-field';
import { UserField } from '@/modules/user/user-field';

function label(name) {
  return i18n(`entities.annoFormazioneScuolaLavoro.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  nomeAnno: new StringField('nomeAnno', label('nomeAnno'), {}),
  inizioCiclo: new DateField('inizioCiclo', label('inizioCiclo'), {}),
  fineCiclo: new DateField('fineCiclo', label('fineCiclo'), {}),
  attivo: new BooleanField('attivo', label('attivo'), {}),
  amministratoriCorsiFormazione: UserField.relationToMany('amministratoriCorsiFormazione', label('amministratoriCorsiFormazione'), {}),
  studentiImmatricolati: UserField.relationToMany('studentiImmatricolati', label('studentiImmatricolati'), {}),
  corsiDisponibili: CorsoFormazioneField.relationToMany('corsiDisponibili', label('corsiDisponibili'), {}),
  numeroAnno: new IntegerField('numeroAnno', label('numeroAnno'), {}),
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
  numeroAnnoRange: new IntegerRangeField(
    'numeroAnnoRange',
    label('numeroAnnoRange'),
  ),
};

export class AnnoFormazioneScuolaLavoroModel extends GenericModel {
  static get fields() {
    return fields;
  }
}
