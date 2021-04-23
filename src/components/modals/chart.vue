<template>
  <el-dialog
    :visible="isChartView"
    v-if="patientOptions !== null"
    @close="closeChartView()"
    width="50%"
    center
  >
    <template slot="title">Chi tiết chỉ số sinh hiệu</template>
    <div>
      <div>Chọn biểu đồ theo ngày</div>
      <el-select v-model="value" @change="changeDate($event)" placeholder="Chọn" size="mini">
        <el-option
          v-for="(value) in heartRateValues"
          :key="value.dateCreated"
          :value="value.dateCreated.split('T')[0].split('-').reverse().join('/')"
        ></el-option>
      </el-select>
      <v-chart
        v-if="patientOptions !== null"
        class="chart"
        :option="patientOptions.option"
        :init-options="patientOptions.initOptions"
      />
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      value: {}
    }
  },
  computed: {
    ...mapState('vitalSign', ['patientOptions', 'heartRateValues']),
    ...mapState('modals', ['isChartView'])
  },
  methods: {
    ...mapActions('modals', ['closeChartView']),
    changeDate (event) {
      this.$store.dispatch('vitalSign/setHeartRateChart', event.split('/').reverse().join('-'), { root: true })
    }
  }
}
</script>

<style>
</style>
