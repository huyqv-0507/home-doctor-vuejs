<template>
 <div class="wrapper">
   <header-default class="header-content"/>
   <main>
     <el-row>
       <el-col :span="5">
         <slot name="left-content"/>
       </el-col>
       <el-col :span="14" class="main-content">
         <slot name="main-content"/>
       </el-col>
       <el-col :span="5">
         <slot name="right-content"/>
       </el-col>
     </el-row>
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
.main-content {
  margin: 1em;
  padding: 2em 1em;
  border-radius: 6px;
  overflow: scroll;
  background-color: #EEEFF3;
}
</style>
