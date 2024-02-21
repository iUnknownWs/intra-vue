<template>
  <label class="form-control mt-4 w-full">
    <div class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </div>
    <Slider v-model="value" class="slider-style" :min="min" :max="max" />
  </label>
</template>

<script>
import Slider from '@vueform/slider'

export default {
  components: {
    Slider
  },
  props: {
    label: {
      type: String
    },
    min: {
      type: Number,
      coerce: function (val) {
        return val * 1
      }
    },
    max: {
      type: Number,
      coerce: function (val) {
        return val * 1
      }
    }
  },
  data() {
    return {
      value: [this.min, this.max]
    }
  }
}
</script>

<style src="@vueform/slider/themes/default.css"></style>
