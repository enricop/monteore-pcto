import { AnnoFormazioneScuolaLavoroModel } from '@/modules/anno-formazione-scuola-lavoro/anno-formazione-scuola-lavoro-model';

const { fields } = AnnoFormazioneScuolaLavoroModel;

export default [
  fields.id,
  fields.nomeAnno,
  fields.inizioCiclo,
  fields.fineCiclo,
  fields.attivo,
  fields.amministratoriCorsiFormazione,
  fields.studentiImmatricolati,
  fields.corsiDisponibili,
  fields.numeroAnno,
  fields.createdAt,
  fields.updatedAt
];
