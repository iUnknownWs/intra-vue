<script setup>
import axios from 'axios'
const props = defineProps({
  question: { type: Object, required: true },
  order: { type: Number },
  readonly: { type: Boolean, default: false }
})
const value = defineModel()
value.value = props.question.answers[0]?.answer_type

const updateValue = () => {
  axios.post(import.meta.env.VITE_API + '/performance-tests/answers/', {
    answered_question: props.question.id,
    answer_type: value.value,
    value: ''
  })
}
</script>

<template>
  <label class="form-control w-full">
    <div class="label">
      <span v-if="order" class="label-text font-medium"
        >{{ order + 1 }}. {{ question.question_title }}</span
      >
      <span v-else class="label-text font-medium">{{ question.question_title }}</span>
    </div>
    <select
      class="select select-bordered"
      v-model="value"
      @change="updateValue"
      :disabled="readonly"
      required
    >
      <option disabled selected :value="null">Seleccione una opción</option>
      <option
        v-for="(option, index) in question.question.answer_types"
        :key="index"
        :value="option.id"
      >
        {{ option.title }}
      </option>
    </select>
  </label>
</template>
