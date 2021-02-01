<template>
  <div class="wrapper">
    <base-layout>
       <template v-slot:left-content>
         <left-content/>
       </template>
       <template v-slot:main-content>
         <request-detail/>
       </template>
       <template v-slot:right-content>
         <right-content/>
       </template>
    </base-layout>
  </div>
</template>

<script>
import BaseLayout from '../../../layouts/BaseLayout.vue'
import LeftContent from '../../../components/left-content'
import RightContent from '../../../components/right-content'
import RequestDetail from '../../../components/home/request-detail'
export default {
  components: {
    'base-layout': BaseLayout,
    'left-content': LeftContent,
    'right-content': RightContent,
    'request-detail': RequestDetail // Hiển thị tất cả những bệnh nhân có yêu cầu được theo dõi
  }
}
</script>

<style>

</style>
