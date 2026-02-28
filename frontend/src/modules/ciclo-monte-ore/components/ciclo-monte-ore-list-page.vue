<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.cicloMonteOre.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.cicloMonteOre.list.title"
        ></app-i18n>
      </h1>

      <app-ciclo-monte-ore-list-toolbar></app-ciclo-monte-ore-list-toolbar>
      <app-ciclo-monte-ore-list-filter></app-ciclo-monte-ore-list-filter>
      <app-ciclo-monte-ore-list-table></app-ciclo-monte-ore-list-table>
    </div>
  </div>
</template>

<script lang="ts">
import CicloMonteOreListFilter from '@/modules/ciclo-monte-ore/components/ciclo-monte-ore-list-filter.vue';
import CicloMonteOreListTable from '@/modules/ciclo-monte-ore/components/ciclo-monte-ore-list-table.vue';
import CicloMonteOreListToolbar from '@/modules/ciclo-monte-ore/components/ciclo-monte-ore-list-toolbar.vue';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-ciclo-monte-ore-list-page',

  components: {
    'app-ciclo-monte-ore-list-filter': CicloMonteOreListFilter,
    'app-ciclo-monte-ore-list-table': CicloMonteOreListTable,
    'app-ciclo-monte-ore-list-toolbar': CicloMonteOreListToolbar,
  },
});
</script>

<style></style>
