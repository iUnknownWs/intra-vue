<script setup>
import HeaderMain from '@/components/HeaderMain.vue'
import IntegrationCard from '@/components/IntegrationCard.vue'
</script>

<template>
  <HeaderMain>
    <span class="text-3xl font-bold">Portales Web</span>
    <div class="mt-6 flex flex-col items-center gap-4 lg:flex-row">
      <IntegrationCard
        img="https://garageclub-prod.s3.amazonaws.com/backend/media/imagen_2024-01-30_210822393.png"
      />
      <IntegrationCard
        img="https://garageclub-prod.s3.amazonaws.com/backend/media/wallapop-logo-317DAB9D83-seeklogo.com.png"
      />
    </div>
  </HeaderMain>
</template>

<style scoped></style>
