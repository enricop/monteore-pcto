import Layout from '@/modules/layout/components/layout.vue';
import Permissions from '@/security/permissions';

const CorsoFormazioneListPage = () =>
  import(
    '@/modules/corso-formazione/components/corso-formazione-list-page.vue'
  );
const CorsoFormazioneFormPage = () =>
  import(
    '@/modules/corso-formazione/components/corso-formazione-form-page.vue'
  );
const CorsoFormazioneViewPage = () =>
  import(
    '@/modules/corso-formazione/components/corso-formazione-view-page.vue'
  );
const CorsoFormazioneImporterPage = () =>
  import(
    '@/modules/corso-formazione/components/corso-formazione-importer-page.vue'
  );

export default [
  {
    name: '',
    path: '',
    component: Layout,
    meta: { auth: true },
    children: [
      {
        name: 'corsoFormazione',
        path: '/corso-formazione',
        component: CorsoFormazioneListPage,
        meta: {
          auth: true,
          permission: Permissions.values.corsoFormazioneRead,
        },
      },
      {
        name: 'corsoFormazioneNew',
        path: '/corso-formazione/new',
        component: CorsoFormazioneFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.corsoFormazioneCreate,
        },
      },
      {
        name: 'corsoFormazioneImporter',
        path: '/corso-formazione/import',
        component: CorsoFormazioneImporterPage,
        meta: {
          auth: true,
          permission: Permissions.values.corsoFormazioneImport,
        },
      },
      {
        name: 'corsoFormazioneEdit',
        path: '/corso-formazione/:id/edit',
        component: CorsoFormazioneFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.corsoFormazioneEdit,
        },
        props: true,
      },
      {
        name: 'corsoFormazioneView',
        path: '/corso-formazione/:id',
        component: CorsoFormazioneViewPage,
        meta: {
          auth: true,
          permission: Permissions.values.corsoFormazioneRead,
        },
        props: true,
      },
    ],
  },
];
