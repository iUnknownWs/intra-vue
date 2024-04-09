<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import RadioInput from '../RadioInput.vue'

const props = defineProps({
  toggle: { type: Function, required: true },
  comments: { type: [String, null], required: true },
  email: { type: String, required: true },
  id: { type: String, required: true }
})

const emits = defineEmits(['delivered'])

const step = ref(1)
const info = ref(null)
const modalTitle = ref('')
const modalMessage = ref('')

const loading = ref(false)
const disabled = ref(true)
const confirm = ref(null)
const sellMode = ref(false)
const docusignEmail = ref(props.email)
const docusignOptions = ref([])
const docusignTemplate = ref(null)
const docusignComments = ref('')
const trustpilot = ref(null)

const firstStep = () => {
  disabled.value = true
  if (confirm.value) {
    step.value = 3
  } else {
    step.value = 2
  }
}

const commentsToggle = () => {
  if (sellMode.value) {
    docusignComments.value = props.comments
  } else {
    docusignComments.value = ''
  }
}

const sendDocusign = () => {
  loading.value = true
  if (!confirm.value) {
    let payload = {
      signer_email: docusignEmail.value,
      docusign_template_id: docusignTemplate.value,
      additional_comments: null,
      additional_comments_whithout_warranty: null,
      invite_docusign: trustpilot,
      booking: props.id
    }
  
    if (sellMode.value) {
      payload.additional_comments_whithout_warranty = docusignComments.value
    } else {
      payload.additional_comments = docusignComments.value
    }
  
    axios.post(`${import.meta.env.VITE_API}/docusign_send_envelope/`, payload)
  }
  axios
    .post(`${import.meta.env.VITE_SALES}/bookings/` + props.id + `/mark_as_delivered/`, {
      trustpilot_invite: trustpilot.value
    })
    .then(() => {
      loading.value = false
      props.toggle()
      modalTitle.value = 'Entrega lista'
      modalMessage.value = 'El proceso de entrega ha finalizado correctamente'
      info.value.modal.showModal()
      emits('delivered')
    })
}

onMounted(() => {
  axios.get(`${import.meta.env.VITE_API}/docusign_list_templates/`).then((response) => {
    docusignOptions.value = response.data.envelope_templates
  })
})
</script>

<template>
  <ModalInfo ref="info" :title="modalTitle" :message="modalMessage" :loading="loading" />
  <template v-if="step === 1">
    <div>
      <DrawerTitle title="Enviar Documentación" @toggle="toggle" />
      <h2 class="my-4 text-base font-medium">¿Ya ha recibido la Documentación?</h2>
      <RadioInput
        name="confirm"
        label="Si"
        :value="true"
        v-model="confirm"
        @changed="disabled = false"
      />
      <RadioInput
        name="confirm"
        label="No"
        :value="false"
        v-model="confirm"
        @changed="disabled = false"
      />
    </div>
    <DrawerActions
      secondary="Cancelar"
      primary="Guardar"
      :loading="loading"
      :disabled="disabled"
      @click-secondary="toggle"
      @click-primary="firstStep"
    />
  </template>
  <template v-if="step === 2">
    <div>
      <DrawerTitle title="Enviar Documentación" @toggle="toggle" />
      <TextInput label="Email del firmante:" v-model="docusignEmail" />
      <h2 class="my-4 text-lg font-medium">Seleccione el tipo de documento</h2>
      <RadioInput
        v-for="(option, index) in docusignOptions"
        :key="index"
        name="docusign"
        :label="option.name"
        :value="option.template_id"
        v-model="docusignTemplate"
      />
      <ToggleInput
        label="Venta normal"
        option="Venta sin garantía"
        v-model="sellMode"
        @changed="commentsToggle"
      />
      <AreaInput label="Comentarios adicionales:" v-model="docusignComments" />
    </div>
    <DrawerActions
      secondary="Volver"
      primary="Guardar"
      :disabled="!docusignTemplate"
      :loading="loading"
      @click-secondary="step = 1"
      @click-primary="step = 3"
    />
  </template>
  <template v-if="step === 3">
    <div>
      <DrawerTitle title="Enviar Documentación" @toggle="toggle" />
      <h2 class="my-4 text-base font-medium">¿Deseas Enviar una invitación a Trustpilot?</h2>
      <RadioInput
        name="trustpilot"
        label="Si"
        :value="true"
        v-model="trustpilot"
        @changed="disabled = false"
      />
      <RadioInput
        name="trustpilot"
        label="No"
        :value="false"
        v-model="trustpilot"
        @changed="disabled = false"
      />
    </div>
    <DrawerActions
      secondary="Volver"
      primary="Guardar"
      :loading="loading"
      :disabled="disabled"
      @click-secondary="step = 1"
      @click-primary="sendDocusign"
    />
  </template>
</template>
