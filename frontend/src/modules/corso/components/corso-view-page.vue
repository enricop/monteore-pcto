<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/corso' }">
        <app-i18n code="entities.corso.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n
          code="entities.corso.view.title"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.corso.view.title"
        ></app-i18n>
      </h1>

      <div
        class="app-page-spinner"
        v-if="loading"
        v-loading="loading"
      ></div>

      <app-corso-view-toolbar
        v-if="record"
      ></app-corso-view-toolbar>

      <el-form
        :label-position="labelPosition"
        :label-width="labelWidthForm"
        @submit.prevent.native
        class="form"
        v-if="record"
      >
        <app-view-item-text :label="fields.nome.label" :value="presenter(record, 'nome')"></app-view-item-text>

        <app-view-item-text :label="fields.massimoNumeroIscritti.label" :value="presenter(record, 'massimoNumeroIscritti')"></app-view-item-text>

        <app-view-item-text :label="fields.attivo.label" :value="presenter(record, 'attivo')"></app-view-item-text>

        <app-view-item-image :label="fields.logo.label" :value="presenter(record, 'logo')"></app-view-item-image>

        <app-view-item-relation-to-many
          :label="fields.studentiIscritti.label"
          :permission="fields.studentiIscritti.readPermission"
          :url="fields.studentiIscritti.viewUrl"
          :value="presenter(record, 'studentiIscritti')"
        ></app-view-item-relation-to-many>

        <app-view-item-relation-to-many
          :label="fields.studentiAmmessi.label"
          :permission="fields.studentiAmmessi.readPermission"
          :url="fields.studentiAmmessi.viewUrl"
          :value="presenter(record, 'studentiAmmessi')"
        ></app-view-item-relation-to-many>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import CorsoViewToolbar from '@/modules/corso/components/corso-view-toolbar.vue';
import { CorsoModel } from '@/modules/corso/corso-model';

const { fields } = CorsoModel;

import Vue from 'vue';

export default Vue.extend({
  name: 'app-corso-view-page',

  props: ['id'],

  components: {
    'app-corso-view-toolbar': CorsoViewToolbar,
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
      record: 'corso/view/record',
      loading: 'corso/view/loading',
    }),

    fields() {
      return fields;
    },
  },

  async created() {
    await this.doFind(this.id);
  },

  methods: {
    ...mapActions({
      doFind: 'corso/view/doFind',
    }),

    presenter(record, fieldName) {
      return CorsoModel.presenter(record, fieldName);
    },
  },
});
</script>
