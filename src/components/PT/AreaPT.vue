<script setup>
import axios from 'axios'
const props = defineProps({
  question: { type: Object, required: true },
  order: { type: Number, required: true },
  readonly: { type: Boolean, default: false }
})
const value = defineModel()
value.value = props.question.answers[0]?.value

const updateValue = () => {
  axios.post(import.meta.env.VITE_API + '/performance-tests/answers/', {
    answered_question: props.question.id,
    answer_type: props.question.question.answer_types[0].answer_type,
    value: value.value
  })
}
</script>

<template>
  <label class="form-control">
    <div class="label">
      <span class="label-text font-medium">{{ order + 1 }}. {{ question.question_title }}</span>
    </div>
    <textarea
      :disabled="readonly"
      class="textarea textarea-bordered h-24"
      v-model="value"
      @change="updateValue"
    ></textarea>
  </label>
</template>
