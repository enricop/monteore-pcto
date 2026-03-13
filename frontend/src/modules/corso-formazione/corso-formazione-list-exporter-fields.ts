import { CorsoFormazioneModel } from '@/modules/corso-formazione/corso-formazione-model';

const { fields } = CorsoFormazioneModel;

export default [
  fields.id,
  fields.nome,
  fields.massimoNumeroIscritti,
  fields.attivo,
  fields.logo,
  fields.studentiIscritti,
  fields.createdAt,
  fields.updatedAt
];
