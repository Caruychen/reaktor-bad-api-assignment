<template>
  <table>
    <tr>
      <th>Index</th>
      <th>Name</th>
      <th>ID</th>
      <th>Manufacturer</th>
      <th>Price</th>
      <th>Color</th>
      <th>Availability</th>
    </tr>
    <tr
      v-for="(product, index) in getProducts(category, currentPage)"
      :key="index"
    >
      <td>{{ index + (currentPage - 1) * 100 + 1 }}</td>
      <td>{{ product.name }}</td>
      <td>{{ product.id }}</td>
      <td>{{ product.manufacturer }}</td>
      <td>{{ product.price }}</td>
      <td>{{ product.color }}</td>
      <BaseAvailability
        :manufacturer="product.manufacturer"
        :id="product.id"
        :status="loadStatus[product.manufacturer]"
      />
    </tr>
  </table>
</template>

<script>
import BaseAvailability from "@/components/BaseAvailability.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      loadStatus: {},
    };
  },
  props: {
    category: {
      type: String,
      required: true,
    },
    currentPage: {
      type: Number,
      require: true,
    },
  },
  components: {
    BaseAvailability,
  },
  computed: {
    ...mapGetters("products", ["getProducts", "getManufacturerSet"]),
    ...mapGetters("availability", ["getAvailability"]),
    ...mapState(["availability"]),
  },
  methods: {
    ...mapActions("availability", ["fetchAvailability"]),
    ...mapMutations("availability", ["initAvailabilityManufacturer"]),
    loadAvailability: function () {
      const manufacturers = this.getManufacturerSet(this.category);
      manufacturers.forEach((manufacturer) => {
        if (!this.availability[manufacturer]) {
          this.initAvailabilityManufacturer(manufacturer);
        }
        this.$set(this.loadStatus, manufacturer, false);
        this.fetchAvailability(manufacturer).then((data) => {
          this.$set(this.loadStatus, manufacturer, data);
        });
      });
    },
  },
  created() {
    this.loadAvailability();
  }
};
</script>

<style scoped>
table {
  margin-left: auto;
  margin-right: auto;
  border-collapse: collapse;
}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #444;
  color: white;
}
table td,
table th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}

table tr:hover {
  background-color: #ddd;
}
</style>