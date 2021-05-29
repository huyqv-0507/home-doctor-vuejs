<template>
  <el-dialog :visible="isViewHeartRateShare" @close="closeViewHeartRateShare" center>
    <template slot="title">Chi tiết</template>
    <div v-if="currentHeartRateValue !== null">
      <v-chart
        v-if="chartShareOption !== null"
        class="chart"
        :option="chartShareOption"
        :init-options="{ width: '500px', height: '500px' }"
      />
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('modals', ['isViewHeartRateShare']),
    ...mapState('vitalSign', ['currentHeartRateValue', 'chartShareOption'])
  },
  methods: {
    ...mapActions('modals', ['closeViewHeartRateShare'])
  }
}
</script>

<style>

</style>
