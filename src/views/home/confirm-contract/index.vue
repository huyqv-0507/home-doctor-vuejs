<template>
  <div class="wrapper">
    <base-layout>
       <template v-slot:left-content>
         <left-content/>
       </template>
       <template v-slot:main-content>
         <confirm-contract/>
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
import ConfirmContract from '../../../components/home/confirm-contract'
export default {
  name: 'ContractRequest',
  components: {
    'base-layout': BaseLayout,
    'left-content': LeftContent,
    'right-content': RightContent,
    'confirm-contract': ConfirmContract
  }
}
</script>

<style>

</style>
