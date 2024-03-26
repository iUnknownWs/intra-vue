<script setup>
import axios from 'axios'
import NumberPT from './NumberPT.vue'
import DatePT from './DatePT.vue'
import AreaPT from './AreaPT.vue'
import SelectPT from './SelectPT.vue'
const props = defineProps({
  question: { type: Object, required: true },
  order: { type: Number },
  readonly: { type: Boolean, default: false }
})
const modelValue = defineModel()
modelValue.value = props.question.answers[0]?.answer_type

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
      <span v-if="order" class="label-text font-medium"
        >{{ order + 1 }}. {{ question.question_title }}</span
      >
      <span v-else class="label-text font-medium">{{ question.question_title }}</span>
    </div>
    <div v-if="readonly" class="flex flex-row">
      <label class="label cursor-pointer justify-start gap-3">
        <span class="label-text">{{
          question.answers[0]?.answer_type_title || 'Sin responder'
        }}</span>
      </label>
    </div>
    <div v-else class="flex flex-col">
      <div class="join cursor-pointer justify-start gap-3">
        <input
          v-for="(answer, index) in question.question.answer_types"
          :key="index"
          type="radio"
          class="btn join-item active:text-white"
          :name="question.id"
          :aria-label="answer.title"
          :value="answer.id"
          v-model="modelValue"
          @change="updateValue"
          required
        />
      </div>
      <template v-if="question.answers[0]?.is_negative">
        <RadioPT
          v-if="question.negative_answered_questions[0]?.question.answer_types[0].type === 0"
          :question="question.negative_answered_questions[0]"
        />
        <NumberPT
          v-else-if="question.negative_answered_questions[0]?.question.answer_types[0].type === 1"
          :question="question.negative_answered_questions[0]"
        />
        <DatePT
          v-else-if="question.negative_answered_questions[0]?.question.answer_types[0].type === 2"
          :question="question.negative_answered_questions[0]"
        />
        <AreaPT
          v-else-if="
            question.negative_answered_questions[0]?.question.answer_types[0].type === 3 &&
            question.negative_answered_questions[0]?.question.answer_types[0].title === 'Textarea'
          "
          :question="question.negative_answered_questions[0]"
        />
        <!-- <span
          v-else-if="
            question.question.answer_types[0].type === 3 && question.question.has_multiselect_answer
          "
          >{{ question.question_title }}</span
        > -->
        <SelectPT
          v-else-if="question.negative_answered_questions[0]?.question.answer_types[0].type === 3"
          :question="question.negative_answered_questions[0]"
        />
        <!-- <span v-else-if="question.question.answer_types[0].type === 4">
          {{ question.question_title }}
        </span> -->
      </template>
    </div>
  </label>
</template>

<style scoped>
.btn:is(input[type='checkbox']:checked),
.btn:is(input[type='radio']:checked) {
  color: rgb(255 255 255);
}
</style>
