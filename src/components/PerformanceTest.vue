<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import SelectPT from './PT/SelectPT.vue'
import AreaPT from './PT/AreaPT.vue'
import RadioPT from './PT/RadioPT.vue'
import DatePT from './PT/DatePT.vue'
import NumberPT from './PT/NumberPT.vue'
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
const testTemplates = ref([])
const questions = ref([])
const templateId = ref(null)
const sameType = ref(false)
const nextStep = ref(false)
const loading = ref(true)

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
      nextStep.value = true
      loading.value = false
      emit('created')
    })
    .catch(() => {
      sameType.value = true
    })
}

onMounted(() => {
  if (props.step === 2 || props.step === 3) {
    loading.value = true
    axios.get(props.url + 'answered/' + props.testId).then((response) => {
      questions.value = response.data.answered_questions
      loading.value = false
    })
  }
  axios.get(props.url).then((response) => {
    testTemplates.value = response.data.results
  })
})
</script>

<template>
  <div v-if="step === 1 && !nextStep" class="flex h-[95vh] w-full flex-col justify-between">
    <div class="h-full w-full">
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
  <form
    @submit.prevent="console.log('guardado')"
    v-if="step === 2 || nextStep"
    class="flex w-full flex-col justify-between"
  >
    <div v-if="loading" class="flex h-screen w-full items-center justify-center">
      <LoadingSpinner class="loading-lg" />
    </div>
    <div v-if="!loading">
      <DrawerTitle title="Performance Test" @toggle="toggle" />
      <template v-for="(question, i) in questions" :key="i">
        <RadioPT
          v-if="question.question.answer_types[0].type === 0"
          :question="question"
          :order="i"
        />
        <NumberPT
          v-else-if="question.question.answer_types[0].type === 1"
          :question="question"
          :order="i"
        />
        <DatePT
          v-else-if="question.question.answer_types[0].type === 2"
          :question="question"
          :order="i"
        />
        <AreaPT
          v-else-if="
            question.question.answer_types[0].type === 3 &&
            question.question.answer_types[0].title === 'Textarea'
          "
          :question="question"
          :order="i"
        />
        <!-- <span
          v-else-if="
            question.question.answer_types[0].type === 3 && question.question.has_multiselect_answer
          "
          >{{ question.question_title }}</span
        > -->
        <SelectPT
          v-else-if="question.question.answer_types[0].type === 3"
          :question="question"
          :order="i"
        />
        <!-- <span v-else-if="question.question.answer_types[0].type === 4">
          {{ question.question_title }}
        </span> -->
      </template>
    </div>
    <li class="mt-8 flex flex-row justify-end gap-4">
      <button @click="toggle" class="btn btn-outline w-28">Cancelar</button>
      <button type="submit" class="btn btn-primary w-24 text-white">Guardar</button>
    </li>
  </form>
  <div v-if="step === 3" class="flex w-full flex-col justify-between">
    <div v-if="loading" class="flex h-screen w-full items-center justify-center">
      <LoadingSpinner class="loading-lg" />
    </div>
    <div v-if="!loading">
      <DrawerTitle title="Performance Test" @toggle="toggle" />
      <template v-for="(question, i) in questions" :key="i">
        <RadioPT
          v-if="question.question.answer_types[0].type === 0"
          :question="question"
          :order="i"
          readonly
        />
        <NumberPT
          v-else-if="question.question.answer_types[0].type === 1"
          :question="question"
          :order="i"
          readonly
        />
        <DatePT
          v-else-if="question.question.answer_types[0].type === 2"
          :question="question"
          :order="i"
          readonly
        />
        <AreaPT
          v-else-if="
            question.question.answer_types[0].type === 3 &&
            question.question.answer_types[0].title === 'Textarea'
          "
          :question="question"
          :order="i"
          readonly
        />
        <!-- <span
          v-else-if="
            question.question.answer_types[0].type === 3 && question.question.has_multiselect_answer
          "
          >{{ question.question_title }}</span
        > -->
        <SelectPT
          v-else-if="question.question.answer_types[0].type === 3"
          :question="question"
          :order="i"
          readonly
        />
        <!-- <span v-else-if="question.question.answer_types[0].type === 4">
          {{ question.question_title }}
        </span> -->
      </template>
    </div>
  </div>
</template>
