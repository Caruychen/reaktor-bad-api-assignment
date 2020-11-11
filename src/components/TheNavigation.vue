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

<style scoped>
#nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  background-color: #ccc;
  display: flex;
  justify-content: center;
}

#nav a {
  text-decoration: none;
  font-weight: bold;
  color: #2c3e50;
  background-color: #ddd;
  width: 5rem;
  padding: 0 1rem;
  margin: 5px 1px;
  border: 1px solid #2c3e50;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease;
}

#nav a:hover {
  font-size: 1.3rem;
  width: 6rem;
}

#nav a.router-link-exact-active {
  color: #42b983;
  background-color: #2c3e50;
}
</style>