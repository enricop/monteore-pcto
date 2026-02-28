<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.corso.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.corso.list.title"
        ></app-i18n>
      </h1>

      <app-corso-list-toolbar></app-corso-list-toolbar>
      <app-corso-list-filter></app-corso-list-filter>
      <app-corso-list-table></app-corso-list-table>
    </div>
  </div>
</template>

<script lang="ts">
import CorsoListFilter from '@/modules/corso/components/corso-list-filter.vue';
import CorsoListTable from '@/modules/corso/components/corso-list-table.vue';
import CorsoListToolbar from '@/modules/corso/components/corso-list-toolbar.vue';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-corso-list-page',

  components: {
    'app-corso-list-filter': CorsoListFilter,
    'app-corso-list-table': CorsoListTable,
    'app-corso-list-toolbar': CorsoListToolbar,
  },
});
</script>

<style></style>
