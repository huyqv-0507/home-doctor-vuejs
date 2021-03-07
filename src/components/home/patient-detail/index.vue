<template>
  <div class="mainContent">
    <h1>Hồ sơ bệnh nhân {{patientHealth.patientName}}</h1>
    <h3>Sinh hiệu</h3>
    <p v-for="(item, index) in patientHealth.vitalSigns" :key="index">{{item.type}}: {{item.value}}</p>
    <h3>Biểu đồ sinh hiệu</h3>
    <line-chart />
  </div>
</template>

<script>
import LineChart from '../chart/LineChart.js'
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('patients', ['patientHealth'])
  },
  components: [LineChart],
  mounted () {
    this.getPatientHealth()
  },
  methods: {
    ...mapActions('patients', ['getPatientHealth'])
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
</style>
