<template>
  <div>
    <button
      @click="counter++"
      @contextmenu.prevent="counter--"
      :class="{positive:counter>0,negative:counter<0}"
    >{{counter}}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0
    };
  }
};
</script>

<style lang="scss" scoped>
</style>