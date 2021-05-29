<template>
  <div class="mainContent">
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>Bệnh nhân</el-breadcrumb-item>
        <el-breadcrumb-item>Sinh hiệu</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-theme">
      <h2 style="margin-bottom: 1em;">Sinh hiệu</h2>
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-date"></i> Theo ngày
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
              <el-table-column label="STT" width="70" type="index"></el-table-column>
              <el-table-column label="Ngày đo" width="110" prop="dateShare"></el-table-column>
              <el-table-column label="Giờ đo" width="110" prop="hourShare"></el-table-column>
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
    ...mapState('vitalSign', ['allVitalSignShare'])
  },
  mounted () {
    this.getVitalSignHealthPatient()
    this.getAllVitalSignShare()
  },
  methods: {
    ...mapActions('vitalSign', ['getVitalSignHealthPatient', 'getAllVitalSignShare', 'getVitalSignValueShare']),
    ...mapActions('modals', ['openSelectMedicalInstructionModalSub', 'openViewHeartRateShare']),
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
    handleView (index, row) {
      this.openViewHeartRateShare()
      this.getVitalSignValueShare({ dateShare: row.dateShare.split('/').reverse().join('-'), hourShare: row.hourShare, minuteShare: row.minuteShare })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
</style>
