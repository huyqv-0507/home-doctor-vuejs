<template>
  <div class="mainContent">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }" v-if="routeFrom === 'HOME'">Trang chủ</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }" v-if="routeFrom === 'PATIENT-DETAIL'">Bệnh nhân</el-breadcrumb-item>
      <el-breadcrumb-item>Y lệnh</el-breadcrumb-item>
      <el-breadcrumb-item>Lịch đo sinh hiệu</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content bg-theme">
      <el-row class="verticalCenter">
        <el-col :span="18">
          <h1 class="margin-default">Lịch đo sinh hiệu</h1>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
      <el-row style="margin-top: 1em; margin-left: 2em;">
        <el-col>
          <span style="color: gray;">
            Hệ thống sẽ tự động đo nhịp tim và gửi thông báo nhắc nhở đến bệnh nhân
            <strong
              style="color: black;"
          v-if="patientSelected !== null"
            >{{patientSelected.patientName}}</strong> như lịch bác sĩ đã sắp xếp.
          </span>
        </el-col>
      </el-row>
      <div class="medical-treatment">
        <div class="medical-treatment__duration-date">
          <div class="medical-treatment__duration-date_label"></div>
          <div class="medical-treatment__duration-date_content"></div>
        </div>
        <div style="margin-top: 2em;">
          <el-button style="margin-bottom: 1em;" size="mini" type="primary" @click="openAddNewVitalSign()">Tạo mới</el-button>
        </div>
      </div>
      <div>
        <el-timeline>
          <el-timeline-item
            :timestamp="`${vs.dateStarted}`"
            v-for="(vs, index) in vitalSignSchedule"
            :key="index"
            placement="top"
          >

              <p>
                Trạng thái:
                <strong>{{vs.status}}</strong>
              </p>
            <el-card shadow="never" v-for="(v, index) in vs.vitalSigns" :key="index">
              <p>
                Loại sinh hiệu:
                <strong>{{v.vitalSignType}}</strong>
              </p>
              <p>
                Khoảng an toàn:
                <strong>{{v.numberMin}}-{{v.numberMax}}</strong>
              </p>
              <p>
                Khoảng thời gian cảnh bảo nguy hiểm:
                <strong>{{v.minuteDangerInterval}}</strong>
              </p>
              <p>
                Khoảng thời gian nhịp tim trở lại bình thường:
                <strong>{{v.minuteNormalInterval}}</strong>
              </p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('medicalInstruction', ['patientSelected']),
    ...mapState('vitalSign', ['vitalSignSchedule']),
    ...mapState('systemHandler', ['routeFrom'])
  },
  methods: {
    ...mapActions('modals', ['openAddNewVitalSign'])
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
