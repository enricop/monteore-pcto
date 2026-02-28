<template>
  <div>
    <el-form
      :label-position="labelPosition"
      :label-width="labelWidthForm"
      :model="model"
      :rules="rules"
      @submit.native.prevent="doSubmit"
      class="form"
      ref="form"
      v-if="model"
    >
      <el-form-item
        :label="fields.nome.label"
        :prop="fields.nome.name"
        :required="fields.nome.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-input v-model="model[fields.nome.name]" :placeholder="fields.nome.placeholder" ref="focus" />

          <div
            v-if="fields.nome.hint"
            class="app-form-hint"
          >
            {{ fields.nome.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.massimoNumeroIscritti.label"
        :prop="fields.massimoNumeroIscritti.name"
        :required="fields.massimoNumeroIscritti.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-input-number :precision="0" :step="1" v-model="model[fields.massimoNumeroIscritti.name]" :placeholder="fields.massimoNumeroIscritti.placeholder" ></el-input-number>

          <div
            v-if="fields.massimoNumeroIscritti.hint"
            class="app-form-hint"
          >
            {{ fields.massimoNumeroIscritti.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.attivo.label"
        :prop="fields.attivo.name"
        :required="fields.attivo.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-switch v-model="model[fields.attivo.name]"></el-switch>

          <div
            v-if="fields.attivo.hint"
            class="app-form-hint"
          >
            {{ fields.attivo.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.logo.label"
        :prop="fields.logo.name"
        :required="fields.logo.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <app-image-upload
            :max="fields.logo.max"
            :storage="fields.logo.storage"      
            v-model="model[fields.logo.name]"
          ></app-image-upload>

          <div
            v-if="fields.logo.hint"
            class="app-form-hint"
          >
            {{ fields.logo.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.studentiIscritti.label"
        :prop="fields.studentiIscritti.name"
        :required="fields.studentiIscritti.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <app-user-autocomplete-input
            :fetchFn="fields.studentiIscritti.fetchFn"
            :mapperFn="fields.studentiIscritti.mapperFn"
            :showCreate="!modal"
            v-model="model[fields.studentiIscritti.name]"
            :placeholder="fields.studentiIscritti.placeholder"
            mode="multiple"
          ></app-user-autocomplete-input>

          <div
            v-if="fields.studentiIscritti.hint"
            class="app-form-hint"
          >
            {{ fields.studentiIscritti.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.studentiAmmessi.label"
        :prop="fields.studentiAmmessi.name"
        :required="fields.studentiAmmessi.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <app-user-autocomplete-input
            :fetchFn="fields.studentiAmmessi.fetchFn"
            :mapperFn="fields.studentiAmmessi.mapperFn"
            :showCreate="!modal"
            v-model="model[fields.studentiAmmessi.name]"
            :placeholder="fields.studentiAmmessi.placeholder"
            mode="multiple"
          ></app-user-autocomplete-input>

          <div
            v-if="fields.studentiAmmessi.hint"
            class="app-form-hint"
          >
            {{ fields.studentiAmmessi.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item>
        <div class="form-buttons">
          <el-button
            :disabled="saveLoading"
            @click="doSubmit"
            icon="el-icon-fa-floppy-o"
            type="primary"
          >
            <app-i18n code="common.save"></app-i18n>
          </el-button>

          <el-button
            :disabled="saveLoading"
            @click="doReset"
            icon="el-icon-fa-undo"
          >
            <app-i18n code="common.reset"></app-i18n>
          </el-button>

          <el-button
            :disabled="saveLoading"
            @click="doCancel"
            icon="el-icon-fa-close"
          >
            <app-i18n code="common.cancel"></app-i18n>
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { FormSchema } from '@/shared/form/form-schema';
import { CorsoModel } from '@/modules/corso/corso-model';

const { fields } = CorsoModel;
const formSchema = new FormSchema([
  fields.nome,
  fields.massimoNumeroIscritti,
  fields.attivo,
  fields.logo,
  fields.studentiIscritti,
  fields.studentiAmmessi,
]);

import Vue from 'vue';
export default Vue.extend({
  name: 'app-corso-form',

  props: ['isEditing', 'record', 'saveLoading', 'modal'],

  data() {
    return {
      rules: formSchema.rules(),
      model: null,
    };
  },

  created() {
    this.model = formSchema.initialValues(
      this.record || {},
    );
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
    }),

    fields() {
      return fields;
    },
  },

  methods: {
    doReset() {
      this.model = formSchema.initialValues(this.record);
    },

    doCancel() {
      this.$emit('cancel');
    },

    async doSubmit() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return;
      }

      return this.$emit('submit', {
        id: this.record && this.record.id,
        values: formSchema.cast(this.model),
      });
    },
  },
});
</script>

<style></style>
