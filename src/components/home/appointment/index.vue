<template>
  <div class="mainContent">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
      <el-breadcrumb-item>Lịch hẹn</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content bg-theme">
      <h1 class="content__heading_title">Lịch hẹn</h1>
      <div class="content__body">
        <el-button
          class="content__body_add"
          size="mini"
          @click="openAppointmentPatientsModal()"
        >Thêm</el-button>
        <el-calendar class="content__body_calendar">
          <template slot="dateCell" slot-scope="{date, data}">
            <p>{{data.day.split('-')[2]}}</p>
            <div v-for="(appointment, index) in appointments" :key="`appointment-${index}`">
              <div v-if="data.day.split('-').reverse().join('/') === appointment.dateExamination">
                  <div class="active-activity" @click="appointmentDateChoose(appointment)"></div>
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
    ...mapState('appointments', ['appointments'])
  },
  methods: {
    ...mapActions('modals', ['openAppointmentPatientsModal']),
    ...mapActions('appointments', ['getAppointments', 'appointmentDateChoose'])
  },
  mounted () {
    this.getAppointments()
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
