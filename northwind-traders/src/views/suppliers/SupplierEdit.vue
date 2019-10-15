<template>
  <div>
    <h1>{{id?`Supplier #${id}`:'New Supplier'}}</h1>
    <form class="form">
      <div class="form-group">
        <label class="col-form-label">Company Name</label>
        <input
          type="text"
          class="form-control"
          id="companyNameField"
          v-model="model.companyName"
          :class="{ 'is-invalid': errors && errors.companyName }"
        />
        <div class="invalid-feedback" v-if="errors && errors.companyName">{{ errors.companyName }}</div>
      </div>
      <div class="form-group">
        <label class="form-label">Contact Name</label>
        <input class="form-control" type="text" id="contactNameField" v-model="model.contactName" />
      </div>
      <div class="form-group">
        <label class="form-label">Contact Title</label>
        <input class="form-control" type="text" id="contactTitleField" v-model="model.contactTitle" />
      </div>
    </form>
    <p>
      <button @click="save()" class="btn btn-primary" id="saveButton">Save</button>
      <router-link class="btn" to="/suppliers">Cancel</router-link>
    </p>
  </div>
</template>
<script>
import { SuppliersService } from "@/services/NorthwindService.js";

export default {
  props: {
    id: String,
    supplier: Object
  },
  data() {
    return {
      model: Object,
      errors: {}
    };
  },
  created() {
    this.model = this.supplier || { address: {} };
    if (this.id && !this.supplier) {
      SuppliersService.get(this.id).then(r => (this.model = r.data));
    }
  },
  methods: {
    save() {
      if (this.id) {
        SuppliersService.update(this.model)
          .then(() => this.navigateBack())
          .catch(err => {
            if (err.response.status == 422) {
              this.errors = err.response.data.errors;
            }
          });
      } else {
        SuppliersService.create(this.model)
          .then(() => this.navigateBack())
          .catch(err => console.error(err));
      }
    },
    navigateBack() {
      this.$router.push("/suppliers");
    }
  }
};
</script>