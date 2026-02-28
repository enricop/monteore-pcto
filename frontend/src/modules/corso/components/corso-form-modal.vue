<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="80%"
    >
      <app-corso-form
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
import CorsoForm from '@/modules/corso/components/corso-form.vue';
import { CorsoService } from '@/modules/corso/corso-service';
import { i18n } from '@/i18n';
import Errors from '@/shared/error/errors';

export default Vue.extend({
  name: 'app-corso-form-modal',

  props: ['visible'],

  components: {
    'app-corso-form': CorsoForm,
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
      return i18n('entities.corso.new.title');
    },
  },

  methods: {
    async doSubmit(payload) {
      try {
        // @ts-ignore
        this.saveLoading = true;
        const { id } = await CorsoService.create(
          payload.values,
        );
        const record = await CorsoService.find(id);
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
