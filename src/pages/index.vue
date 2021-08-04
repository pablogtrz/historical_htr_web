<template>
  <div>
    <v-btn color="secondary">Button</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as tfjs from '@tensorflow/tfjs'

export default Vue.extend({
  created() {
    console.log(tfjs)
  },
})
</script>
