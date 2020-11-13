import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store/index.js";

Vue.use(VueRouter)

const routes = [
  {
    path: "/products/:category",
    name: "Products",
    props: true,
    component: () => import(/* webpackChunkName: "products" */ '../views/Products.vue'),
    beforeEnter: (to, from, next) => {
      const exists = !!store.state.products[to.params.category];
      exists 
        ? next() 
        : next({ name: "NotFound" });
    }
  },
  {
    path: "",
    redirect: "/products/jackets"
  },
  {
    path: "/products",
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
