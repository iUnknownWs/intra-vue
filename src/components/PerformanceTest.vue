<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
const props = defineProps({
  url: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  toggle: {
    type: Function,
    required: true
  },
  step: {
    type: Number,
    required: true
  },
  testId: {
    type: Number
  }
})
const emit = defineEmits(['created'])
// const questionUrl = `${props.url}answered/` + props.id + '/fixed_question'
const testTemplates = ref([])
const questions = ref([])
const templateId = ref(null)
const sameType = ref(false)
const step = ref(props.step)

const create = () => {
  axios
    .post(props.url + 'answered/', {
      vehicle: props.id,
      performance_test: templateId.value
    })
    .then((response) => {
      axios.get(props.url + 'answered/' + response.data.id).then((response) => {
        questions.value = response.data.answered_questions
      })
      emit('created')
      step.value = 2
    })
    .catch(() => {
      sameType.value = true
    })
}

onMounted(() => {
  if (step.value === 2) {
    axios.get(props.url + 'answered/' + props.testId).then((response) => {
      questions.value = response.data.answered_questions
    })
  }
  axios.get(props.url).then((response) => {
    testTemplates.value = response.data.results
  })
})
</script>

<template>
  <div v-if="step === 1" class="flex min-h-full w-full flex-col justify-between">
    <div>
      <DrawerTitle title="Performance Test" @toggle="toggle" />
      <div v-if="sameType" role="alert" class="alert alert-error">
        <Icon icon="mdi:alert-circle" />
        <span>Solo se puede crear un test del mismo tipo</span>
      </div>
      <SelectInput
        label="Elige el tipo de test a crear"
        :options="testTemplates"
        v-model="templateId"
        :initialValue="null"
      />
    </div>
    <DrawerActions
      secondary="Cancelar"
      primary="Crear"
      @click-secondary="toggle"
      @click-primary="create"
      :disabled="!templateId"
    />
  </div>
  <div v-if="step === 2" class="flex h-full w-full flex-col justify-between">
    <div>
      <DrawerTitle title="Performance Test" @toggle="toggle" />
      <template v-for="(question, index) in questions" :key="index">
        <span v-if="question.question.answer_types[0].type === 0">
          {{ question.question_title }}
        </span>
        <span v-else-if="question.question.answer_types[0].type === 1">
          {{ question.question_title }}
        </span>
        <span v-else-if="question.question.answer_types[0].type === 2">
          {{ question.question_title }}
        </span>
        <span
          v-else-if="
            question.question.answer_types[0].type === 3 &&
            question.question.answer_types[0].title === 'Textarea'
          "
        >
          {{ question.question_title }}
        </span>
        <span
          v-else-if="
            question.question.answer_types[0].type === 3 && question.question.has_multiselect_answer
          "
          >{{ question.question_title }}</span
        >
        <span v-else-if="question.question.answer_types[0].type === 3">
          {{ question.question_title }}
        </span>
        <span v-else-if="question.question.answer_types[0].type === 4">
          {{ question.question_title }}
        </span>
      </template>
    </div>
    <DrawerActions
      secondary="Cancelar"
      primary="Crear"
      @click-secondary="toggle"
      @click-primary="create"
      :disabled="!templateId"
    />
  </div>
</template>

<style scoped></style>
