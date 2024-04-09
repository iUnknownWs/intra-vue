<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const props = defineProps({
  toggle: { type: Function, required: true },
  comments: { type: [String, null], required: true },
  email: { type: String, required: true },
  id: { type: String, required: true }
})

const info = ref(null)
const modalTitle = ref('')
const modalMessage = ref('')

const loading = ref(false)
const sellMode = ref(false)
const docusignEmail = ref(props.email)
const docusignOptions = ref([])
const docusignTemplate = ref(null)
const docusignComments = ref('')

const commentsToggle = () => {
  if (sellMode.value) {
    docusignComments.value = props.comments
  } else {
    docusignComments.value = ''
  }
}

const sendDocusign = () => {
  loading.value = true
  let payload = {
    signer_email: docusignEmail.value,
    docusign_template_id: docusignTemplate.value,
    additional_comments: null,
    additional_comments_whithout_warranty: null,
    invite_docusign: false,
    booking: props.id
  }

  if (sellMode.value) {
    payload.additional_comments_whithout_warranty = docusignComments.value
  } else {
    payload.additional_comments = docusignComments.value
  }

  axios.post(`${import.meta.env.VITE_API}/docusign_send_envelope/`, payload).then(() => {
    loading.value = false
    props.toggle()
    modalTitle.value = 'Documentación enviada'
    modalMessage.value = 'La documentación ha sido enviada'
    info.value.modal.showModal()
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
    secondary="Cancelar"
    primary="Guardar"
    :disabled="!docusignTemplate"
    :loading="loading"
    @click-secondary="toggle"
    @click-primary="sendDocusign"
  />
</template>