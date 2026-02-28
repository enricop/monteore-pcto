<template>
  <div>
    <el-table
      :border="true"
      :data="rows"
      @sort-change="doChangeSort"
      ref="table"
      row-key="id"
      v-loading="loading"
    >
      <el-table-column
        type="selection"
        width="55"
      ></el-table-column>

      <el-table-column
        :label="fields.nomeCiclo.label"
        :prop="fields.nomeCiclo.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'nomeCiclo') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.inizioCiclo.label"
        :prop="fields.inizioCiclo.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'inizioCiclo') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.fineCiclo.label"
        :prop="fields.fineCiclo.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'fineCiclo') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.attivo.label"
        :prop="fields.attivo.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'attivo') }}</template>
      </el-table-column>

      <el-table-column :label="fields.amministratoreMonteOre.label" :prop="fields.amministratoreMonteOre.name">
        <template slot-scope="scope">
          <app-list-item-relation-to-one
            :label="fields.amministratoreMonteOre.label"
            :permission="fields.amministratoreMonteOre.readPermission"
            :url="fields.amministratoreMonteOre.viewUrl"
            :value="presenter(scope.row, 'amministratoreMonteOre')"
          ></app-list-item-relation-to-one>
        </template>
      </el-table-column>

      <el-table-column :label="fields.studenti.label" :prop="fields.studenti.name">
        <template slot-scope="scope">
          <app-list-item-relation-to-many
            :label="fields.studenti.label"
            :permission="fields.studenti.readPermission"
            :url="fields.studenti.viewUrl"
            :value="presenter(scope.row, 'studenti')"
          ></app-list-item-relation-to-many>
        </template>
      </el-table-column>

      <el-table-column :label="fields.corsi.label" :prop="fields.corsi.name">
        <template slot-scope="scope">
          <app-list-item-relation-to-many
            :label="fields.corsi.label"
            :permission="fields.corsi.readPermission"
            :url="fields.corsi.viewUrl"
            :value="presenter(scope.row, 'corsi')"
          ></app-list-item-relation-to-many>
        </template>
      </el-table-column>

      <el-table-column
        :fixed="isMobile ? undefined : 'right'"
        align="center"
        width="180"
      >
        <template slot-scope="scope">
          <div class="table-actions">
            <router-link :to="`/ciclo-monte-ore/${scope.row.id}`">
              <el-button type="text">
                <app-i18n code="common.view"></app-i18n>
              </el-button>
            </router-link>

            <router-link
              :to="`/ciclo-monte-ore/${scope.row.id}/edit`"
              v-if="hasPermissionToEdit"
            >
              <el-button type="text">
                <app-i18n code="common.edit"></app-i18n>
              </el-button>
            </router-link>

            <el-button
              :disabled="destroyLoading"
              @click="doDestroyWithConfirm(scope.row.id)"
              type="text"
              v-if="hasPermissionToDestroy"
            >
              <app-i18n code="common.destroy"></app-i18n>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="el-pagination-wrapper">
      <el-pagination
        :current-page="pagination.currentPage || 1"
        :disabled="loading"
        :layout="paginationLayout"
        :total="count"
        @current-change="doChangePaginationCurrentPage"
        @size-change="doChangePaginationPageSize"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { CicloMonteOreModel } from '@/modules/ciclo-monte-ore/ciclo-monte-ore-model';
import { mapGetters, mapActions } from 'vuex';
import { CicloMonteOrePermissions } from '@/modules/ciclo-monte-ore/ciclo-monte-ore-permissions';
import { i18n } from '@/i18n';

const { fields } = CicloMonteOreModel;

import Vue from 'vue';
export default Vue.extend({
  name: 'app-ciclo-monte-ore-list-table',

  mounted() {
    this.doMountTable(this.$refs.table);
  },

  computed: {
    ...mapGetters({
      rows: 'cicloMonteOre/list/rows',
      count: 'cicloMonteOre/list/count',
      loading: 'cicloMonteOre/list/loading',
      pagination: 'cicloMonteOre/list/pagination',
      isMobile: 'layout/isMobile',
      currentUser: 'auth/currentUser',
      currentTenant: 'auth/currentTenant',
      destroyLoading: 'cicloMonteOre/destroy/loading',
      paginationLayout: 'layout/paginationLayout',
    }),

    hasPermissionToEdit() {
      return new CicloMonteOrePermissions(
        this.currentTenant,
        this.currentUser,
      ).edit;
    },

    hasPermissionToDestroy() {
      return new CicloMonteOrePermissions(
        this.currentTenant,
        this.currentUser,
      ).destroy;
    },

    fields() {
      return fields;
    },
  },

  methods: {
    ...mapActions({
      doChangeSort: 'cicloMonteOre/list/doChangeSort',
      doChangePaginationCurrentPage:
        'cicloMonteOre/list/doChangePaginationCurrentPage',
      doChangePaginationPageSize:
        'cicloMonteOre/list/doChangePaginationPageSize',
      doMountTable: 'cicloMonteOre/list/doMountTable',
      doDestroy: 'cicloMonteOre/destroy/doDestroy',
    }),

    presenter(row, fieldName) {
      return CicloMonteOreModel.presenter(row, fieldName);
    },

    async doDestroyWithConfirm(id) {
      try {
        await this.$confirm(
          i18n('common.areYouSure'),
          i18n('common.confirm'),
          {
            confirmButtonText: i18n('common.yes'),
            cancelButtonText: i18n('common.no'),
            type: 'warning',
          },
        );

        return this.doDestroy(id);
      } catch (error) {
        // no
      }
    },
  },
});
</script>

<style></style>
