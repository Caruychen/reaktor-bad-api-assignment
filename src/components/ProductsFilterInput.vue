<template>
  <td class="filter-input">
    <input
      @focus="focus"
      @blur="blur"
      @input="input($event, search)"
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
    ...mapGetters("availability", ["getAllAvailability"]),
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
      return Object.entries(this.availabilityLoadStatus).some(
        (manufacturer) => manufacturer[1]
      )
        ? this.getAllAvailability(this.category)
        : "";
    },
  },
  methods: {
    focus: function () {
      this.isSelected = true;
    },
    blur: function () {
      this.isSelected = false;
    },
    input(event, inputContent) {
      this.$emit("searchInput", this.column, inputContent);
    },
  },
};
</script>

<style scoped>
input {
  width: 95%;
}
</style>