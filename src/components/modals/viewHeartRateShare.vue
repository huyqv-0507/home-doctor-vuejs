<template>
  <el-dialog :visible="isViewHeartRateShare" @close="closeViewHeartRateShare">
    <template slot="title">Chi tiết</template>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('modals', ['isViewHeartRateShare'])
  },
  methods: {
    ...mapActions('modals', ['closeViewHeartRateShare'])
  }
}
</script>

<style>

</style>
