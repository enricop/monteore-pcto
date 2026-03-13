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

      <el-table-column
        :fixed="isMobile ? undefined : 'right'"
        align="center"
        width="180"
      >
        <template slot-scope="scope">
          <div class="table-actions">
            <router-link :to="`/corso-formazione/${scope.row.id}`">
              <el-button type="text">
                <app-i18n code="common.view"></app-i18n>
              </el-button>
            </router-link>

            <router-link
              :to="`/corso-formazione/${scope.row.id}/edit`"
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
import { CorsoFormazioneModel } from '@/modules/corso-formazione/corso-formazione-model';
import { mapGetters, mapActions } from 'vuex';
import { CorsoFormazionePermissions } from '@/modules/corso-formazione/corso-formazione-permissions';
import { i18n } from '@/i18n';

const { fields } = CorsoFormazioneModel;

import Vue from 'vue';
export default Vue.extend({
  name: 'app-corso-formazione-list-table',

  mounted() {
    this.doMountTable(this.$refs.table);
  },

  computed: {
    ...mapGetters({
      rows: 'corsoFormazione/list/rows',
      count: 'corsoFormazione/list/count',
      loading: 'corsoFormazione/list/loading',
      pagination: 'corsoFormazione/list/pagination',
      isMobile: 'layout/isMobile',
      currentUser: 'auth/currentUser',
      currentTenant: 'auth/currentTenant',
      destroyLoading: 'corsoFormazione/destroy/loading',
      paginationLayout: 'layout/paginationLayout',
    }),

    hasPermissionToEdit() {
      return new CorsoFormazionePermissions(
        this.currentTenant,
        this.currentUser,
      ).edit;
    },

    hasPermissionToDestroy() {
      return new CorsoFormazionePermissions(
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
      doChangeSort: 'corsoFormazione/list/doChangeSort',
      doChangePaginationCurrentPage:
        'corsoFormazione/list/doChangePaginationCurrentPage',
      doChangePaginationPageSize:
        'corsoFormazione/list/doChangePaginationPageSize',
      doMountTable: 'corsoFormazione/list/doMountTable',
      doDestroy: 'corsoFormazione/destroy/doDestroy',
    }),

    presenter(row, fieldName) {
      return CorsoFormazioneModel.presenter(row, fieldName);
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
