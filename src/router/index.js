import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/products/:category",
    name: "Products",
    props: true,
    component: () => import(/* webpackChunkName: "products" */ '../views/Products.vue'),
  },
  {
    path: "",
    redirect: "/products/jackets"
  },
  {
    path: "/404",
    alias: "*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "notFound" */ "../views/NotFound.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
