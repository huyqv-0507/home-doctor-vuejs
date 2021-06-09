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
            <el-select v-model="values" @change="changeDate($event)" placeholder="Chọn" size="mini">
              <el-option v-for="value in heartRateValueDate" :key="value" :value="value"></el-option>
            </el-select>
            <el-collapse class="collapse-vital-sign" style="margin-top: 1em;" accordion>
              <el-collapse-item
                v-for="(vtv, index) in vitalSignValue.vitalSignValues"
                :key="`vtv-${index}`"
              >
                <template slot="title">
                  <div class="title-collapse" v-if="vtv.vitalSignTypeId === 1">
                    <img src="../../../assets/icons/ic-heart-rate.png" />
                    {{vtv.vitalSignTypeName}}
                  </div>
                  <div class="title-collapse" v-else-if="vtv.vitalSignTypeId === 2">
                    <img src="../../../assets/icons/ic-blood-pressure.png" />
                    {{vtv.vitalSignTypeName}}
                  </div>
                  <div class="title-collapse" v-if="vtv.vitalSignTypeId === 3">
                    <img src="../../../assets/icons/ic-acid.png" />
                    {{vtv.vitalSignTypeName}}
                  </div>
                  <div class="title-collapse" v-else-if="vtv.vitalSignTypeId === 4">
                    <img src="../../../assets/icons/ic-tempurature.png" />
                    {{vtv.vitalSignTypeName}}
                  </div>
                </template>
                <div v-if="vtv.vitalSignTypeId === 1">
                  <v-chart
                    v-if="patientOptions !== null"
                    class="chart"
                    :option="patientOptions.option"
                    :init-options="patientOptions.initOptions"
                  />
                </div>
                <div v-else-if="vtv.vitalSignTypeId === 2">
                  <div v-for="(value, indexVTV) in vtv.vitalSignValues" :key="`v${indexVTV}`">
                    <p>Ngày tạo: <strong>{{value.dateCreated.split('T')[0].split('-').reverse().join('/')}}</strong></p>
                    <div v-for="(v, indexValue) in value.numberValue" :key="`v--${indexValue}`">
                      <p>Lần đo: <strong>{{indexValue + 1}}</strong></p>
                      <p>Tâm thu: <strong>{{value.numberValue[indexValue].split('-')[0]}}</strong> mmHg.</p>
                      <p>Tâm trương: <strong>{{value.numberValue[indexValue].split('-')[1]}} mmHg.</strong></p>
                      <p>Thời gian đo: <strong>{{value.timeValue[indexValue]}}</strong> giờ.</p>
                      <el-divider/>
                    </div>
                  </div>
                </div>
                <div v-else-if="vtv.vitalSignTypeId === 3">
                  <div v-for="(value, indexVTV) in vtv.vitalSignValues" :key="`v${indexVTV}`">
                    <p>Ngày tạo: <strong>{{value.dateCreated.split('T')[0].split('-').reverse().join('/')}}</strong></p>
                    <div v-for="(v, indexValue) in value.numberValue" :key="`v--${indexValue}`">
                      <p>Lần đo: <strong>{{indexValue + 1}}</strong></p>
                      <p>Giá trị: <strong>{{value.numberValue[indexValue].split('-')[0]}}</strong> mmol/L.</p>
                      <p>Thời gian đo: <strong>{{value.timeValue[indexValue]}}</strong> giờ.</p>
                      <el-divider/>
                    </div>
                  </div></div>
                <div v-else-if="vtv.vitalSignTypeId === 4">
                  <div v-for="(value, indexVTV) in vtv.vitalSignValues" :key="`v${indexVTV}`">
                    <p>Ngày tạo: <strong>{{value.dateCreated.split('T')[0].split('-').reverse().join('/')}}</strong></p>
                    <div v-for="(v, indexValue) in value.numberValue" :key="`v--${indexValue}`">
                      <p>Lần đo: <strong>{{indexValue + 1}}</strong></p>
                      <p>Độ: <strong>{{value.numberValue[indexValue].split('-')[0]}}</strong> &#176; C.</p>
                      <p>Thời gian đo: <strong>{{value.timeValue[indexValue]}}</strong></p>
                      <el-divider/>
                    </div>
                  </div></div>
              </el-collapse-item>
            </el-collapse>
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
      values: this.$store.state.vitalSign.heartRateValueDate[
        this.$store.state.vitalSign.heartRateValueDate.length - 1
      ]
    }
  },
  computed: {
    ...mapState('patients', ['patientHealth']),
    ...mapState('vitalSign', [
      'heartRateValues',
      'patientOptions',
      'heartRateValueDate',
      'vitalSignValue'
    ]),
    ...mapState('medicalInstruction', ['patientSelected']),
    ...mapState('vitalSign', ['allVitalSignShare'])
  },
  mounted () {
    this.getDateHaveVitalSignValue().then(() => {
      this.getVitalSignHealthPatient(this.values)
    })
    this.getAllVitalSignShare()
  },
  methods: {
    ...mapActions('vitalSign', [
      'getVitalSignHealthPatient',
      'getAllVitalSignShare',
      'getVitalSignValueShare',
      'getDateHaveVitalSignValue'
    ]),
    ...mapActions('modals', [
      'openSelectMedicalInstructionModalSub',
      'openViewHeartRateShare'
    ]),
    changeDate (event) {
      this.$store.dispatch('vitalSign/getVitalSignHealthPatient', event, {
        root: true
      })
    },
    handleView (index, row) {
      this.openViewHeartRateShare()
      this.getVitalSignValueShare({
        dateShare: row.dateShare
          .split('/')
          .reverse()
          .join('-'),
        hourShare: row.hourShare,
        minuteShare: row.minuteShare
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.title-collapse {
  display: flex;
  align-items: center;
}
.collapse-vital-sign {
  img {
    margin-right: 10px;
    width: 30px;
    height: 30px;
  }
}
</style>
