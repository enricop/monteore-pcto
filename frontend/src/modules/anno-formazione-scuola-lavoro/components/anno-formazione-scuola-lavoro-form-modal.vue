<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="80%"
    >
      <app-anno-formazione-scuola-lavoro-form
        :modal="true"
        :record="record"
        :saveLoading="saveLoading"
        @cancel="doCancel"
        @submit="doSubmit"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AnnoFormazioneScuolaLavoroForm from '@/modules/anno-formazione-scuola-lavoro/components/anno-formazione-scuola-lavoro-form.vue';
import { AnnoFormazioneScuolaLavoroService } from '@/modules/anno-formazione-scuola-lavoro/anno-formazione-scuola-lavoro-service';
import { i18n } from '@/i18n';
import Errors from '@/shared/error/errors';

export default Vue.extend({
  name: 'app-anno-formazione-scuola-lavoro-form-modal',

  props: ['visible'],

  components: {
    'app-anno-formazione-scuola-lavoro-form': AnnoFormazioneScuolaLavoroForm,
  },

  data() {
    return {
      record: null,
      saveLoading: false,
    };
  },

  computed: {
    dialogVisible: {
      get: function () {
        return this.visible;
      },

      set: function (value) {
        if (!value) {
          this.$emit('close');
        }
      },
    },

    title() {
      return i18n('entities.annoFormazioneScuolaLavoro.new.title');
    },
  },

  methods: {
    async doSubmit(payload) {
      try {
        // @ts-ignore
        this.saveLoading = true;
        const { id } = await AnnoFormazioneScuolaLavoroService.create(
          payload.values,
        );
        const record = await AnnoFormazioneScuolaLavoroService.find(id);
        this.$emit('success', record);
      } catch (error) {
        Errors.handle(error);
      } finally {
        // @ts-ignore
        this.saveLoading = false;
      }
    },

    doCancel() {
      // @ts-ignore
      this.dialogVisible = false;
    },
  },
});
</script>

<style></style>
