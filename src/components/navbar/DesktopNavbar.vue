<template>
  <div class="ml-10">
    <template v-for="page in pages">
      <nuxt-link :key="page.link" class="mr-3 navbar-link" :to="page.link">
        {{ page.name }}
      </nuxt-link>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import routes from '@/constants/routes'

export default Vue.extend({
  data() {
    return {
      pages: routes,
    }
  },
})
</script>

<style lang="scss" scoped>
.navbar-link {
  font-weight: 500;
  text-decoration: none;
}
</style>
