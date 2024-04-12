import { ref } from "vue"
import { defineStore } from "pinia"

export const useUserStore = defineStore('user', () => {
    const id = ref('')
    const name = ref('')
    const email = ref('')
    const image = ref('')
    const lastName = ref('')
    const perms = ref([])
    const isAdmin = ref(false)

    return { id, name, email, image, lastName, perms, isAdmin }
}, {
    persist: true
})