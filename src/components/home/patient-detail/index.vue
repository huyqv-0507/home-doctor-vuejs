<template>
  <div class="mainContent">
    <h1>Hồ sơ bệnh nhân {{patientSelected.patientName}}</h1>
    <h3>Sinh hiệu</h3>
    <h3>Biểu đồ sinh hiệu</h3>
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
    <el-button type="primary" size="mini" @click="openSelectMedicalInstructionModalSub()">Thêm y lệnh</el-button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      value: {}
    }
  },
  computed: {
    ...mapState('patients', ['patientHealth']),
    ...mapState('vitalSign', ['heartRateValues', 'patientOptions']),
    ...mapState('medicalInstruction', ['patientSelected'])
  },
  mounted () {
    this.getVitalSignHealthPatient()
  },
  methods: {
    ...mapActions('vitalSign', ['getVitalSignHealthPatient']),
    ...mapActions('modals', ['openSelectMedicalInstructionModalSub']),
    changeDate (event) {
      this.$store.dispatch('vitalSign/setHeartRateChart', event.split('/').reverse().join('-'), { root: true })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.chart {
  height: 600px;
}
</style>
