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
        :label="fields.nome.label"
        :prop="fields.nome.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'nome') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.massimoNumeroIscritti.label"
        :prop="fields.massimoNumeroIscritti.name"
        sortable="custom"
        align="right"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'massimoNumeroIscritti') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.attivo.label"
        :prop="fields.attivo.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'attivo') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.logo.label"
        :prop="fields.logo.name"
        align="center"
      >
        <template slot-scope="scope">
          <app-list-item-image :value="presenter(scope.row, 'logo')"></app-list-item-image>
        </template>
      </el-table-column>

      <el-table-column :label="fields.studentiIscritti.label" :prop="fields.studentiIscritti.name">
        <template slot-scope="scope">
          <app-list-item-relation-to-many
            :label="fields.studentiIscritti.label"
            :permission="fields.studentiIscritti.readPermission"
            :url="fields.studentiIscritti.viewUrl"
            :value="presenter(scope.row, 'studentiIscritti')"
          ></app-list-item-relation-to-many>
        </template>
      </el-table-column>

      <el-table-column :label="fields.studentiAmmessi.label" :prop="fields.studentiAmmessi.name">
        <template slot-scope="scope">
          <app-list-item-relation-to-many
            :label="fields.studentiAmmessi.label"
            :permission="fields.studentiAmmessi.readPermission"
            :url="fields.studentiAmmessi.viewUrl"
            :value="presenter(scope.row, 'studentiAmmessi')"
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
            <router-link :to="`/corso/${scope.row.id}`">
              <el-button type="text">
                <app-i18n code="common.view"></app-i18n>
              </el-button>
            </router-link>

            <router-link
              :to="`/corso/${scope.row.id}/edit`"
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
import { CorsoModel } from '@/modules/corso/corso-model';
import { mapGetters, mapActions } from 'vuex';
import { CorsoPermissions } from '@/modules/corso/corso-permissions';
import { i18n } from '@/i18n';

const { fields } = CorsoModel;

import Vue from 'vue';
export default Vue.extend({
  name: 'app-corso-list-table',

  mounted() {
    this.doMountTable(this.$refs.table);
  },

  computed: {
    ...mapGetters({
      rows: 'corso/list/rows',
      count: 'corso/list/count',
      loading: 'corso/list/loading',
      pagination: 'corso/list/pagination',
      isMobile: 'layout/isMobile',
      currentUser: 'auth/currentUser',
      currentTenant: 'auth/currentTenant',
      destroyLoading: 'corso/destroy/loading',
      paginationLayout: 'layout/paginationLayout',
    }),

    hasPermissionToEdit() {
      return new CorsoPermissions(
        this.currentTenant,
        this.currentUser,
      ).edit;
    },

    hasPermissionToDestroy() {
      return new CorsoPermissions(
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
      doChangeSort: 'corso/list/doChangeSort',
      doChangePaginationCurrentPage:
        'corso/list/doChangePaginationCurrentPage',
      doChangePaginationPageSize:
        'corso/list/doChangePaginationPageSize',
      doMountTable: 'corso/list/doMountTable',
      doDestroy: 'corso/destroy/doDestroy',
    }),

    presenter(row, fieldName) {
      return CorsoModel.presenter(row, fieldName);
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
