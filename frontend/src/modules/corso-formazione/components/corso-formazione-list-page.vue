<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.corsoFormazione.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.corsoFormazione.list.title"
        ></app-i18n>
      </h1>

      <app-corso-formazione-list-toolbar></app-corso-formazione-list-toolbar>
      <app-corso-formazione-list-filter></app-corso-formazione-list-filter>
      <app-corso-formazione-list-table></app-corso-formazione-list-table>
    </div>
  </div>
</template>

<script lang="ts">
import CorsoFormazioneListFilter from '@/modules/corso-formazione/components/corso-formazione-list-filter.vue';
import CorsoFormazioneListTable from '@/modules/corso-formazione/components/corso-formazione-list-table.vue';
import CorsoFormazioneListToolbar from '@/modules/corso-formazione/components/corso-formazione-list-toolbar.vue';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-corso-formazione-list-page',

  components: {
    'app-corso-formazione-list-filter': CorsoFormazioneListFilter,
    'app-corso-formazione-list-table': CorsoFormazioneListTable,
    'app-corso-formazione-list-toolbar': CorsoFormazioneListToolbar,
  },
});
</script>

<style></style>
