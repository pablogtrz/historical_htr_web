<template>
  <v-dialog v-model="dialog" scrollable width="700" max-width="80%">
    <template #activator="{ on }">
      <p>
        o elegir una
        <strong class="image-input__example--btn" v-on="on">
          imagen de ejemplo
        </strong>
      </p>
    </template>

    <v-card>
      <v-card-title class="text-h5"> Elige imagen de ejemplo </v-card-title>
      <v-card-text>
        <v-radio-group v-model="selectedImageId">
          <v-radio value="orders">
            <template slot="label">
              <img
                ref="orders"
                src="@/assets/img/dataset_examples/orders.png"
                alt="orders label image"
              />
            </template>
          </v-radio>
          <v-radio value="twelve">
            <template slot="label">
              <img
                ref="twelve"
                src="@/assets/img/dataset_examples/twelve.png"
                alt="twelve label image"
              />
            </template>
          </v-radio>
          <v-radio value="officers">
            <template slot="label">
              <img
                ref="officers"
                src="@/assets/img/dataset_examples/officers.png"
                alt="officers label image"
              />
            </template>
          </v-radio>
        </v-radio-group>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="submit"> Aceptar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
      dialog: false,
      selectedImageId: '',
      images: ['orders', 'twelve', 'officers'],
    }
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
  methods: {
    submit() {
      this.dialog = false
      if (!this.selectedImageId) return
      const image = this.$refs[this.selectedImageId] as HTMLImageElement
      this.base64Image = image.src
      this.selectedImageId = ''
    },
  },
})
</script>

<style lang="scss" scoped>
.image-input {
  &__example {
    &--btn {
      color: var(--v-secondary-base);
      cursor: pointer;

      &:hover {
        opacity: 0.75;
        transition: 0.3s;
      }
    }
  }
}
</style>
