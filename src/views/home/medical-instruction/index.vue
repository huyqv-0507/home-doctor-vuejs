<template>
  <div class="wrapper">
    <base-layout>
       <template v-slot:left-content>
         <left-content/>
       </template>
       <template v-slot:main-content>
         <medical-instruction/>
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
import MedicalInstruction from '../../../components/home/medical-instruction'
export default {
  components: {
    'base-layout': BaseLayout,
    'left-content': LeftContent,
    'right-content': RightContent,
    'medical-instruction': MedicalInstruction // Hiển thị tất cả những bệnh nhân có yêu cầu được theo dõi
  }
}
</script>

<style>

</style>
