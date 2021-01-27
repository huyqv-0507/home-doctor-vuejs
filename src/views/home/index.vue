<template>
  <div class="wrapper">
    <base-layout>
       <template v-slot:left-content>
         <left-content/>
       </template>
       <template v-slot:main-content><h1>{{user}}</h1></template>
       <template v-slot:right-content>
         <right-content/>
       </template>
    </base-layout>
  </div>
</template>

<script>
import BaseLayout from '../../layouts/BaseLayout.vue'
import LeftContent from '../../components/home/LeftContent.vue'
import RightContent from '../../components/home/RightContent.vue'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('users', ['user'])
  },
  components: {
    'base-layout': BaseLayout,
    'left-content': LeftContent,
    'right-content': RightContent
  }
}
</script>

<style>

</style>
