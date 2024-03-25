<script setup>
import axios from 'axios'

const props = defineProps({
  question: { type: Object, required: true },
  order: { type: Number, required: true },
  readonly: { type: Boolean, default: false }
})
const value = defineModel()
value.value = parseInt(props.question.answers[0]?.value)

const updateValue = () => {
  axios.post(import.meta.env.VITE_API + '/performance-tests/answers/', {
    answered_question: props.question.id,
    answer_type: props.question.question.answer_types[0].answer_type,
    value: value.value
  })
}
</script>

<template>
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text font-medium">{{ order + 1 }}. {{ question.question_title }}</span>
    </div>
    <input :disabled="readonly" type="number" class="input input-bordered w-full" v-model="value" @change="updateValue" required />
  </label>
</template>
