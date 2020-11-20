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
        ? this[`${this.category}Availability`]
        : this.getFilteredUniqueSet(
            this.category,
            this.column,
            this.search,
            this.maxOptions
          );
    },
  },
  watch: {
    search: function () {
      this.$emit("searchInput", this.column, this.search);
    },
    /*
     * Compute availabilities immediated on availability data update.
     * Auto-complete datalist shows faster when user first clicks
     */
    availabilityLoadStatus: {
      handler() {
        this[`${this.category}Availability`];
      },
      deep: true,
    },
  },
  methods: {
    select: function () {
      this.isSelected = true;
    },
    deselect: function () {
      this.isSelected = false;
    },
  },
  beforeCreate() {
    // Create computed properties for each category on the fly
    const keys = ["jackets", "shirts", "accessories"];
    keys.forEach((key) => {
      this.$options.computed[`${key}Availability`] = function () {
        // Possible availabilities list will update as data changes
        return Object.entries(this.availabilityLoadStatus).some(
          (manufacturer) => manufacturer[1]
        )
          ? this.getAvailabilitySet(key)
          : "";
      };
    });
  }
};
</script>

<style scoped>
input {
  width: 95%;
}
</style>