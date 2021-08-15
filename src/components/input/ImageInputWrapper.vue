<template>
  <div>
    <div class="mb-3">
      <ImageInput v-model="base64Image" />
    </div>
    <ExampleImagePicker v-model="base64Image" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ImageInput from 'components/input/ImageInput.vue'
import ExampleImagePicker from 'components/input/ExampleImagePicker.vue'

export default Vue.extend({
  components: {
    ImageInput,
    ExampleImagePicker,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  computed: {
    base64Image: {
      set(newValue: string) {
        this.$emit('input', newValue)
      },
      get(): string {
        return this.value
      },
    },
  },
})
</script>
