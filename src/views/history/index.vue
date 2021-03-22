<template>
  <base-layout>
    <template v-slot:left-content>
      <left-content />
    </template>
    <template v-slot:main-content>
      <router-view/>
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from '../../layouts/BaseLayout.vue'
import HistoryLeft from '../../components/left-content/History.vue'
export default {
  components: {
    'base-layout': BaseLayout,
    'left-content': HistoryLeft
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/index.scss';
</style>
