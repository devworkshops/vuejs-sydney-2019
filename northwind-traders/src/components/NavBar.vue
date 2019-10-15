<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">Northwind Traders</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse is-nav id="navbarCollapse">
      <b-navbar-nav class="mr-auto" v-if="isLoggedIn">
        <b-nav-item to="/" :exact="true">Home</b-nav-item>
        <b-nav-item to="/suppliers">Suppliers</b-nav-item>
        <b-nav-item to="/categories">Categories</b-nav-item>
        <b-nav-item to="/products">Products</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item to="/login" v-if="!isLoggedIn">Login</b-nav-item>
        <b-nav-item @click="logout()" v-if="isLoggedIn">Logout</b-nav-item>
        <b-nav-item v-if="isLoggedIn" v-b-toggle.collapseNotifications>
          Notifications
          <b-badge>{{ $store.getters.notificationCount }}</b-badge>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { AuthService } from "@/services/NorthwindService.js";

export default {
  props: {
    user: Object
  },
  computed: {
    isLoggedIn() {
      return !!this.user;
    }
  },
  methods: {
    logout() {
      AuthService.logout();
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.nav > .container {
  min-height: 56px;
}
</style>