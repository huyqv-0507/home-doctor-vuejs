<template>
  <div class="wrapper">
    <base-layout>
       <template v-slot:left-content>
         <left-content/>
       </template>
       <template v-slot:main-content>
         <main-content/>
       </template>
       <template v-slot:right-content>
         <right-content/>
       </template>
    </base-layout>
  </div>
</template>

<script>
import BaseLayout from '../../layouts/BaseLayout.vue'
import LeftContent from '../../components/left-content'
import RightContent from '../../components/right-content'
import MainContent from '../../components/home'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('users', ['user'])
  },
  components: {
    'base-layout': BaseLayout,
    'left-content': LeftContent,
    'right-content': RightContent,
    'main-content': MainContent
  }
}
</script>

<style>

</style>
