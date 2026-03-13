<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/anno-formazione-scuola-lavoro' }">
        <app-i18n code="entities.annoFormazioneScuolaLavoro.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n
          code="entities.annoFormazioneScuolaLavoro.view.title"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.annoFormazioneScuolaLavoro.view.title"
        ></app-i18n>
      </h1>

      <div
        class="app-page-spinner"
        v-if="loading"
        v-loading="loading"
      ></div>

      <app-anno-formazione-scuola-lavoro-view-toolbar
        v-if="record"
      ></app-anno-formazione-scuola-lavoro-view-toolbar>

      <el-form
        :label-position="labelPosition"
        :label-width="labelWidthForm"
        @submit.prevent.native
        class="form"
        v-if="record"
      >
        <app-view-item-text :label="fields.nomeAnno.label" :value="presenter(record, 'nomeAnno')"></app-view-item-text>

        <app-view-item-text :label="fields.inizioCiclo.label" :value="presenter(record, 'inizioCiclo')"></app-view-item-text>

        <app-view-item-text :label="fields.fineCiclo.label" :value="presenter(record, 'fineCiclo')"></app-view-item-text>

        <app-view-item-text :label="fields.attivo.label" :value="presenter(record, 'attivo')"></app-view-item-text>

        <app-view-item-relation-to-many
          :label="fields.amministratoriCorsiFormazione.label"
          :permission="fields.amministratoriCorsiFormazione.readPermission"
          :url="fields.amministratoriCorsiFormazione.viewUrl"
          :value="presenter(record, 'amministratoriCorsiFormazione')"
        ></app-view-item-relation-to-many>

        <app-view-item-relation-to-many
          :label="fields.studentiImmatricolati.label"
          :permission="fields.studentiImmatricolati.readPermission"
          :url="fields.studentiImmatricolati.viewUrl"
          :value="presenter(record, 'studentiImmatricolati')"
        ></app-view-item-relation-to-many>

        <app-view-item-relation-to-many
          :label="fields.corsiDisponibili.label"
          :permission="fields.corsiDisponibili.readPermission"
          :url="fields.corsiDisponibili.viewUrl"
          :value="presenter(record, 'corsiDisponibili')"
        ></app-view-item-relation-to-many>

        <app-view-item-text :label="fields.numeroAnno.label" :value="presenter(record, 'numeroAnno')"></app-view-item-text>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import AnnoFormazioneScuolaLavoroViewToolbar from '@/modules/anno-formazione-scuola-lavoro/components/anno-formazione-scuola-lavoro-view-toolbar.vue';
import { AnnoFormazioneScuolaLavoroModel } from '@/modules/anno-formazione-scuola-lavoro/anno-formazione-scuola-lavoro-model';

const { fields } = AnnoFormazioneScuolaLavoroModel;

import Vue from 'vue';

export default Vue.extend({
  name: 'app-anno-formazione-scuola-lavoro-view-page',

  props: ['id'],

  components: {
    'app-anno-formazione-scuola-lavoro-view-toolbar': AnnoFormazioneScuolaLavoroViewToolbar,
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
      record: 'annoFormazioneScuolaLavoro/view/record',
      loading: 'annoFormazioneScuolaLavoro/view/loading',
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
      doFind: 'annoFormazioneScuolaLavoro/view/doFind',
    }),

    presenter(record, fieldName) {
      return AnnoFormazioneScuolaLavoroModel.presenter(record, fieldName);
    },
  },
});
</script>
