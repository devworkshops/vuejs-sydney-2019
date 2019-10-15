<template>
  <div>
    <h1>{{ id ? `Product #${id}` : 'New Product' }}</h1>

    <form @submit.prevent="save()">
      <base-input label="Name" :validationModel="$v.model.name">
        <input
          type="text"
          class="form-control"
          v-model.trim.lazy="$v.model.name.$model"
          :class="{ 'is-invalid': $v.model.name.$error }"
        />
      </base-input>
      <div class="form-group">
        <label>Category</label>
        <select class="form-control" v-model.number="model.categoryID">
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >{{ category.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>Supplier</label>
        <select class="form-control" v-model.number="model.supplierID">
          <option
            v-for="supplier in suppliers"
            :key="supplier.id"
            :value="supplier.id"
          >{{ supplier.companyName }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>Quantity Per Unit</label>
        <input type="text" class="form-control" v-model="model.quantityPerUnit" />
      </div>
      <div class="form-row">
        <base-input
          label="Unit Price"
          type="number"
          :validationModel="$v.model.unitPrice"
          class="col-md-4"
        ></base-input>
        <base-input
          label="Units In Stock"
          type="number"
          :validationModel="$v.model.unitsInStock"
          class="col-md-4"
        ></base-input>
        <base-input
          label="Units On Order"
          type="number"
          :validationModel="$v.model.unitsOnOrder"
          class="col-md-4"
        ></base-input>
      </div>
      <div class="form-row">
        <base-input
          label="Reorder Level"
          type="number"
          :validationModel="$v.model.reorderLevel"
          class="col-md-4"
        ></base-input>
        <div class="form-group col-md-4">
          <label>Status</label>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="discontinuedCheckbox"
              v-model="model.discontinued"
            />
            <label class="form-check-label" for="discontinuedCheckbox">Discontinued</label>
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Save</button>
      <button @click="navigateBack()" class="btn btn-default">Cancel</button>
    </form>
  </div>
</template>

<script>
import {
  CategoriesService,
  SuppliersService,
  ProductsService
} from "@/services/NorthwindService.js";

import {
  required,
  minLength,
  maxLength,
  decimal,
  numeric,
  minValue,
  helpers
} from "vuelidate/lib/validators";

const _reorderNotRequired = helpers.withParams(
  {
    type: "_reorderNotRequired",
    message: "Stock has run out! Units on order must be greater than zero."
  },
  (value, vm) => vm.discontinued || vm.unitsInStock > 0 || vm.unitsOnOrder > 0
);

export default {
  props: {
    id: String,
    product: Object
  },
  data() {
    return {
      categories: [],
      suppliers: [],
      model: {
        id: 0,
        supplierID: null,
        categoryID: null,
        quantityPerUnit: "",
        unitPrice: 0.0,
        unitsInStock: 0,
        unitsOnOrder: 0,
        reorderLevel: 0,
        discontinued: false,
        name: ""
      }
    };
  },
  validations: {
    model: {
      name: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(40),
        isUnique(value) {
          if (value === "") return true;
          if (this.id) return true;
          return ProductsService.isUniqueProductName(value);
        }
      },
      unitPrice: {
        decimal,
        minValue: minValue(0)
      },
      unitsInStock: {
        numeric,
        minValue: minValue(0)
      },
      unitsOnOrder: {
        numeric,
        minValue: minValue(0),
        _reorderNotRequired
      },
      reorderLevel: {
        numeric,
        minValue: minValue(0)
      }
    }
  },
  methods: {
    save() {
      this.$v.$touch();

      if (this.$v.$invalid) return;

      if (this.id) {
        ProductsService.update(this.model)
          .then(() => this.navigateBack())
          .catch(error => {
            console.error(error);
          });
      } else {
        ProductsService.create(this.model)
          .then(() => this.navigateBack())
          .catch(error => {
            console.error(error);
          });
      }
    },
    navigateBack() {
      this.$router.push("/products");
    }
  },
  created() {
    CategoriesService.getAll().then(result => (this.categories = result.data));

    SuppliersService.getAll().then(result => (this.suppliers = result.data));

    this.model = this.product || this.model;
    if (this.id && !this.product) {
      ProductsService.get(this.id).then(result => (this.model = result.data));
    }
  }
};
</script>