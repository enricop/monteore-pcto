import Layout from '@/modules/layout/components/layout.vue';
import Permissions from '@/security/permissions';

const CicloMonteOreListPage = () =>
  import(
    '@/modules/ciclo-monte-ore/components/ciclo-monte-ore-list-page.vue'
  );
const CicloMonteOreFormPage = () =>
  import(
    '@/modules/ciclo-monte-ore/components/ciclo-monte-ore-form-page.vue'
  );
const CicloMonteOreViewPage = () =>
  import(
    '@/modules/ciclo-monte-ore/components/ciclo-monte-ore-view-page.vue'
  );
const CicloMonteOreImporterPage = () =>
  import(
    '@/modules/ciclo-monte-ore/components/ciclo-monte-ore-importer-page.vue'
  );

export default [
  {
    name: '',
    path: '',
    component: Layout,
    meta: { auth: true },
    children: [
      {
        name: 'cicloMonteOre',
        path: '/ciclo-monte-ore',
        component: CicloMonteOreListPage,
        meta: {
          auth: true,
          permission: Permissions.values.cicloMonteOreRead,
        },
      },
      {
        name: 'cicloMonteOreNew',
        path: '/ciclo-monte-ore/new',
        component: CicloMonteOreFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.cicloMonteOreCreate,
        },
      },
      {
        name: 'cicloMonteOreImporter',
        path: '/ciclo-monte-ore/import',
        component: CicloMonteOreImporterPage,
        meta: {
          auth: true,
          permission: Permissions.values.cicloMonteOreImport,
        },
      },
      {
        name: 'cicloMonteOreEdit',
        path: '/ciclo-monte-ore/:id/edit',
        component: CicloMonteOreFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.cicloMonteOreEdit,
        },
        props: true,
      },
      {
        name: 'cicloMonteOreView',
        path: '/ciclo-monte-ore/:id',
        component: CicloMonteOreViewPage,
        meta: {
          auth: true,
          permission: Permissions.values.cicloMonteOreRead,
        },
        props: true,
      },
    ],
  },
];
