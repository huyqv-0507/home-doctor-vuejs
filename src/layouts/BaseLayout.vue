<template>
 <div class="wrapper">
   <header-default/>
   <main class="layout-wrapper">
     <slot name="left-content" class="layout-wrapper_left-content"/>
     <slot name="main-content" class="layout-wrapper_main-content"/>
     <slot name="right-content" class="layout-wrapper_right-content"/>
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

</style>
