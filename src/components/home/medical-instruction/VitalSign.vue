<template>
  <div class="mainContent">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
      <el-breadcrumb-item>Y lệnh</el-breadcrumb-item>
      <el-breadcrumb-item>Lịch đo sinh hiệu</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content bg-theme">
      <h1 class="margin-default">Lịch đo sinh hiệu</h1>
      <p>
        Bác sĩ đang tạo lịch xét sinh hiệu cho bệnh nhân
        <b>{{patientSelected.patientName}}</b>.
      </p>
      <el-divider />
      <el-row class="margin-default items">
        <el-col :span="6">Chuẩn đoán:</el-col>
        <el-col :span="18">
          <el-input size="mini" v-model="diagnose"></el-input>
        </el-col>
      </el-row>
      <el-row class="margin-default items">
        <el-col :span="6">Ngày bắt đầu:</el-col>
        <el-col :span="18">
          <el-date-picker size="mini" v-model="dateStart"></el-date-picker>
        </el-col>
      </el-row>
      <el-row class="margin-default items">
        <el-col :span="6">Ngày kết thúc:</el-col>
        <el-col :span="18">
          <el-date-picker size="mini" v-model="dateEnd"></el-date-picker>
        </el-col>
      </el-row>
      <el-row class="margin-bottom-default items">
        <el-col :span="6">Mô tả:</el-col>
        <el-col :span="18">
          <el-input size="mini" v-model="description"></el-input>
        </el-col>
      </el-row>
      <div class="content__vital-sign">
        <h3 class="content__vital-sign_title">Sinh hiệu có thiết bị hỗ trợ đo tự động:</h3>
        <div class="content__vital-sign_subtitle">
          <i>Những sinh hiệu có sẵn trong thiết bị đeo tay sẽ đưa ra kết quả chủ động hơn, tần suất đo được nhiều hơn</i>
        </div>
        <div class="content__vital-sign_body">
          <el-row>
            <el-row class="margin-default content__vital-sign_body-vitalsign">
              <img src="../../../assets/icons/ic-heart-rate.png" />
              <p class="title">Nhịp tim</p>
            </el-row>
            <el-row class="margin-default content__vital-sign_body-vitalsign">
              <el-col :span="6">
                <p>Mức nguy hiểm</p>
              </el-col>
              <el-col :span="9">
                <p>Nhỏ nhất</p>
                <el-input-number size="mini" v-model="minHeartRate"></el-input-number>
              </el-col>
              <el-col :span="9">
                <p>Lớn nhất</p>
                <el-input-number size="mini" v-model="maxHeartRate"></el-input-number>
              </el-col>
            </el-row>
            <el-row class="margin-default content__vital-sign_body-vitalsign">
              <el-col :span="6">
                <p>Khoảng thời gian vượt mức dẫn đến nguy hiểm:</p>
              </el-col>
              <el-col :span="18">
                <el-input-number size="mini" v-model="rangeDangerTimeHeartRate"></el-input-number>phút.
              </el-col>
            </el-row>
          </el-row>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="content__vital-sign">
        <h3 class="content__vital-sign_title">Sinh hiệu khác:</h3>
        <div class="content__vital-sign_subtitle">
          <i>Những chỉ số sinh hiệu này cần sự hỗ trợ từ phía bệnh nhân. Yêu cầu bệnh nhân phải nhập chính xác.</i>
        </div>
        <div class="content__vital-sign_body">
          <el-row>
            <el-row class="margin-default content__vital-sign_body-vitalsign">
              <img src="../../../assets/icons/ic-blood-pressure.png" />
              <p class="title">Huyết áp</p>
            </el-row>
            <el-row class="margin-default content__vital-sign_body-vitalsign">
              <el-col :span="6">
                <p>Mức nguy hiểm</p>
              </el-col>
              <el-col :span="9">
                <p>Nhỏ nhất</p>
                <el-input-number size="mini" v-model="minBloodPressure"></el-input-number>
              </el-col>
              <el-col :span="9">
                <p>Lớn nhất</p>
                <el-input-number size="mini" v-model="maxBloodPressure"></el-input-number>
              </el-col>
            </el-row>
            <el-row class="margin-default content__vital-sign_body-vitalsign">
              <el-col :span="6">
                <p>Khoảng thời gian vượt mức dẫn đến nguy hiểm:</p>
              </el-col>
              <el-col :span="18">
                <el-input-number size="mini" v-model="rangeDangerTimeBloodPressure"></el-input-number>phút.
              </el-col>
            </el-row>
            <el-row class="margin-default content__vital-sign_body-vitalsign">
              <el-col :span="6">
                <p>Giờ đo:</p>
              </el-col>
              <el-col :span="18">
                <el-time-select
                  size="mini"
                  v-model="timeBloodPressure"
                  :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '23:59'
                  }"
                  placeholder="Chọn"
                ></el-time-select>
              </el-col>
            </el-row>
          </el-row>
          <el-row>
            <el-row class="margin-default content__vital-sign_body-vitalsign">
              <img src="../../../assets/icons/ic-acid.png" />
              <p class="title">Acid Uric</p>
            </el-row>
            <el-row class="margin-default content__vital-sign_body-vitalsign">
              <el-col :span="6">
                <p>Mức nguy hiểm</p>
              </el-col>
              <el-col :span="9">
                <p>Nhỏ nhất</p>
                <el-input-number size="mini" v-model="minAcidUric"></el-input-number>
              </el-col>
              <el-col :span="9">
                <p>Lớn nhất</p>
                <el-input-number size="mini" v-model="maxAcidUric"></el-input-number>
              </el-col>
            </el-row>
            <el-row class="margin-default content__vital-sign_body-vitalsign">
              <el-col :span="6">
                <p>Khoảng thời gian vượt mức dẫn đến nguy hiểm:</p>
              </el-col>
              <el-col :span="18">
                <el-input-number size="mini" v-model="rangeDangerTimeAcidUric"></el-input-number>phút.
              </el-col>
            </el-row>
            <el-row class="margin-default content__vital-sign_body-vitalsign">
              <el-col :span="6">
                <p>Giờ đo:</p>
              </el-col>
              <el-col :span="18">
                <el-time-select
                  size="mini"
                  v-model="timeAcidUric"
                  :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '23:59'
                  }"
                  placeholder="Chọn"
                ></el-time-select>
              </el-col>
            </el-row>
          </el-row>
          <el-row>
            <el-row class="margin-default content__vital-sign_body-vitalsign">
              <img src="../../../assets/icons/ic-tempurature.png" />
              <p class="title">Nhiệt độ</p>
            </el-row>
            <el-row class="margin-default content__vital-sign_body-vitalsign">
              <el-col :span="6">
                <p>Mức nguy hiểm</p>
              </el-col>
              <el-col :span="9">
                <p>Nhỏ nhất</p>
                <el-input-number size="mini" v-model="minTemp"></el-input-number>
              </el-col>
              <el-col :span="9">
                <p>Lớn nhất</p>
                <el-input-number size="mini" v-model="maxTemp"></el-input-number>
              </el-col>
            </el-row>
            <el-row class="margin-default content__vital-sign_body-vitalsign">
              <el-col :span="6">
                <p>Khoảng thời gian vượt mức dẫn đến nguy hiểm:</p>
              </el-col>
              <el-col :span="18">
                <el-input-number size="mini" v-model="rangeDangerTimeTemp"></el-input-number>phút.
              </el-col>
            </el-row>
            <el-row class="margin-default content__vital-sign_body-vitalsign">
              <el-col :span="6">
                <p>Giờ đo:</p>
              </el-col>
              <el-col :span="18">
                <el-time-select
                  size="mini"
                  v-model="timeTemp"
                  :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '23:59'
                  }"
                  placeholder="Chọn"
                ></el-time-select>
              </el-col>
            </el-row>
          </el-row>
        </div>
      </div>
      <div style="display: flex; justify-content: center;">
        <el-button size="mini" @click="openConfirmVitalSign()" type="primary">Xác nhận</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      diagnose: '',
      dateStart: new Date(),
      dateEnd: new Date(),
      description: '',
      minHeartRate: 0,
      maxHeartRate: 0,
      rangeDangerTimeHeartRate: 0,
      minBloodPressure: 0,
      maxBloodPressure: 0,
      rangeDangerTimeBloodPressure: 0,
      timeBloodPressure: 0,
      minAcidUric: 0,
      maxAcidUric: 0,
      rangeDangerTimeAcidUric: 0,
      timeAcidUric: 0,
      minTemp: 0,
      maxTemp: 0,
      rangeDangerTimeTemp: 0,
      timeTemp: 0
    }
  },
  computed: {
    ...mapState('vitalSign', ['deviceConnecting']),
    ...mapState('medicalInstruction', ['patientSelected'])
  },
  methods: {
    ...mapActions('vitalSign', ['getDeviceSupportServices']),
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
          this.$store.dispatch('vitalSign/confirmVitalSign', {
            diagnose: this.diagnose,
            dateStart: this.dateStart,
            dateEnd: this.dateEnd,
            description: this.description,
            minHeartRate: this.minHeartRate,
            maxHeartRate: this.maxHeartRate,
            rangeDangerTimeHeartRate: this.rangeDangerTimeHeartRate,
            minBloodPressure: this.minBloodPressure,
            maxBloodPressure: this.maxBloodPressure,
            rangeDangerTimeBloodPressure: this.rangeDangerTimeBloodPressure,
            timeBloodPressure: this.timeBloodPressure,
            minAcidUric: this.minAcidUric,
            maxAcidUric: this.maxAcidUric,
            rangeDangerTimeAcidUric: this.rangeDangerTimeAcidUric,
            timeAcidUric: this.timeAcidUric,
            minTemp: this.minTemp,
            maxTemp: this.maxTemp,
            rangeDangerTimeTemp: this.rangeDangerTimeTemp,
            timeTemp: this.timeTemp
          }, { root: true })
        })
        .catch(() => {})
    }
  },
  mounted () {
    this.getDeviceSupportServices()
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.content {
  font-size: 13px;
  .content__vital-sign {
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
}
.margin-default {
  margin: 0.7em 0;
}
.margin-bottom-default {
  margin-bottom: 0.5em;
}
.title {
  font-weight: bold;
}
.items {
  display: flex;
  align-items: center;
}
</style>
