<script setup>
import { RouterView } from 'vue-router'
import axios from 'axios'
axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`
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
