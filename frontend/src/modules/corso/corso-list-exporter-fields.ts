import { CorsoModel } from '@/modules/corso/corso-model';

const { fields } = CorsoModel;

export default [
  fields.id,
  fields.nome,
  fields.massimoNumeroIscritti,
  fields.attivo,
  fields.logo,
  fields.studentiIscritti,
  fields.studentiAmmessi,
  fields.createdAt,
  fields.updatedAt
];
