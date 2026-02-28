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
          code="entities.corso.edit.title"
          v-if="isEditing"
        ></app-i18n>
        <app-i18n
          code="entities.corso.new.title"
          v-if="!isEditing"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.corso.edit.title"
          v-if="isEditing"
        ></app-i18n>
        <app-i18n
          code="entities.corso.new.title"
          v-if="!isEditing"
        ></app-i18n>
      </h1>

      <div
        class="app-page-spinner"
        v-if="initLoading"
        v-loading="initLoading"
      ></div>

      <app-corso-form
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
import CorsoForm from '@/modules/corso/components/corso-form.vue';
import { routerAsync } from '@/app-module';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-corso-form-page',

  props: ['id'],

  components: {
    'app-corso-form': CorsoForm,
  },

  computed: {
    ...mapGetters({
      record: 'corso/form/record',
      initLoading: 'corso/form/initLoading',
      saveLoading: 'corso/form/saveLoading',
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
      doInit: 'corso/form/doInit',
      doUpdate: 'corso/form/doUpdate',
      doCreate: 'corso/form/doCreate',
    }),

    doCancel() {
      routerAsync().push('/corso');
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
