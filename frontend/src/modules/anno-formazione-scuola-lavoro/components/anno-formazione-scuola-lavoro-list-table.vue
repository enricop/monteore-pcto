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
        :label="fields.nomeAnno.label"
        :prop="fields.nomeAnno.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'nomeAnno') }}</template>
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

      <el-table-column :label="fields.amministratoriCorsiFormazione.label" :prop="fields.amministratoriCorsiFormazione.name">
        <template slot-scope="scope">
          <app-list-item-relation-to-many
            :label="fields.amministratoriCorsiFormazione.label"
            :permission="fields.amministratoriCorsiFormazione.readPermission"
            :url="fields.amministratoriCorsiFormazione.viewUrl"
            :value="presenter(scope.row, 'amministratoriCorsiFormazione')"
          ></app-list-item-relation-to-many>
        </template>
      </el-table-column>

      <el-table-column :label="fields.studentiImmatricolati.label" :prop="fields.studentiImmatricolati.name">
        <template slot-scope="scope">
          <app-list-item-relation-to-many
            :label="fields.studentiImmatricolati.label"
            :permission="fields.studentiImmatricolati.readPermission"
            :url="fields.studentiImmatricolati.viewUrl"
            :value="presenter(scope.row, 'studentiImmatricolati')"
          ></app-list-item-relation-to-many>
        </template>
      </el-table-column>

      <el-table-column :label="fields.corsiDisponibili.label" :prop="fields.corsiDisponibili.name">
        <template slot-scope="scope">
          <app-list-item-relation-to-many
            :label="fields.corsiDisponibili.label"
            :permission="fields.corsiDisponibili.readPermission"
            :url="fields.corsiDisponibili.viewUrl"
            :value="presenter(scope.row, 'corsiDisponibili')"
          ></app-list-item-relation-to-many>
        </template>
      </el-table-column>

      <el-table-column
        :label="fields.numeroAnno.label"
        :prop="fields.numeroAnno.name"
        sortable="custom"
        align="right"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'numeroAnno') }}</template>
      </el-table-column>

      <el-table-column
        :fixed="isMobile ? undefined : 'right'"
        align="center"
        width="180"
      >
        <template slot-scope="scope">
          <div class="table-actions">
            <router-link :to="`/anno-formazione-scuola-lavoro/${scope.row.id}`">
              <el-button type="text">
                <app-i18n code="common.view"></app-i18n>
              </el-button>
            </router-link>

            <router-link
              :to="`/anno-formazione-scuola-lavoro/${scope.row.id}/edit`"
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
import { AnnoFormazioneScuolaLavoroModel } from '@/modules/anno-formazione-scuola-lavoro/anno-formazione-scuola-lavoro-model';
import { mapGetters, mapActions } from 'vuex';
import { AnnoFormazioneScuolaLavoroPermissions } from '@/modules/anno-formazione-scuola-lavoro/anno-formazione-scuola-lavoro-permissions';
import { i18n } from '@/i18n';

const { fields } = AnnoFormazioneScuolaLavoroModel;

import Vue from 'vue';
export default Vue.extend({
  name: 'app-anno-formazione-scuola-lavoro-list-table',

  mounted() {
    this.doMountTable(this.$refs.table);
  },

  computed: {
    ...mapGetters({
      rows: 'annoFormazioneScuolaLavoro/list/rows',
      count: 'annoFormazioneScuolaLavoro/list/count',
      loading: 'annoFormazioneScuolaLavoro/list/loading',
      pagination: 'annoFormazioneScuolaLavoro/list/pagination',
      isMobile: 'layout/isMobile',
      currentUser: 'auth/currentUser',
      currentTenant: 'auth/currentTenant',
      destroyLoading: 'annoFormazioneScuolaLavoro/destroy/loading',
      paginationLayout: 'layout/paginationLayout',
    }),

    hasPermissionToEdit() {
      return new AnnoFormazioneScuolaLavoroPermissions(
        this.currentTenant,
        this.currentUser,
      ).edit;
    },

    hasPermissionToDestroy() {
      return new AnnoFormazioneScuolaLavoroPermissions(
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
      doChangeSort: 'annoFormazioneScuolaLavoro/list/doChangeSort',
      doChangePaginationCurrentPage:
        'annoFormazioneScuolaLavoro/list/doChangePaginationCurrentPage',
      doChangePaginationPageSize:
        'annoFormazioneScuolaLavoro/list/doChangePaginationPageSize',
      doMountTable: 'annoFormazioneScuolaLavoro/list/doMountTable',
      doDestroy: 'annoFormazioneScuolaLavoro/destroy/doDestroy',
    }),

    presenter(row, fieldName) {
      return AnnoFormazioneScuolaLavoroModel.presenter(row, fieldName);
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
