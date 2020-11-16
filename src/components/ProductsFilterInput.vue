<template>
  <td class="filter-input">
    <input @focus="focus" @blur="blur" :list="column" type="text" v-model="search" />
    <datalist v-if="isSelected" :id="column">
      <option v-for="item in optionSet" :key="item" :value="item"></option>
    </datalist>
  </td>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      search: "",
      isSelected: false
    };
  },
  props: {
    category: {
      type: String,
      required: true,
    },
    column: {
      type: String,
      required: true,
    },
    maxOptions: {
      type: Number,
    },
    loadStatus: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters("products", ["getUniqueSet", "getFilteredUniqueSet"]),
    ...mapGetters("availability", ["getAllAvailability"]),
    optionSet: function () {
      return this.loadStatus
        ? this.availabilityOptions
        : this.getFilteredUniqueSet(
            this.category,
            this.column,
            this.search,
            this.maxOptions
          );
    },
    availabilityOptions: function () {
      return Object.entries(this.loadStatus).some(
        (manufacturer) => manufacturer[1]
      )
        ? this.getAllAvailability(this.category)
        : "";
    }
  },
  methods: {
    focus: function() {
      this.isSelected = true;
    },
    blur: function() {
      this.isSelected = false;
    }
  }
};
</script>

<style scoped>
input {
  width: 95%
}
</style>