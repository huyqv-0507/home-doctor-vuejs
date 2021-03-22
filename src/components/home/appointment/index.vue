<template>
  <div class="mainContent">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
      <el-breadcrumb-item>Lịch tái khám</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content bg-theme">
      <h1 class="content__heading_title">Lịch tái khám</h1>
      <div class="content__body">
        <el-button
          class="content__body_add"
          size="mini"
          @click="openAppointmentPatientsModal()"
        >Thêm</el-button>
        <el-calendar class="content__body_calendar">
          <template slot="dateCell" slot-scope="{date, data}">
            <p>{{data.day.split('-')[2]}}</p>
            <div v-for="(appointment, index) in appointmentsOfMonth" :key="index">
              <div v-if="appointment.dateExamination.split('/').reverse().join('-') == data.day">
                <el-popover v-for="(apt, index) in appointment.appointments" :key="`apt-${index}`"
                  placement="bottom"
                  title="Chi tiết"
                  width="200"
                  trigger="click"
                >
                  <div v-if="apt.status == 'PENDING'" class="content__body_calendar-pending" style="color: red;">
                    <h4>Đang xử lí</h4>
                    <p>Thời gian: {{apt.dateExamination}}</p>
                    <p>Nội dung: {{apt.note}}</p>
                  </div>
                  <div v-else-if="apt.status == 'CANCEL'" class="content__body_calendar-cancel" style="color: grey;">
                    <h4>Đã huỷ</h4>
                    <p>Thời gian: {{apt.dateExamination}}</p>
                    <p>Nội dung: {{apt.note}}</p>
                  </div>
                  <div v-else  class="content__body_calendar-active" style="color: green;">
                    <h4>Đang hiện hành</h4>
                    <p>Thời gian: {{apt.dateExamination}}</p>
                    <p>Nội dung: {{apt.note}}</p>
                  </div>
                  <div class="active-activity" slot="reference"></div>
                </el-popover>
              </div>
            </div>
          </template>
        </el-calendar>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('appointments', ['appointmentsOfMonth', 'appointments'])
  },
  methods: {
    ...mapActions('modals', ['openAppointmentPatientsModal']),
    ...mapActions('appointments', ['getAppointmentsByMonth', 'getAppointments'])
  },
  mounted () {
    this.getAppointmentsByMonth()
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.is-selected {
  color: #1989fa;
}
.content {
  .content__heading_title {
    margin: 0.5em 0;
  }
  .content__body {
    .content__body_add {
      margin: 0.7em 0;
    }
    .content__body_calendar {
      .content__body_calendar-pending {
        width: 100%;
        height: 100%;
        color: red;
      }
      .content__body_calendar-cancel {
        width: 100%;
        height: 100%;
        color: grey;
      }
      .content__body_calendar-active {
        width: 100%;
        height: 100%;
        color: green;
      }
    }
  }
}
.active-activity {
  background-color: #3ac5c9;
  width: 100%;
  height: 40px;
}
</style>
