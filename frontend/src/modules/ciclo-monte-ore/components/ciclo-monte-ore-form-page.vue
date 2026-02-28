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
          code="entities.cicloMonteOre.edit.title"
          v-if="isEditing"
        ></app-i18n>
        <app-i18n
          code="entities.cicloMonteOre.new.title"
          v-if="!isEditing"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.cicloMonteOre.edit.title"
          v-if="isEditing"
        ></app-i18n>
        <app-i18n
          code="entities.cicloMonteOre.new.title"
          v-if="!isEditing"
        ></app-i18n>
      </h1>

      <div
        class="app-page-spinner"
        v-if="initLoading"
        v-loading="initLoading"
      ></div>

      <app-ciclo-monte-ore-form
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
import CicloMonteOreForm from '@/modules/ciclo-monte-ore/components/ciclo-monte-ore-form.vue';
import { routerAsync } from '@/app-module';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-ciclo-monte-ore-form-page',

  props: ['id'],

  components: {
    'app-ciclo-monte-ore-form': CicloMonteOreForm,
  },

  computed: {
    ...mapGetters({
      record: 'cicloMonteOre/form/record',
      initLoading: 'cicloMonteOre/form/initLoading',
      saveLoading: 'cicloMonteOre/form/saveLoading',
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
      doInit: 'cicloMonteOre/form/doInit',
      doUpdate: 'cicloMonteOre/form/doUpdate',
      doCreate: 'cicloMonteOre/form/doCreate',
    }),

    doCancel() {
      routerAsync().push('/ciclo-monte-ore');
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
