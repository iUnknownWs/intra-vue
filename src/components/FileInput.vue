<script setup>
defineProps({
  label: { type: String, required: true },
  accept: { type: String, default: 'image/*' },
  multiple: { type: Boolean, default: false }
})

const emit = defineEmits(['file-selected'])

const handleFile = (e) => {
  const filesSelect = e.target.files[0]
  emit('file-selected', filesSelect)
}
</script>

<template>
  <label class="form-control w-full max-w-xs">
    <div class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </div>
    <input
      type="file"
      class="file-input file-input-bordered w-full max-w-xs"
      :accept="accept"
      :multiple="multiple"
      @change="handleFile"
      capture
    />
  </label>
</template>
