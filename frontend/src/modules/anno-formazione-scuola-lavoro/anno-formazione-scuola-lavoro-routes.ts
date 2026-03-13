import Layout from '@/modules/layout/components/layout.vue';
import Permissions from '@/security/permissions';

const AnnoFormazioneScuolaLavoroListPage = () =>
  import(
    '@/modules/anno-formazione-scuola-lavoro/components/anno-formazione-scuola-lavoro-list-page.vue'
  );
const AnnoFormazioneScuolaLavoroFormPage = () =>
  import(
    '@/modules/anno-formazione-scuola-lavoro/components/anno-formazione-scuola-lavoro-form-page.vue'
  );
const AnnoFormazioneScuolaLavoroViewPage = () =>
  import(
    '@/modules/anno-formazione-scuola-lavoro/components/anno-formazione-scuola-lavoro-view-page.vue'
  );
const AnnoFormazioneScuolaLavoroImporterPage = () =>
  import(
    '@/modules/anno-formazione-scuola-lavoro/components/anno-formazione-scuola-lavoro-importer-page.vue'
  );

export default [
  {
    name: '',
    path: '',
    component: Layout,
    meta: { auth: true },
    children: [
      {
        name: 'annoFormazioneScuolaLavoro',
        path: '/anno-formazione-scuola-lavoro',
        component: AnnoFormazioneScuolaLavoroListPage,
        meta: {
          auth: true,
          permission: Permissions.values.annoFormazioneScuolaLavoroRead,
        },
      },
      {
        name: 'annoFormazioneScuolaLavoroNew',
        path: '/anno-formazione-scuola-lavoro/new',
        component: AnnoFormazioneScuolaLavoroFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.annoFormazioneScuolaLavoroCreate,
        },
      },
      {
        name: 'annoFormazioneScuolaLavoroImporter',
        path: '/anno-formazione-scuola-lavoro/import',
        component: AnnoFormazioneScuolaLavoroImporterPage,
        meta: {
          auth: true,
          permission: Permissions.values.annoFormazioneScuolaLavoroImport,
        },
      },
      {
        name: 'annoFormazioneScuolaLavoroEdit',
        path: '/anno-formazione-scuola-lavoro/:id/edit',
        component: AnnoFormazioneScuolaLavoroFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.annoFormazioneScuolaLavoroEdit,
        },
        props: true,
      },
      {
        name: 'annoFormazioneScuolaLavoroView',
        path: '/anno-formazione-scuola-lavoro/:id',
        component: AnnoFormazioneScuolaLavoroViewPage,
        meta: {
          auth: true,
          permission: Permissions.values.annoFormazioneScuolaLavoroRead,
        },
        props: true,
      },
    ],
  },
];
