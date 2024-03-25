<script setup>
import axios from 'axios'
const props = defineProps({
  question: { type: Object, required: true },
  order: { type: Number, required: true },
  readonly: { type: Boolean, default: false }
})
const modelValue = defineModel()
modelValue.value = props.question.answers[0]?.value

const updateValue = () => {
  axios.post(import.meta.env.VITE_API + '/performance-tests/answers/', {
    answered_question: props.question.id,
    answer_type: modelValue.value,
    value: ''
  })
}
</script>

<template>
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text font-medium">{{ order + 1 }}. {{ question.question_title }}</span>
    </div>
    <div v-if="readonly" class="flex flex-row">
      <label class="label cursor-pointer justify-start gap-3">
        <span class="label-text">{{
          question.answers[0]?.answer_type_title || 'Sin responder'
        }}</span>
      </label>
    </div>
    <div v-else class="flex flex-row">
      <label
        v-for="(answer, index) in question.question.answer_types"
        :key="index"
        class="label cursor-pointer justify-start gap-3"
      >
        <span class="label-text">{{ answer.title }}</span>
        <input
          :disabled="readonly"
          type="radio"
          :name="question.id"
          class="radio"
          :value="answer.id"
          v-model="modelValue"
          @change="updateValue"
          required
        />
      </label>
    </div>
  </label>
</template>
