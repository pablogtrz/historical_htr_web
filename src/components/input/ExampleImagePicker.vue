<template>
  <div>
    <input
      ref="fileInput"
      type="file"
      name="file"
      style="display: none"
      accept=".jpg,.jpeg,.png"
      @change="setFile"
    />
    <p>
      o elegir una
      <u class="image-input__example--btn" @click="searchFile">
        <strong> imagen de ejemplo </strong>
      </u>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  computed: {
    file: {
      set(newValue: string) {
        this.$emit('input', newValue)
      },
      get(): string {
        return this.value
      },
    },
  },
  methods: {
    searchFile() {
      const fileInput = this.$refs.fileInput as HTMLInputElement
      if (fileInput) {
        fileInput.click()
      }
    },
    async setFile() {
      const fileInput = this.$refs.fileInput as HTMLInputElement
      const file = fileInput.files?.item(0)!
      this.file = (await this.toBase64(file)) as string
    },
    toBase64(file: File): Promise<string | ArrayBuffer | null> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.image-input {
  &__example {
    &--btn {
      color: var(--v-primary);
      font-weight: 500;
      cursor: pointer;

      :hover {
        opacity: 0.75;
        transition: 0.3s;
      }
    }
  }
}
</style>
