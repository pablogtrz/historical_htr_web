<template>
  <div>
    <div
      ref="imageInput"
      class="image-input__drop"
      draggable="true"
      @drop.prevent="addDropFile"
      @dragover.prevent
      @dragenter="onDragStart"
      @dragleave="onDragLeave"
      @click="searchFile"
    >
      <input
        ref="fileInput"
        type="file"
        name="file"
        hidden
        accept=".jpg,.jpeg,.png"
        @change="setFile"
      />
      <img
        src="@/assets/img/image.svg"
        class="image-input__drop--img d-block mx-auto mb-3"
        alt="Image icon"
      />
      <p v-if="!isDragging" class="image-input__drop--text">
        Arrastra la imagen o clickea para
        <strong class="image-input__drop--btn">buscar en tus archivos</strong>
      </p>
      <p v-else class="image-input__drop--text">Suelta el archivo</p>
    </div>

    <v-snackbar v-model="snackbar" color="error">
      El formato de archivo debe ser ".png", ".jpg" o ".jpeg"
      <template #action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
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
  data() {
    return {
      snackbar: false,
      isDragging: false,
    }
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
    async addDropFile(event: DragEvent) {
      const file = event.dataTransfer!.files[0]
      if (this.isValidFileType(file)) {
        this.file = (await this.toBase64(file)) as string
      } else {
        this.snackbar = true
        this.onDragLeave()
      }
    },
    onDragStart() {
      const input = this.$refs.imageInput as HTMLElement
      input.classList.add('dragging')
    },
    onDragLeave() {
      const input = this.$refs.imageInput as HTMLElement
      input.classList.remove('dragging')
    },
    isValidFileType(file: File) {
      const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png']
      return allowedTypes.includes(file.type)
    },
  },
})
</script>

<style lang="scss">
.image-input {
  &__drop {
    display: block;
    margin: 0 auto;
    padding: 1rem;
    border-radius: 10px;
    text-align: center;
    max-width: 35rem;
    transition: 0.25s;
    background: darken(white, 5);
    border: 1px darken(white, 15) solid;
    cursor: pointer;

    &--btn {
      color: var(--v-secondary-base);
      pointer-events: none;
    }
    &--img {
      pointer-events: none;
    }
    &--text {
      pointer-events: none;
    }
  }
}

.image-input__drop:hover {
  background: white;
}

.dragging {
  background: var(--v-primary-lighten3);
  cursor: grabbing;
}
</style>
