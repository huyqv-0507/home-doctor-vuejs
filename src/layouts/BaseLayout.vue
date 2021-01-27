<template>
 <div class="wrapper">
   <header-default class="header-content"/>
   <main class="container">
     <div class="left-content">
       <slot name="left-content"/>
     </div>
     <div class="main-content">
       <slot name="main-content"/>
     </div>
     <div class="right-content">
       <slot name="right-content"/>
     </div>
   </main>
   <footer-default class="footer-content"/>
 </div>
</template>

<script>
import HeaderDefault from '../components/header'
import FooterDefault from '../components/footer'
export default {
  components: {
    'header-default': HeaderDefault,
    'footer-default': FooterDefault
  }
}
</script>

<style style="scss">
.wrapper {
    position: relative;
    min-height: 100%;
}
.container {
 background-color: cornflowerblue;
 width: 100%;
 top: 2.5em;
 position: absolute;
}
.header-content {
    top: 0;
    left: 0;
    right: 0;
    height: 2.5em;
    background: chocolate;
    position: fixed;
}
.footer-content {
    bottom: 0;
    left: 0;
    right: 0;
    background: chocolate;
    position: absolute;
}
.left-content {
    background-color: cornflowerblue;
    width: 20%;
    left: 0;
    position: fixed;
    height: 43.75em;
}
.right-content {
    background-color: cornflowerblue;
    width: 20%;
    right: 0;
    position: fixed;
    height: 43.75em;
}
.main-content {
    right: 30%;
    left: 30%;
    position: fixed;
}
</style>
