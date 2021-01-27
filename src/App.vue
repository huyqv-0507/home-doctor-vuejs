<template>
  <div id="app">
      <router-view/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      layout: 'div'
    }
  }
}
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
html {
   height: 100%;
   font-family: 'Arial, Helvetica, sans-serif';
}
</style>
