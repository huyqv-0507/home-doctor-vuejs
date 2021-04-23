<template>
  <div class="mainContent">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
      <el-breadcrumb-item>Y lệnh</el-breadcrumb-item>
      <el-breadcrumb-item>Lịch hẹn</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="bg-theme" style="font-size: 13px;">
      <el-row class="verticalCenter">
        <el-col :span="18">
          <h1 class="margin-default">Lịch hẹn</h1>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
      <el-row style="margin-top: 1em; margin-left: 2em;">
        <el-col>
          <span style="color: gray;">
            Hệ thống sẽ gửi thông báo nhắc nhở đến bệnh nhân
            <strong
              style="color: black;"
              v-if="patientSelected != null"
            >{{patientSelected.patientName}}</strong> như lịch bác sĩ đã sắp xếp.
          </span>
        </el-col>
      </el-row>
      <el-button
        type="primary"
        size="mini"
        @click="addAppointment(patientSelected)"
        class="margin-default"
        style="margin-left: 25px;"
      >Thêm mới</el-button>
      <el-timeline v-if="patientAppointments.length !== 0" class="margin-default">
        <el-timeline-item
          :timestamp="`${appointment.dateExamination}`"
          v-for="(appointment, index) in patientAppointments"
          v-show="appointment.appointments.length !== 0"
          :key="`apt${index}`"
          placement="top"
        >
          <div v-for="(apt, index) in appointment.appointments" :key="`apt${index}`">
            <el-card shadow="never">
              <p class="margin-default">
                Thời gian hẹn:
                <strong>{{apt.dateExamination.split('T')[1].split(':')[0]}}:{{apt.dateExamination.split('T')[1].split(':')[1]}}</strong>
              </p>
              <p class="margin-default">
                Trạng thái:
                <strong
                  v-if="apt.status === 'Đang hiện hành'"
                  style="color: green;"
                >{{apt.status}}</strong>
                <strong v-if="apt.status === 'Đã sử dụng'" style="color: grey;">{{apt.status}}</strong>
                <strong v-if="apt.status === 'Đã huỷ'" style="color: red;">{{apt.status}}</strong>
              </p>
              <p class="margin-default">Ghi chú: {{apt.note}}</p>
            </el-card>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('medicalInstruction', ['patientSelected']),
    ...mapState('appointments', ['patientAppointments'])
  },
  methods: {
    ...mapActions('appointments', ['getPatientAppointments', 'addAppointment'])
  },
  mounted () {
    this.getPatientAppointments()
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../style/index.scss";
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
