<template>
  <div>
    <v-navigation-drawer v-model="innerDrawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Páginas</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in pages" :key="item.name" link>
          <v-list-item-icon class="mr-3 ml-2 navbar--icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <nuxt-link :to="item.link" class="navbar--link">
              {{ item.name }}
            </nuxt-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import routes from '@/constants/routes'

export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      pages: routes,
    }
  },
  computed: {
    innerDrawer: {
      set(value: boolean) {
        this.$emit('input', value)
      },
      get(): boolean {
        return this.value
      },
    },
  },
})
</script>

<style lang="scss">
.navbar {
  &--icon {
    > .v-icon {
      color: var(--v-secondary-base) !important;
    }
  }

  &--link {
    font-weight: 500 !important;
    text-decoration: none !important;
    font-size: 1.05rem;
    color: var(--v-secondary-base) !important;
  }
}
</style>
