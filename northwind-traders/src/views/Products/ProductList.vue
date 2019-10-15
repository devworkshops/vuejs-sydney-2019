<template>
  <div>
    <div class="clearfix">
      <h1 class="float-left">Products</h1>
      <router-link tag="button" class="btn btn-primary float-right" :to="{ name: 'products-new' }">
        <i class="fas fa-plus"></i>
      </router-link>
    </div>
    <b-table striped hover :items="products" :fields="fields">
      <template v-slot:cell(actions)="data">
        <router-link
          tag="button"
          :to="{ name: 'products-edit', params: { id: data.item.id.toString(), product: data.item } }"
          class="btn btn-secondary btn-sm"
        >
          <i class="fas fa-edit"></i>
        </router-link>
        <button class="btn btn-danger btn-sm" @click="remove(data.item.id)">
          <i class="fas fa-trash-alt"></i>
        </button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { ProductsService } from "@/services/NorthwindService.js";

export default {
  data() {
    return {
      fields: [
        { key: "name", sortable: true },
        { key: "unitPrice", label: "Price" },
        { key: "unitsInStock", label: "Stock" },
        { key: "actions" }
      ],
      products: []
    };
  },
  created() {
    this.fetchAll();
  },
  methods: {
    fetchAll() {
      ProductsService.getAll()
        .then(result => (this.products = result.data))
        .catch(error => console.error(error));
    },
    remove(id) {
      ProductsService.delete(id)
        .then(() => (this.products = this.products.filter(p => p.id !== id)))
        .catch(error => console.error(error));
    }
  }
};
</script>

<style scoped>
</style>