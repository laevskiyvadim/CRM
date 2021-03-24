<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>
<script>
import auth from "./layouts/auth";
import MainLayout from "./layouts/MainLayout";
export default {
  computed: {
    layout() {
      return this.$route.meta.layout || "auth";
    },
  },
  components: {
    auth,
    MainLayout,
  },
};
</script>
<style >
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
