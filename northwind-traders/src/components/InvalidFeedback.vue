<template>
  <div class="invalid-feedback">
    <div v-if="containsKey('isUnique') && !model.isUnique">{{field}} already exists.</div>
    <div v-if="containsKey('required') && !model.required">{{field}} is a required field.</div>
    <div v-if="containsKey('decimal') && !model.decimal">{{field}} is of type decimal.</div>
    <div v-if="containsKey('numeric') && !model.numeric">{{field}} is of type numeric.</div>
    <div
      v-if="containsKey('minValue') && !model.minValue"
    >{{field}} must be equal or greater than {{model.$params.minValue.min}}.</div>
    <div
      v-if="containsKey('minLength') && !model.minLength"
    >{{field}} must be at least {{model.$params.minLength.min}} characters.</div>
    <div
      v-if="containsKey('maxLength') && !model.maxLength"
    >{{field}} can be at most {{model.$params.maxLength.max}} characters.</div>
    <template v-for="validator in customValidatorKeys">
      <div :key="validator" v-if="!model[validator]">{{model.$params[validator].message}}</div>
    </template>
  </div>
</template>

<script>
export default {
  name: "InvalidFeedback",
  props: {
    model: Object,
    field: String
  },
  methods: {
    containsKey(key) {
      return Object.keys(this.model).indexOf(key) >= 0;
    }
  },
  computed: {
    customValidatorKeys() {
      return Object.keys(this.model).filter(s => s[0] == "_");
    }
  }
};
</script>