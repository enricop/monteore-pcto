import { CicloMonteOreModel } from '@/modules/ciclo-monte-ore/ciclo-monte-ore-model';

const { fields } = CicloMonteOreModel;

export default [
  fields.id,
  fields.nomeCiclo,
  fields.inizioCiclo,
  fields.fineCiclo,
  fields.attivo,
  fields.amministratoreMonteOre,
  fields.studenti,
  fields.corsi,
  fields.createdAt,
  fields.updatedAt
];
