import Layout from '@/modules/layout/components/layout.vue';
import Permissions from '@/security/permissions';

const CorsoListPage = () =>
  import(
    '@/modules/corso/components/corso-list-page.vue'
  );
const CorsoFormPage = () =>
  import(
    '@/modules/corso/components/corso-form-page.vue'
  );
const CorsoViewPage = () =>
  import(
    '@/modules/corso/components/corso-view-page.vue'
  );
const CorsoImporterPage = () =>
  import(
    '@/modules/corso/components/corso-importer-page.vue'
  );

export default [
  {
    name: '',
    path: '',
    component: Layout,
    meta: { auth: true },
    children: [
      {
        name: 'corso',
        path: '/corso',
        component: CorsoListPage,
        meta: {
          auth: true,
          permission: Permissions.values.corsoRead,
        },
      },
      {
        name: 'corsoNew',
        path: '/corso/new',
        component: CorsoFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.corsoCreate,
        },
      },
      {
        name: 'corsoImporter',
        path: '/corso/import',
        component: CorsoImporterPage,
        meta: {
          auth: true,
          permission: Permissions.values.corsoImport,
        },
      },
      {
        name: 'corsoEdit',
        path: '/corso/:id/edit',
        component: CorsoFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.corsoEdit,
        },
        props: true,
      },
      {
        name: 'corsoView',
        path: '/corso/:id',
        component: CorsoViewPage,
        meta: {
          auth: true,
          permission: Permissions.values.corsoRead,
        },
        props: true,
      },
    ],
  },
];
