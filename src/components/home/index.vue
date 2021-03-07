<template>
  <div class="mainContent">
    <el-breadcrumb separator="/" style="font-size: 10px">
      <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-row class="card-wrapper bg-theme">
      <el-row class="card-wrapper__header">
        <el-col :span="21">
          <el-row class="verticalCenter">
            <el-col :span="1">
              <img class="iconDialog" src="../../assets/icons/ic-calendar.png" />
            </el-col>
            <el-col :span="23">
              <div class="next-event__header_title titleColor">
                <strong>Sự kiện tiếp theo</strong>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="3">
          <span>{{nextSchedule.timeStart.split('T')[0].split('-').reverse().join('-')}}</span>
        </el-col>
      </el-row>
      <el-row style="margin: .5em; margin-left: 1em;">
        <el-col :span="21">
          <el-row>
            <p>{{nextSchedule.title}}</p>
            <p>{{nextSchedule.description}}</p>
          </el-row>
        </el-col>
        <el-col :span="3">
          <div
            class="next-time"
          >{{nextSchedule.timeStart.split('T')[1]}}-{{nextSchedule.timeEnded.split('T')[1]}}</div>
        </el-col>
      </el-row>
    </el-row>
    <div class="card-wrapper bg-theme">
      <el-row class="card-wrapper__header">
        <el-col :span="21">
          <el-row class="verticalCenter">
            <el-col :span="1">
              <img class="iconDialog" src="../../assets/icons/ic-health-selected.png" />
            </el-col>
            <el-col :span="23">
              <div class="next-event__header_title titleColor">
                <strong>Bệnh nhân đang theo dõi</strong>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="patient-health-wrapper">
        <el-card
          class="patient-health-wrapper_card"
          v-for="(item, index) in patientTracking"
          :key="index"
          shadow="never"
        >
          <router-link
            slot="header"
            class="patient-health-wrapper_card_header router-items"
            :to="{name: 'patient-detail', params: { patientId: item.patientId}}"
          >
            <span class="verticalCenter">
              <img
                style="border-radius: 30px"
                class="iconDialog"
                src="../../assets/icons/avatar-default.jpg"
              />
              Họ tên:
              <strong style="margin-left: 10px;">{{item.patientName}}</strong>
            </span>
            <div class="display-status verticalCenter">
              <img class="iconDialog" src="../../assets/icons/ic-heart-rate.png" />
              Trạng thái:
              <div v-if="item.status === 'Nguy hiểm'">
                <strong style="color: red;" class="display-status_item">{{item.status}}</strong>
              </div>
              <div v-else-if="item.status === 'Bất thường'">
                <strong style="color: #dbc532;" class="display-status_item">{{item.status}}</strong>
              </div>
              <div v-if="item.status === 'Bình thường'">
                <strong style="color: green;" class="display-status_item">{{item.status}}</strong>
              </div>
            </div>
          </router-link>
          <el-row class="verticalCenter">
            <el-col :span="1">
              <img class="iconDialog" src="../../assets/icons/ic-calendar.png" />
            </el-col>
            <el-col :span="23">
              <div>
                Ngày tái khám:
                <strong>{{item.timeAppointment.split('-').reverse().join('-')}}</strong>
              </div>
            </el-col>
          </el-row>
          <el-row class="verticalCenter">
            <el-col :span="1">
              <img class="iconDialog" src="../../assets/icons/arrhythmia.png" />
            </el-col>
            <el-col :span="23">
              <div>Bệnh lý:</div>
            </el-col>
          </el-row>
          <p
            class="patient-health-wrapper_card_item"
            v-for="(disease, indexDisease) in item.diseases"
            :key="indexDisease"
          >
            <strong>- ({{disease.diseaseId}}) {{disease.name}}</strong>
          </p>
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LineChart from '../home/chart/LineChart.js'
export default {
  data () {
    return {
    }
  },
  components: [LineChart],
  computed: {
    ...mapState('schedules', ['nextSchedule', 'patientHealth']),
    ...mapState('patients', ['patientTracking'])
  },
  mounted () {
    this.getNextSchedule()
    this.getPatientTracking()
  },
  methods: {
    ...mapActions('schedules', ['getNextSchedule']),
    ...mapActions('patients', ['getPatientTracking'])
  }
}
</script>

<style lang="scss">
@import "../../style/index.scss";
.card-wrapper {
  font-size: 13px;
}
.bg-theme {
  background-color: #eeeff3;
  padding: 1em;
  margin: 0.5em;
  border-radius: 8px;
}
.patient-health-wrapper {
  .patient-health-wrapper_card {
    margin: 0.5em 1em;
    .patient-health-wrapper_card_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .display-status {
        display: inherit;
        .display-status_item {
          margin: 0 0.3em;
        }
      }
    }
    .patient-health-wrapper_card_item {
      margin: 0.5em 0;
      margin-left: 1em;
    }
  }
}
</style>
