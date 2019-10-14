<template>
  <div id="app">
    <header>
      <nav-bar></nav-bar>
    </header>

    <div class="container">
      <div class="row">
        <div class="col">
          <main role="main" class="flex-shrink-0">
            <div class="container">
              <router-view/>
            </div>
          </main>
        </div>
      </div>
    </div>
    <footer class="footer mt-auto py-3">
      <div class="container">
        <span class="text-muted">Northwind Traders &copy;</span>
      </div>
    </footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "app",
  components: {
    NavBar
  }
};
</script>

<style>
html,
body {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

main > .container {
  padding: 8px 15px 8px 15px;
}

.footer {
  background-color: #f5f5f5;
}

.footer > .container {
  padding-right: 15px;
  padding-left: 15px;
}
</style>