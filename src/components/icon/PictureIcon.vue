<template functional>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-photo"
    :width="props.size"
    :height="props.size"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="#023047"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <line x1="15" y1="8" x2="15.01" y2="8" />
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5" />
    <path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2" />
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  functional: true,
  props: {
    size: {
      type: Number,
      default: 24,
    },
  },
})
</script>
