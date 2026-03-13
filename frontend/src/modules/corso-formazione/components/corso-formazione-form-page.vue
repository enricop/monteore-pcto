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
          code="entities.corsoFormazione.edit.title"
          v-if="isEditing"
        ></app-i18n>
        <app-i18n
          code="entities.corsoFormazione.new.title"
          v-if="!isEditing"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.corsoFormazione.edit.title"
          v-if="isEditing"
        ></app-i18n>
        <app-i18n
          code="entities.corsoFormazione.new.title"
          v-if="!isEditing"
        ></app-i18n>
      </h1>

      <div
        class="app-page-spinner"
        v-if="initLoading"
        v-loading="initLoading"
      ></div>

      <app-corso-formazione-form
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
import CorsoFormazioneForm from '@/modules/corso-formazione/components/corso-formazione-form.vue';
import { routerAsync } from '@/app-module';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-corso-formazione-form-page',

  props: ['id'],

  components: {
    'app-corso-formazione-form': CorsoFormazioneForm,
  },

  computed: {
    ...mapGetters({
      record: 'corsoFormazione/form/record',
      initLoading: 'corsoFormazione/form/initLoading',
      saveLoading: 'corsoFormazione/form/saveLoading',
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
      doInit: 'corsoFormazione/form/doInit',
      doUpdate: 'corsoFormazione/form/doUpdate',
      doCreate: 'corsoFormazione/form/doCreate',
    }),

    doCancel() {
      routerAsync().push('/corso-formazione');
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
