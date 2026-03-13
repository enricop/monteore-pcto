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
        :label="fields.nomeAnno.label"
        :prop="fields.nomeAnno.name"
        :required="fields.nomeAnno.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-input v-model="model[fields.nomeAnno.name]" :placeholder="fields.nomeAnno.placeholder" ref="focus" />

          <div
            v-if="fields.nomeAnno.hint"
            class="app-form-hint"
          >
            {{ fields.nomeAnno.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.inizioCiclo.label"
        :prop="fields.inizioCiclo.name"
        :required="fields.inizioCiclo.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-date-picker type="date" v-model="model[fields.inizioCiclo.name]" :placeholder="fields.inizioCiclo.placeholder"></el-date-picker>

          <div
            v-if="fields.inizioCiclo.hint"
            class="app-form-hint"
          >
            {{ fields.inizioCiclo.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.fineCiclo.label"
        :prop="fields.fineCiclo.name"
        :required="fields.fineCiclo.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-date-picker type="date" v-model="model[fields.fineCiclo.name]" :placeholder="fields.fineCiclo.placeholder"></el-date-picker>

          <div
            v-if="fields.fineCiclo.hint"
            class="app-form-hint"
          >
            {{ fields.fineCiclo.hint }}
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
        :label="fields.amministratoriCorsiFormazione.label"
        :prop="fields.amministratoriCorsiFormazione.name"
        :required="fields.amministratoriCorsiFormazione.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <app-user-autocomplete-input
            :fetchFn="fields.amministratoriCorsiFormazione.fetchFn"
            :mapperFn="fields.amministratoriCorsiFormazione.mapperFn"
            :showCreate="!modal"
            v-model="model[fields.amministratoriCorsiFormazione.name]"
            :placeholder="fields.amministratoriCorsiFormazione.placeholder"
            mode="multiple"
          ></app-user-autocomplete-input>

          <div
            v-if="fields.amministratoriCorsiFormazione.hint"
            class="app-form-hint"
          >
            {{ fields.amministratoriCorsiFormazione.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.studentiImmatricolati.label"
        :prop="fields.studentiImmatricolati.name"
        :required="fields.studentiImmatricolati.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <app-user-autocomplete-input
            :fetchFn="fields.studentiImmatricolati.fetchFn"
            :mapperFn="fields.studentiImmatricolati.mapperFn"
            :showCreate="!modal"
            v-model="model[fields.studentiImmatricolati.name]"
            :placeholder="fields.studentiImmatricolati.placeholder"
            mode="multiple"
          ></app-user-autocomplete-input>

          <div
            v-if="fields.studentiImmatricolati.hint"
            class="app-form-hint"
          >
            {{ fields.studentiImmatricolati.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.corsiDisponibili.label"
        :prop="fields.corsiDisponibili.name"
        :required="fields.corsiDisponibili.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <app-corso-formazione-autocomplete-input
            :fetchFn="fields.corsiDisponibili.fetchFn"
            :mapperFn="fields.corsiDisponibili.mapperFn"
            :showCreate="!modal"
            v-model="model[fields.corsiDisponibili.name]"
            :placeholder="fields.corsiDisponibili.placeholder"
            mode="multiple"
          ></app-corso-formazione-autocomplete-input>

          <div
            v-if="fields.corsiDisponibili.hint"
            class="app-form-hint"
          >
            {{ fields.corsiDisponibili.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.numeroAnno.label"
        :prop="fields.numeroAnno.name"
        :required="fields.numeroAnno.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-input-number :precision="0" :step="1" v-model="model[fields.numeroAnno.name]" :placeholder="fields.numeroAnno.placeholder" ></el-input-number>

          <div
            v-if="fields.numeroAnno.hint"
            class="app-form-hint"
          >
            {{ fields.numeroAnno.hint }}
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
import { AnnoFormazioneScuolaLavoroModel } from '@/modules/anno-formazione-scuola-lavoro/anno-formazione-scuola-lavoro-model';

const { fields } = AnnoFormazioneScuolaLavoroModel;
const formSchema = new FormSchema([
  fields.nomeAnno,
  fields.inizioCiclo,
  fields.fineCiclo,
  fields.attivo,
  fields.amministratoriCorsiFormazione,
  fields.studentiImmatricolati,
  fields.corsiDisponibili,
  fields.numeroAnno,
]);

import Vue from 'vue';
export default Vue.extend({
  name: 'app-anno-formazione-scuola-lavoro-form',

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
