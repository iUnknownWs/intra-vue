<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
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
  dataKey: {
    type: String,
    required: true
  },
  updateUrl: {
    type: String
  },
  updateFunction: {
    type: Function
  },
  deleteUrl: {
    type: [String]
  },
  params: {
    type: Object
  },
  mobile: {
    type: Boolean
  },
  skeletons: {
    type: Number,
    default: 6
  }
})
const images = ref([])
const loading = ref(true)
const galleryHover = ref(null)
const imagesParams = [
  {
    key: 'vehicle',
    value: props.id
  }
]

if (props.params) {
  imagesParams.push(props.params)
}

const fetchingGallery = () => {
  loading.value = true
  axios.get(props.url).then((response) => {
    images.value = response.data[props.dataKey]
    loading.value = false
  })
}

const optionsDrag = computed(() => {
  return {
    draggable: '.draggable',
    animation: 150,
    ghostClass: 'ghost',
    dragClass: 'drag',
    scroll: true,
    forceFallback: true,
    bubbleScroll: true
  }
})

const updateImages = (event) => {
  images.value.splice(event.newIndex, 0, images.value.splice(event.oldIndex, 1)[0])

  let newImages = []

  for (let image of images.value) {
    newImages.push({
      media_id: image.id,
      media_type: 'image'
    })
  }

  axios.post(props.updateUrl, newImages).then(() => {
    fetchingGallery()
    if (props.updateFunction) props.updateFunction()
  })
}

const deleteImage = (id) => {
  axios
    .delete(props.deleteUrl + id)
    .then(() => {
      fetchingGallery()
    })
    .catch((error) => {
      console.error(error)
    })
}

onMounted(() => {
  fetchingGallery()
})
</script>

<template>
  <DragDrop
    v-if="!mobile"
    type="image"
    :url="deleteUrl"
    :fetch="fetchingGallery"
    format=".jpg"
    :params="imagesParams"
  />
  <DropMobile
    v-else
    type="image"
    :url="deleteUrl"
    :fetch="fetchingGallery"
    format=".jpg"
    :params="imagesParams"
  />
  <div v-if="loading" :class="$attrs.class">
    <div v-for="i in skeletons" :key="i" class="skeleton aspect-square min-h-28 gap-3"></div>
  </div>
  <Sortable
    v-else
    :list="images"
    item-key="id"
    :options="optionsDrag"
    :class="$attrs.class"
    @sort="updateImages"
  >
    <template #item="{ element, index }">
      <div
        @mouseover="galleryHover = index"
        @mouseleave="galleryHover = null"
        class="draggable relative aspect-square w-full min-w-28 rounded bg-cover bg-center object-cover"
        :style="{
          backgroundImage: `url(${element.image})`
        }"
      >
        <div
          class="absolute inset-0 flex items-center justify-center gap-3 rounded"
          :class="{
            hidden: galleryHover !== index,
            'bg-black/30': galleryHover === index
          }"
        >
          <a :href="element.image" target="_blank" class="btn btn-square btn-secondary btn-sm">
            <Icon icon="mdi:eye" width="20" />
          </a>
          <button class="btn btn-square btn-error btn-sm" @click="deleteImage(element.id)">
            <Icon icon="mdi:delete" width="20" />
          </button>
        </div>
      </div>
    </template>
  </Sortable>
</template>
