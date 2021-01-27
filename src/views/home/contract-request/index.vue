<template>
  <div class="wrapper">
    <base-layout>
       <template v-slot:left-content>
         <left-content/>
       </template>
       <template v-slot:main-content>
         <contract-request/>
       </template>
       <template v-slot:right-content>
         <right-content/>
       </template>
    </base-layout>
  </div>
</template>

<script>
import BaseLayout from '../../../layouts/BaseLayout.vue'
import LeftContent from '../../../components/home/LeftContent.vue'
import RightContent from '../../../components/home/RightContent.vue'
import ContractRequest from '../../../components/home/contracts-request'
export default {
  components: {
    'base-layout': BaseLayout,
    'left-content': LeftContent,
    'right-content': RightContent,
    'contract-request': ContractRequest // Hiển thị tất cả những bệnh nhân có yêu cầu được theo dõi
  }
}
</script>

<style>

</style>
