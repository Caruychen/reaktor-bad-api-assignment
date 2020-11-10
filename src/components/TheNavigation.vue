<template>
  <div id="nav">
    <router-link
      v-for="category in categories"
      :key="category"
      :to="{
        name: 'Products',
        params: {
          category
        },
      }"
    >
      {{ category }}
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        'jackets',
        'shirts',
        'accessories'
      ]
    }
  }
}
</script>