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
          code="entities.annoFormazioneScuolaLavoro.edit.title"
          v-if="isEditing"
        ></app-i18n>
        <app-i18n
          code="entities.annoFormazioneScuolaLavoro.new.title"
          v-if="!isEditing"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.annoFormazioneScuolaLavoro.edit.title"
          v-if="isEditing"
        ></app-i18n>
        <app-i18n
          code="entities.annoFormazioneScuolaLavoro.new.title"
          v-if="!isEditing"
        ></app-i18n>
      </h1>

      <div
        class="app-page-spinner"
        v-if="initLoading"
        v-loading="initLoading"
      ></div>

      <app-anno-formazione-scuola-lavoro-form
        :isEditing="isEditing"
        :record="record"
        :saveLoading="saveLoading"
        @cancel="doCancel"
        @submit="doSubmit"
        v-if="!initLoading"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import AnnoFormazioneScuolaLavoroForm from '@/modules/anno-formazione-scuola-lavoro/components/anno-formazione-scuola-lavoro-form.vue';
import { routerAsync } from '@/app-module';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-anno-formazione-scuola-lavoro-form-page',

  props: ['id'],

  components: {
    'app-anno-formazione-scuola-lavoro-form': AnnoFormazioneScuolaLavoroForm,
  },

  computed: {
    ...mapGetters({
      record: 'annoFormazioneScuolaLavoro/form/record',
      initLoading: 'annoFormazioneScuolaLavoro/form/initLoading',
      saveLoading: 'annoFormazioneScuolaLavoro/form/saveLoading',
    }),

    isEditing() {
      return Boolean(this.id);
    },
  },

  async created() {
    await this.doInit(this.id);
  },

  methods: {
    ...mapActions({
      doInit: 'annoFormazioneScuolaLavoro/form/doInit',
      doUpdate: 'annoFormazioneScuolaLavoro/form/doUpdate',
      doCreate: 'annoFormazioneScuolaLavoro/form/doCreate',
    }),

    doCancel() {
      routerAsync().push('/anno-formazione-scuola-lavoro');
    },

    async doSubmit(payload) {
      if (this.isEditing) {
        return this.doUpdate(payload);
      } else {
        return this.doCreate(payload.values);
      }
    },
  },
});
</script>

<style></style>
