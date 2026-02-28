<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/ciclo-monte-ore' }">
        <app-i18n code="entities.cicloMonteOre.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n
          code="entities.cicloMonteOre.view.title"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.cicloMonteOre.view.title"
        ></app-i18n>
      </h1>

      <div
        class="app-page-spinner"
        v-if="loading"
        v-loading="loading"
      ></div>

      <app-ciclo-monte-ore-view-toolbar
        v-if="record"
      ></app-ciclo-monte-ore-view-toolbar>

      <el-form
        :label-position="labelPosition"
        :label-width="labelWidthForm"
        @submit.prevent.native
        class="form"
        v-if="record"
      >
        <app-view-item-text :label="fields.nomeCiclo.label" :value="presenter(record, 'nomeCiclo')"></app-view-item-text>

        <app-view-item-text :label="fields.inizioCiclo.label" :value="presenter(record, 'inizioCiclo')"></app-view-item-text>

        <app-view-item-text :label="fields.fineCiclo.label" :value="presenter(record, 'fineCiclo')"></app-view-item-text>

        <app-view-item-text :label="fields.attivo.label" :value="presenter(record, 'attivo')"></app-view-item-text>

        <app-view-item-relation-to-one
          :label="fields.amministratoreMonteOre.label"
          :permission="fields.amministratoreMonteOre.readPermission"
          :url="fields.amministratoreMonteOre.viewUrl"
          :value="presenter(record, 'amministratoreMonteOre')"
        ></app-view-item-relation-to-one>

        <app-view-item-relation-to-many
          :label="fields.studenti.label"
          :permission="fields.studenti.readPermission"
          :url="fields.studenti.viewUrl"
          :value="presenter(record, 'studenti')"
        ></app-view-item-relation-to-many>

        <app-view-item-relation-to-many
          :label="fields.corsi.label"
          :permission="fields.corsi.readPermission"
          :url="fields.corsi.viewUrl"
          :value="presenter(record, 'corsi')"
        ></app-view-item-relation-to-many>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import CicloMonteOreViewToolbar from '@/modules/ciclo-monte-ore/components/ciclo-monte-ore-view-toolbar.vue';
import { CicloMonteOreModel } from '@/modules/ciclo-monte-ore/ciclo-monte-ore-model';

const { fields } = CicloMonteOreModel;

import Vue from 'vue';

export default Vue.extend({
  name: 'app-ciclo-monte-ore-view-page',

  props: ['id'],

  components: {
    'app-ciclo-monte-ore-view-toolbar': CicloMonteOreViewToolbar,
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
      record: 'cicloMonteOre/view/record',
      loading: 'cicloMonteOre/view/loading',
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
      doFind: 'cicloMonteOre/view/doFind',
    }),

    presenter(record, fieldName) {
      return CicloMonteOreModel.presenter(record, fieldName);
    },
  },
});
</script>
