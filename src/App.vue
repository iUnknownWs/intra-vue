<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    }
  }
}
</script>
