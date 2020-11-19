<template>
  <td class="products-search-input">
    <input
      @focus="select"
      @blur="deselect"
      :list="column"
      type="text"
      v-model="search"
    />
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
      searchProxy: "",
      isSelected: false,
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
    availabilityLoadStatus: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters("products", ["getFilteredUniqueSet"]),
    ...mapGetters("availability", ["getAvailabilitySet"]),
    search: {
      get() {
        return this.searchProxy;
      },
      set(input) {
        this.searchProxy =
          this.column === "name" || this.column === "availability"
            ? input.toUpperCase()
            : input;
      },
    },
    optionSet: function () {
      // Returns different function when retrieving availability options
      return this.availabilityLoadStatus
        ? this.availabilityOptions
        : this.getFilteredUniqueSet(
            this.category,
            this.column,
            this.search,
            this.maxOptions
          );
    },
    availabilityOptions: function () {
      // Return availability data once first dataset returns
      return Object.entries(this.availabilityLoadStatus).some(
        (manufacturer) => manufacturer[1]
      )
        ? this.getAvailabilitySet(this.category)
        : "";
    },
  },
  watch: {
    search: function() {
      this.$emit("searchInput", this.column, this.search);
    }
  },
  methods: {
    select: function () {
      this.isSelected = true;
    },
    deselect: function () {
      this.isSelected = false;
    }
  },
};
</script>

<style scoped>
input {
  width: 95%;
}
</style>