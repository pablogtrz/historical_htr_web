<template>
  <div id="drag-and-drop" class="drag-and-drop">
    <input
      ref="fileInput"
      type="file"
      name="file"
      style="display: none"
      accept=".jpg,.jpeg,.png"
      @change="setFile"
    />
    <v-btn color="primary" class="block mx-auto" @click="searchFile">
      <div class="align-middle inline-block">
        <UploadIcon />
      </div>
      <span class="align-middle inline-block">Subir imagen</span>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UploadIcon from 'components/icon/UploadIcon.vue'

export default Vue.extend({
  components: {
    UploadIcon,
  },
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
      console.log(await this.toBase64(file))
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
.drag-and-drop {
  display: block;
  margin: 4px auto 0;
  padding: 1rem 3.5rem;
  border-radius: 10px;
  text-align: center;
  color: var(--v-primary);
  max-width: 25rem;
  transition: 0.5s;
  border: 1px darken(white, 10) solid;
}

.dragover {
  margin: 0px auto;
  transition: 0.15s;
  padding: calc(1rem - 1px) 3.5rem;
  border: 2px darken(white, 20) dashed;
  background: lighten(white, 10);
  cursor: grabbing;
}
</style>
