import { i18n } from '@/i18n';
import IdField from '@/shared/fields/id-field';
import { GenericModel } from '@/shared/model/generic-model';
import DateTimeRangeField from '@/shared/fields/date-time-range-field';
import DateTimeField from '@/shared/fields/date-time-field';
import IntegerField from '@/shared/fields/integer-field';
import IntegerRangeField from '@/shared/fields/integer-range-field';
import StringField from '@/shared/fields/string-field';
import BooleanField from '@/shared/fields/boolean-field';
import { UserField } from '@/modules/user/user-field';
import ImagesField from '@/shared/fields/images-field';
import Storage from '@/security/storage';

function label(name) {
  return i18n(`entities.corsoFormazione.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  nome: new StringField('nome', label('nome'), {}),
  massimoNumeroIscritti: new IntegerField('massimoNumeroIscritti', label('massimoNumeroIscritti'), {}),
  attivo: new BooleanField('attivo', label('attivo'), {}),
  logo: new ImagesField('logo', label('logo'), Storage.values.corsoFormazioneLogo, {}),
  studentiIscritti: UserField.relationToMany('studentiIscritti', label('studentiIscritti'), {}),
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
  massimoNumeroIscrittiRange: new IntegerRangeField(
    'massimoNumeroIscrittiRange',
    label('massimoNumeroIscrittiRange'),
  ),
};

export class CorsoFormazioneModel extends GenericModel {
  static get fields() {
    return fields;
  }
}
