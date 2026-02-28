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
        :label="fields.nomeCiclo.label"
        :prop="fields.nomeCiclo.name"
        :required="fields.nomeCiclo.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-input v-model="model[fields.nomeCiclo.name]" :placeholder="fields.nomeCiclo.placeholder" ref="focus" />

          <div
            v-if="fields.nomeCiclo.hint"
            class="app-form-hint"
          >
            {{ fields.nomeCiclo.hint }}
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
        :label="fields.amministratoreMonteOre.label"
        :prop="fields.amministratoreMonteOre.name"
        :required="fields.amministratoreMonteOre.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <app-user-autocomplete-input
            :fetchFn="fields.amministratoreMonteOre.fetchFn"
            :mapperFn="fields.amministratoreMonteOre.mapperFn"
            :showCreate="!modal"
            v-model="model[fields.amministratoreMonteOre.name]"
            :placeholder="fields.amministratoreMonteOre.placeholder"
            mode="single"
          ></app-user-autocomplete-input>

          <div
            v-if="fields.amministratoreMonteOre.hint"
            class="app-form-hint"
          >
            {{ fields.amministratoreMonteOre.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.studenti.label"
        :prop="fields.studenti.name"
        :required="fields.studenti.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <app-user-autocomplete-input
            :fetchFn="fields.studenti.fetchFn"
            :mapperFn="fields.studenti.mapperFn"
            :showCreate="!modal"
            v-model="model[fields.studenti.name]"
            :placeholder="fields.studenti.placeholder"
            mode="multiple"
          ></app-user-autocomplete-input>

          <div
            v-if="fields.studenti.hint"
            class="app-form-hint"
          >
            {{ fields.studenti.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.corsi.label"
        :prop="fields.corsi.name"
        :required="fields.corsi.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <app-corso-autocomplete-input
            :fetchFn="fields.corsi.fetchFn"
            :mapperFn="fields.corsi.mapperFn"
            :showCreate="!modal"
            v-model="model[fields.corsi.name]"
            :placeholder="fields.corsi.placeholder"
            mode="multiple"
          ></app-corso-autocomplete-input>

          <div
            v-if="fields.corsi.hint"
            class="app-form-hint"
          >
            {{ fields.corsi.hint }}
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
import { CicloMonteOreModel } from '@/modules/ciclo-monte-ore/ciclo-monte-ore-model';

const { fields } = CicloMonteOreModel;
const formSchema = new FormSchema([
  fields.nomeCiclo,
  fields.inizioCiclo,
  fields.fineCiclo,
  fields.attivo,
  fields.amministratoreMonteOre,
  fields.studenti,
  fields.corsi,
]);

import Vue from 'vue';
export default Vue.extend({
  name: 'app-ciclo-monte-ore-form',

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
