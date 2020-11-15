<template>
  <td class="filter-input">
    <input :list="column" type="text" v-model="search" />
    <datalist :id="column">
      <option
        v-for="item in getFilteredUniqueSet(category, column, search, maxOptions)"
        :key="item"
        :value="item"
      ></option>
    </datalist>
  </td>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      search: ""
    }
  },
  props: {
    category: {
      type: String,
      required: true
    },
    column: {
      type: String,
      required: true
    },
    maxOptions: {
      type: Number
    }
  },
  computed: {
    ...mapGetters("products", ["getUniqueSet","getFilteredUniqueSet"])
  }
}
</script>