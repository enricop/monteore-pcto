<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/corso-formazione' }">
        <app-i18n code="entities.corsoFormazione.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n
          code="entities.corsoFormazione.view.title"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.corsoFormazione.view.title"
        ></app-i18n>
      </h1>

      <div
        class="app-page-spinner"
        v-if="loading"
        v-loading="loading"
      ></div>

      <app-corso-formazione-view-toolbar
        v-if="record"
      ></app-corso-formazione-view-toolbar>

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
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import CorsoFormazioneViewToolbar from '@/modules/corso-formazione/components/corso-formazione-view-toolbar.vue';
import { CorsoFormazioneModel } from '@/modules/corso-formazione/corso-formazione-model';

const { fields } = CorsoFormazioneModel;

import Vue from 'vue';

export default Vue.extend({
  name: 'app-corso-formazione-view-page',

  props: ['id'],

  components: {
    'app-corso-formazione-view-toolbar': CorsoFormazioneViewToolbar,
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
      record: 'corsoFormazione/view/record',
      loading: 'corsoFormazione/view/loading',
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
      doFind: 'corsoFormazione/view/doFind',
    }),

    presenter(record, fieldName) {
      return CorsoFormazioneModel.presenter(record, fieldName);
    },
  },
});
</script>
