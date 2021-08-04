<template>
  <div>
    <v-btn color="secondary">Button</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as tfjs from '@tensorflow/tfjs'
import Tut from 'components/Tutorial.vue'

export default Vue.extend({
  components: { Tut },
  created() {
    console.log(tfjs)
  },
})
</script>
