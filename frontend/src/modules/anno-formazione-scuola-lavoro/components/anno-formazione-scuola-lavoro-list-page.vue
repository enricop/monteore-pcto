<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.annoFormazioneScuolaLavoro.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.annoFormazioneScuolaLavoro.list.title"
        ></app-i18n>
      </h1>

      <app-anno-formazione-scuola-lavoro-list-toolbar></app-anno-formazione-scuola-lavoro-list-toolbar>
      <app-anno-formazione-scuola-lavoro-list-filter></app-anno-formazione-scuola-lavoro-list-filter>
      <app-anno-formazione-scuola-lavoro-list-table></app-anno-formazione-scuola-lavoro-list-table>
    </div>
  </div>
</template>

<script lang="ts">
import AnnoFormazioneScuolaLavoroListFilter from '@/modules/anno-formazione-scuola-lavoro/components/anno-formazione-scuola-lavoro-list-filter.vue';
import AnnoFormazioneScuolaLavoroListTable from '@/modules/anno-formazione-scuola-lavoro/components/anno-formazione-scuola-lavoro-list-table.vue';
import AnnoFormazioneScuolaLavoroListToolbar from '@/modules/anno-formazione-scuola-lavoro/components/anno-formazione-scuola-lavoro-list-toolbar.vue';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-anno-formazione-scuola-lavoro-list-page',

  components: {
    'app-anno-formazione-scuola-lavoro-list-filter': AnnoFormazioneScuolaLavoroListFilter,
    'app-anno-formazione-scuola-lavoro-list-table': AnnoFormazioneScuolaLavoroListTable,
    'app-anno-formazione-scuola-lavoro-list-toolbar': AnnoFormazioneScuolaLavoroListToolbar,
  },
});
</script>

<style></style>
