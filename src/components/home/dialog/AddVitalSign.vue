<template>
  <el-dialog
    :visible="isVisibleAddVitalSign"
    width="300"
    height="400"
    @close="closeAddNewVitalSign"
  >
    <div slot="title" class="verticalCenter">
      <img src="../../../assets/icons/ic-calendar.png" class="iconDialog" fit="scale-down" />
      <strong>Lịch đo sinh hiệu</strong>
    </div>
    <div>
      <el-row class="margin-default items">
        <el-col :span="6">Chuẩn đoán:</el-col>
        <el-col :span="18">
          <el-input size="mini" v-model="vitalSignForm.diagnose"></el-input>
        </el-col>
      </el-row>
      <el-row class="margin-default items">
        <el-col :span="6">Ngày bắt đầu:</el-col>
        <el-col :span="18">
          <el-date-picker size="mini" v-model="vitalSignForm.dateStart" format="dd/MM/yyyy" :picker-options="datePickerOptions"></el-date-picker>
        </el-col>
      </el-row>
      <el-row class="margin-bottom-default items">
        <el-col :span="6">Mô tả:</el-col>
        <el-col :span="18">
          <el-input size="mini" v-model="vitalSignForm.description"></el-input>
        </el-col>
      </el-row>
      <div class="content__vital-sign" v-if="isAutoVitalSign === true">
        <h3 class="content__vital-sign_title">Sinh hiệu có thiết bị hỗ trợ đo tự động:</h3>
        <div class="content__vital-sign_subtitle">
          <i>Những sinh hiệu có sẵn trong thiết bị đeo tay sẽ đưa ra kết quả chủ động hơn, tần suất đo được nhiều hơn</i>
        </div>
        <div class="content__vital-sign_body">
          <el-row>
            <el-row class="margin-default content__vital-sign_body-vitalsign">
              <img src="../../../assets/icons/ic-heart-rate.png" class="iconDialog" />
              <p class="title">Nhịp tim</p>
            </el-row>
            <el-row class="margin-default content__vital-sign_body-vitalsign">
              <el-col :span="6">
                <p>Khoảng an toàn</p>
              </el-col>
              <el-col :span="9">
                <p>Nhỏ nhất</p>
                <el-input-number size="mini" v-model="vitalSignForm.heartRate.minHeartRate"></el-input-number>
              </el-col>
              <el-col :span="9">
                <p>Lớn nhất</p>
                <el-input-number size="mini" v-model="vitalSignForm.heartRate.maxHeartRate"></el-input-number>
              </el-col>
            </el-row>
            <el-row class="margin-default content__vital-sign_body-vitalsign">
              <el-col :span="6">
                <p>Khoảng thời gian vượt mức dẫn đến nguy hiểm:</p>
              </el-col>
              <el-col :span="18">
                <el-input-number
                  size="mini"
                  v-model="vitalSignForm.heartRate.rangeDangerTimeHeartRate"
                ></el-input-number>phút.
              </el-col>
            </el-row>
            <el-row class="margin-default content__vital-sign_body-vitalsign">
              <el-col :span="6">
                <p>Khoảng thời gian nhịp tim trở lại bình thường:</p>
              </el-col>
              <el-col :span="18">
                <el-input-number
                  size="mini"
                  v-model="vitalSignForm.heartRate.rangeNormalTimeHeartRate"
                ></el-input-number>phút.
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <p>Khoảng thời gian nhịp tim trở lại bình thường:</p>
              </el-col>
              <el-col :span="18">
                  <el-time-select
                    size="mini"
                    v-model="vitalSignForm.heartRate.timeStart"
                    :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '23:59'
                  }"
                    placeholder="Chọn"
                  ></el-time-select>
              </el-col></el-row>
          </el-row>
        </div>
      </div>
      <div class="content__vital-sign" v-else>
        <h3 class="content__vital-sign_title">Sinh hiệu khác:</h3>
        <div class="content__vital-sign_subtitle">
          <i>Những chỉ số sinh hiệu này cần sự hỗ trợ từ phía bệnh nhân. Yêu cầu bệnh nhân phải nhập chính xác.</i>
        </div>
        <div class="content__vital-sign_body">
          <el-row>
            <el-row class="margin-default content__vital-sign_body-vitalsign">
              <img src="../../../assets/icons/ic-blood-pressure.png" class="iconDialog" />
              <p class="title">Huyết áp</p>
              <el-checkbox class="chk" v-model="isBloodPressureSelected"></el-checkbox>
            </el-row>
            <div v-show="isBloodPressureSelected">
              <el-row class="margin-default content__vital-sign_body-vitalsign">
                <el-col :span="6">
                  <p>Khoảng an toàn</p>
                </el-col>
                <el-col :span="9">
                  <p>Nhỏ nhất</p>
                  <el-input-number
                    size="mini"
                    v-model="vitalSignForm.bloodPressure.minBloodPressure"
                  ></el-input-number>
                </el-col>
                <el-col :span="9">
                  <p>Lớn nhất</p>
                  <el-input-number
                    size="mini"
                    v-model="vitalSignForm.bloodPressure.maxBloodPressure"
                  ></el-input-number>
                </el-col>
              </el-row>
              <el-row class="margin-default content__vital-sign_body-vitalsign">
                <el-col :span="6">
                  <p>Khoảng thời gian vượt mức dẫn đến nguy hiểm:</p>
                </el-col>
                <el-col :span="18">
                  <el-input-number
                    size="mini"
                    v-model="vitalSignForm.bloodPressure.rangeDangerTimeBloodPressure"
                  ></el-input-number>phút.
                </el-col>
              </el-row>
              <el-row class="margin-default content__vital-sign_body-vitalsign">
                <el-col :span="6">
                  <p>Khoảng thời gian trở lại bình thường:</p>
                </el-col>
                <el-col :span="18">
                  <el-input-number
                    size="mini"
                    v-model="vitalSignForm.bloodPressure.rangeNormalTimeBloodPressure"
                  ></el-input-number>phút.
                </el-col>
              </el-row>
              <el-row class="margin-default content__vital-sign_body-vitalsign">
                <el-col :span="6">
                  <p>Giờ đo:</p>
                </el-col>
                <el-col :span="18">
                  <el-time-select
                    size="mini"
                    v-model="vitalSignForm.bloodPressure.timeBloodPressure"
                    :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '23:59'
                  }"
                    placeholder="Chọn"
                  ></el-time-select>
                </el-col>
              </el-row>
            </div>
          </el-row>
          <el-row>
            <el-row class="margin-default content__vital-sign_body-vitalsign">
              <img src="../../../assets/icons/ic-acid.png" class="iconDialog" />
              <p class="title">Acid Uric</p>
              <el-checkbox class="chk" v-model="isAcidUricSelected"></el-checkbox>
            </el-row>
            <div v-show="isAcidUricSelected">
              <el-row class="margin-default content__vital-sign_body-vitalsign">
                <el-col :span="6">
                  <p>Khoảng an toàn</p>
                </el-col>
                <el-col :span="9">
                  <p>Nhỏ nhất</p>
                  <el-input-number size="mini" v-model="vitalSignForm.acidUric.minAcidUric"></el-input-number>
                </el-col>
                <el-col :span="9">
                  <p>Lớn nhất</p>
                  <el-input-number size="mini" v-model="vitalSignForm.acidUric.maxAcidUric"></el-input-number>
                </el-col>
              </el-row>
              <el-row class="margin-default content__vital-sign_body-vitalsign">
                <el-col :span="6">
                  <p>Khoảng thời gian vượt mức dẫn đến nguy hiểm:</p>
                </el-col>
                <el-col :span="18">
                  <el-input-number
                    size="mini"
                    v-model="vitalSignForm.acidUric.rangeDangerTimeAcidUric"
                  ></el-input-number>phút.
                </el-col>
              </el-row>
              <el-row class="margin-default content__vital-sign_body-vitalsign">
                <el-col :span="6">
                  <p>Giờ đo:</p>
                </el-col>
                <el-col :span="18">
                  <el-time-select
                    size="mini"
                    v-model="vitalSignForm.acidUric.timeAcidUric"
                    :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '23:59'
                  }"
                    placeholder="Chọn"
                  ></el-time-select>
                </el-col>
              </el-row>
            </div>
          </el-row>
          <el-row>
            <el-row class="margin-default content__vital-sign_body-vitalsign">
              <img src="../../../assets/icons/ic-tempurature.png" class="iconDialog" />
              <p class="title">Nhiệt độ</p>
              <el-checkbox class="chk" v-model="isTemperatureSelected"></el-checkbox>
            </el-row>
            <div v-show="isTemperatureSelected">
              <el-row class="margin-default content__vital-sign_body-vitalsign">
                <el-col :span="6">
                  <p>Khoảng an toàn</p>
                </el-col>
                <el-col :span="9">
                  <p>Nhỏ nhất</p>
                  <el-input-number size="mini" v-model="vitalSignForm.temperature.minTemp"></el-input-number>
                </el-col>
                <el-col :span="9">
                  <p>Lớn nhất</p>
                  <el-input-number size="mini" v-model="vitalSignForm.temperature.maxTemp"></el-input-number>
                </el-col>
              </el-row>
              <el-row class="margin-default content__vital-sign_body-vitalsign">
                <el-col :span="6">
                  <p>Khoảng thời gian vượt mức dẫn đến nguy hiểm:</p>
                </el-col>
                <el-col :span="18">
                  <el-input-number
                    size="mini"
                    v-model="vitalSignForm.temperature.rangeDangerTimeTemp"
                  ></el-input-number>phút.
                </el-col>
              </el-row>
              <el-row class="margin-default content__vital-sign_body-vitalsign">
                <el-col :span="6">
                  <p>Giờ đo:</p>
                </el-col>
                <el-col :span="18">
                  <el-time-select
                    size="mini"
                    v-model="vitalSignForm.temperature.timeTemp"
                    :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '23:59'
                  }"
                    placeholder="Chọn"
                  ></el-time-select>
                </el-col>
              </el-row>
            </div>
          </el-row>
        </div>
      </div>
    </div>
    <div class="horizontalCenter" style="margin-top: 1em;">
      <el-link @click="autoVitalSign">1</el-link>
      <el-link @click="unAutoVitalSign">2</el-link>
    </div>
    <div slot="footer">
      <el-button type="primary" size="mini" @click="openConfirmVitalSign()">Lưu</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      vitalSignForm: {
        diagnose: '',
        dateStart: new Date(),
        description: '',
        heartRate: {
          minHeartRate: 0,
          maxHeartRate: 0,
          rangeDangerTimeHeartRate: 0,
          rangeNormalTimeHeartRate: 0,
          timeStart: ''
        },
        bloodPressure: {
          minBloodPressure: 0,
          maxBloodPressure: 0,
          rangeDangerTimeBloodPressure: 0,
          rangeNormalTimeBloodPressure: 0,
          timeBloodPressure: 0,
          timeStart: ''
        },
        acidUric: {
          minAcidUric: 0,
          maxAcidUric: 0,
          rangeDangerTimeAcidUric: 0,
          timeAcidUric: 0,
          timeStart: ''
        },
        temperature: {
          minTemp: 0,
          maxTemp: 0,
          rangeDangerTimeTemp: 0,
          timeTemp: 0,
          timeStart: ''
        }
      },
      isBloodPressureSelected: false,
      isAcidUricSelected: false,
      isTemperatureSelected: false,
      datePickerOptions: {
        disabledDate: this.handleDisabledDate
      }
    }
  },
  computed: {
    ...mapState('vitalSign', ['deviceConnecting']),
    ...mapState('medicalInstruction', ['patientSelected']),
    ...mapState('modals', ['isAutoVitalSign', 'isVisibleAddVitalSign']),
    ...mapState('time', ['timeNow'])
  },
  methods: {
    handleDisabledDate (time) {
      return time < new Date(this.timeNow)
    },
    ...mapActions('vitalSign', ['getDeviceSupportServices']),
    ...mapActions('modals', [
      'autoVitalSign',
      'unAutoVitalSign',
      'closeAddNewVitalSign'
    ]),
    ...mapActions('time', ['getTimeSystem']),
    openConfirmVitalSign () {
      this.$confirm(
        'Bác sĩ xác nhận chỉ số đo sinh hiệu cho bệnh nhân. Tiếp tục?',
        'Thông báo',
        {
          confirmButtonText: 'Đồng ý',
          cancelButtonText: 'Thoát',
          type: 'warning'
        }
      )
        .then(() => {
          this.$store.dispatch(
            'vitalSign/confirmVitalSign',
            {
              vitalSignForm: this.vitalSignForm,
              isBloodPressureSelected: this.isBloodPressureSelected,
              isAcidUricSelected: this.isAcidUricSelected,
              isTemperatureSelected: this.isTemperatureSelected
            },
            { root: true }
          )
        })
        .catch(() => {})
    }
  },
  mounted () {
    this.getDeviceSupportServices()
    this.getTimeSystem()
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.content__vital-sign {
  max-height: 280px;
  overflow: auto;
  .content__vital-sign_title {
  }
  .content__vital-sign_subtitle {
    font-size: 13px;
    color: grey;
    margin-left: 1em;
    margin-bottom: 1em;
    margin-top: 1em;
  }
  .content__vital-sign_body {
    img {
      width: 2em;
    }
    .content__vital-sign_body-vitalsign {
      display: flex;
      align-items: center;
    }
  }
}
.margin-default {
  margin: 0.7em 0;
}
.margin-bottom-default {
  margin-bottom: 0.5em;
}
.chk {
  margin-left: 1em;
}
</style>
