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
                <strong>Lịch tái khám hôm nay</strong>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="3">
          <span></span>
        </el-col>
      </el-row>
      <el-row style="margin: .5em; margin-left: 1em; max-height: 100px; overflow: auto;">
        <el-col :span="21">
          <el-timeline v-if="appointmentsToday !== null">
            <el-timeline-item v-show="appointment.status === 'ACTIVE'" placement="top" :timestamp="`Lúc ${appointment.dateExamination.split('T')[1].split(':')[0]} giờ ${appointment.dateExamination.split('T')[1].split(':')[1]} phút`" v-for="(appointment, index) in appointmentsToday.appointments" :key="`appointment-${index}`">
              <p>Bệnh nhân: <strong>{{appointment.fullNamePatient}}</strong></p>
              <p>Ghi chú: <strong>{{appointment.note}}</strong></p>
            </el-timeline-item>
          </el-timeline>
          <div style="color: grey;" v-if="appointmentsToday === null"><i>Bác sĩ chưa có cuộc hẹn nào hôm nay.</i></div>
        </el-col>
        <el-col :span="3">
          <div class="next-time"></div>
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
      <div style="margin: .5em; margin-left: 1em; color: grey;" v-show="approvedPatients.length === 0"><i>Bác sĩ chưa theo dõi bệnh nhân nào.</i></div>
      <el-row class="patient-health-wrapper">
        <el-card
          class="patient-health-wrapper_card"
          v-for="(item, index) in approvedPatients"
          :key="index"
          shadow="never"
        >
          <div
            v-on:click="goToPatientHealth(item)"
            slot="header"
            class="patient-health-wrapper_card_header pointer"
            v-bind:class="{danger: item.status === 'Nguy hiểm'}"
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
              Trạng thái:
              <div v-if="item.status === 'Nguy hiểm'" class="verticalCenter horizontalCenter">
                <img style="width: 4em;" src="../../assets/icons/heart-rate-danger.gif" />
                <strong style="color: white;" class="display-status_item">{{item.status}}</strong>
              </div>
              <div v-else-if="item.status === 'Bất thường'">
                <strong style="color: #dbc532;" class="display-status_item">{{item.status}}</strong>
              </div>
              <div v-else class="verticalCenter horizontalCenter">
                <img style="width: 4em;" src="../../assets/icons/heart-rate-normal.gif" />
                <strong style="color: green;" class="display-status_item">{{item.status}}</strong>
              </div>
            </div>
          </div>
          <el-row class="verticalCenter">
            <el-col :span="1">
              <img class="iconDialog" src="../../assets/icons/ic-calendar.png" />
            </el-col>
            <el-col :span="23">
              <div>
                Ngày tái khám:
                <span v-if="item.dateAppointment !== null">
                  <strong>{{item.dateAppointment}}</strong>.
                </span>
                <el-link
                  class="pointer"
                  type="primary"
                  v-else
                  @click="addAppointment(item)"
                >Thêm ngày tái khám</el-link>
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
            v-for="(disease, indexDisease) in item.diseaseContract"
            :key="indexDisease"
          >
            <strong>- ({{disease.diseaseId}}) {{disease.diseaseName}}</strong>
          </p>
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState('patients', ['approvedPatients']),
    ...mapState('appointments', ['appointmentsToday'])
  },
  mounted () {
    this.getContractsWithStatus()
  },
  methods: {
    ...mapActions('vitalSign', ['getVitalSignOverviews']),
    ...mapActions('appointments', ['getActiveAppointments', 'addAppointment']),
    ...mapActions('contracts', ['getContractsWithStatus']),
    ...mapActions('patients', ['goToPatientHealth'])
  }
}
</script>

<style lang="scss">
@import "../../style/index.scss";
.card-wrapper {
  font-size: 13px;
}
.patient-health-wrapper {
  .patient-health-wrapper_card {
    margin: 0.5em 1em;
    .patient-health-wrapper_card_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1em;
      border-radius: 8px;
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
.danger {
  animation: myfirst 0.5s infinite;
  webkit-animation: myfirst 0.5s infinite;
}
@keyframes myfirst {
  0% {
    background: transparent;
  }
  100% {
    background: red;
  }
}
</style>
