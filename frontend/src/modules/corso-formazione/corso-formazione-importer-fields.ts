import { CorsoFormazioneModel } from '@/modules/corso-formazione/corso-formazione-model';

const { fields } = CorsoFormazioneModel;

export default [
  fields.nome,
  fields.massimoNumeroIscritti,
  fields.attivo,
  fields.logo,
  fields.studentiIscritti,
];
