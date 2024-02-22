<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="avatar btn btn-circle btn-ghost">
      <slot name="btn" />
    </div>
    <ul
      tabindex="0"
      class="menu dropdown-content menu-sm z-10 mt-3 min-w-56 rounded-box bg-base-100 p-2 font-medium shadow"
    >
      <slot name="content" />
    </ul>
  </div>
</template>