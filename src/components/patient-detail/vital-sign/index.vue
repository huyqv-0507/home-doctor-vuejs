<template>
  <div class="mainContent">
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>Bệnh nhân</el-breadcrumb-item>
        <el-breadcrumb-item>Sinh hiệu</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-theme">
      <h2>Sinh hiệu</h2>
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-date"></i> Hàng ngày
          </span>
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
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-share"></i> Chia sẻ
          </span>
          <div>
            <el-table :data="allVitalSignShare">
              <el-table-column label="STT" width="70" prop="vitalSignShareId"></el-table-column>
              <el-table-column label="Giờ đo" width="220" prop="timeShare"></el-table-column>
              <el-table-column label="Thời gian đo (phút)" width="250" prop="minuteShare"></el-table-column>
              <el-table-column label="Chi tiết" width="150">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleView(scope.$index, scope.row)"
                  >Xem</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
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
    ...mapState('medicalInstruction', ['patientSelected']),
    ...mapState('vitalSIgn', ['allVitalSignShare'])
  },
  mounted () {
    this.getVitalSignHealthPatient()
  },
  methods: {
    ...mapActions('vitalSign', ['getVitalSignHealthPatient']),
    ...mapActions('modals', ['openSelectMedicalInstructionModalSub']),
    changeDate (event) {
      this.$store.dispatch(
        'vitalSign/setHeartRateChart',
        event
          .split('/')
          .reverse()
          .join('-'),
        { root: true }
      )
    },
    handleView () {
      this.$store.dispatch('modals/openViewHeartRateShare', null, { root: true })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
</style>
