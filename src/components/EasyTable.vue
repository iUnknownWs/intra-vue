<template>
  <EasyDataTable
    :headers="headers"
    :items="items"
    buttons-pagination
    table-class-name="customize-table"
    header-text-direction="center"
    body-text-direction="center"
  >
    <template #item-admin="{ admin }">
      <Icon icon="mdi:check" v-if="admin" color="green" width="30" />
      <Icon icon="mdi:close" v-if="!admin" color="red" width="30" />
    </template>
    <template #item-delete="{}">
      <button class="btn btn-error btn-xs text-white">Eliminar</button>
    </template>
  </EasyDataTable>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'

defineProps({
  headers: { type: Object, required: true },
  items: { type: Object, required: true }
})
</script>

<style>
th:first-child {
  border-top-left-radius: 10px;
}
th:last-child {
  border-top-right-radius: 10px;
}
.vue3-easy-data-table__footer {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.customize-table {
  background: #fff;
  background-color: #fff;
  --easy-table-border: 1px solid #fff;
  --easy-table-row-border: 1px solid #000;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #000;
  --easy-table-header-border-radius: 10px;

  --easy-table-body-row-font-color: #000;
  --easy-table-body-row-background-color: #fff;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #2d3a4f;
  --easy-table-body-row-hover-background-color: #eee;

  --easy-table-footer-background-color: #000;
  --easy-table-footer-font-color: #fff;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;

  --easy-table-scrollbar-track-color: #2d3a4f;
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: #4c5d7a;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}
</style>
