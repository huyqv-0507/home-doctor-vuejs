<template>
  <div class="rightContent" v-if="patientSelected.from !== 'FINISHED'">
    <div style="margin-bottom: 2.1em;"></div>
    <el-card class="wrapper func" shadow="never">
      <div class="wrapper__item" v-if="patientOverview.appointmentNext !== null">
        <div class="wrapper__item_title titleColor" style="margin-bottom: .5em;">
          <strong>Lịch hẹn</strong>
        </div>
        <div class="wrapper__item_content">
          <div>Ngày tái khám: {{patientOverview.appointmentNext.dateExamination.split('T')[0].split('-').reverse().join('/')}}</div>
          <div>Lý do: {{patientOverview.appointmentNext.note}}</div>
          <el-link
            v-if="!isAppointmentCurrent"
            style="margin-top: 1em; font-size: 10px;"
            type="primary"
            v-on:click="openUpdateAppointmentShow()"
          >
            Thay đổi
            <i class="el-icon-edit-outline el-icon--right"></i>
          </el-link>
          <el-link
            v-else-if="isAppointmentCurrent"
            style="margin-top: 1em; font-size: 10px;"
            type="primary"
            v-on:click="openFinishAppointmentShow()"
          >
            Hoàn tất
            <i class="el-icon-edit-outline el-icon--right"></i>
          </el-link>
        </div>
      </div>
      <div v-else>
        <div class="wrapper__item_title">Lịch hẹn</div>
        <div class="wrapper__item_content">
          <p style="margin-top: 1em; font-size: 10px; color: grey;">
            <i>Bác sĩ chưa có lịch hẹn nào với bệnh nhân</i>
          </p>
          <el-link
            v-on:click.native="handleAddAppointment(patientSelected)"
            style="font-size: 10px;"
            type="primary"
          >
            Thêm
            <i class="el-icon-circle-plus el-icon--right"></i>
          </el-link>
        </div>
      </div>
    </el-card>
    <el-card class="wrapper func" shadow="never">
      <div class="wrapper__item">
        <div class="wrapper__item_title titleColor" style="margin-bottom: .5em;">Hợp đồng</div>
        <div class="wrapper__item_content">
          <div>Ngày bắt đầu: {{patientOverview.contractDetail.dateStarted}}</div>
          <div>Ngày kết thúc: {{patientOverview.contractDetail.dateFinished}}</div>
          <el-link
            type="primary"
            style="margin-top: 1em; font-size: 10px;"
            v-on:click="getContractDetail({ contractId: patientOverview.contractDetail.contractId, where: 'PATIENT-DETAIL' })"
          >
            Chi tiết
            <i class="el-icon-view el-icon--right"></i>
          </el-link>
        </div>
      </div>
    </el-card>
    <el-divider></el-divider>
    <el-row
      v-if="isFirstAppointmentFinished"
      class="func pointer"
      v-on:click.native="goToMedicationSchedule()"
    >
      <el-col :span="4" class="func__item">
        <img src="../../assets/icons/ic-medicine.png" />
      </el-col>
      <el-col :span="20">
        <div class="func__item">
          <span>Thêm đơn thuốc</span>
        </div>
      </el-col>
    </el-row>
    <el-row class="func pointer" v-on:click.native="setVitalSign('PATIENT-DETAIL')">
      <el-col :span="4" class="func__item">
        <img src="../../assets/icons/ic-heart-rate.png" />
      </el-col>
      <el-col :span="20">
        <div class="func__item">
          <span>Thêm lịch đo sinh hiệu</span>
        </div>
      </el-col>
    </el-row>
    <el-row
      v-if="isFirstAppointmentFinished"
      class="func pointer"
      v-on:click.native="openAddMedicalInstructionForm()"
    >
      <el-col :span="4" class="func__item">
        <img src="../../assets/icons/ic-medical-instruction.png" />
      </el-col>
      <el-col :span="20">
        <div class="func__item">
          <span>Thêm y lệnh (Hình ảnh)</span>
        </div>
      </el-col>
    </el-row>
    <el-row class="func pointer" v-on:click.native="openRequestMedicalInstruction()">
      <el-col :span="4" class="func__item">
        <img src="../../assets/icons/ic-request.png" />
      </el-col>
      <el-col :span="20">
        <div class="func__item">
          <span>Yêu cầu thêm y lệnh</span>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-card class="wrapper func" shadow="never">
      <div v-if="patientOverview.smartWatchConnected === false">
        <p style="font-size: 10px; color: red;">
          <i>Bệnh nhân chưa ghép nối thiết bị.</i>
        </p>
        <div>
          <el-link style="font-size: 10px;" type="primary" @click="sendRequireBand()">
            Yêu cầu
            <i class="el-icon-s-promotion el-icon--right"></i>
          </el-link>
        </div>
      </div>
      <div v-else style="display: flex; align-items: center;">
        <img src="../../assets/icons/ic-blood-pressure.png" style="width: 20px;" />
        <p style="font-size: 11px; color: green; margin-left: 18px;">
          <i>Bệnh nhân đã ghép nối thiết bị.</i>
        </p>
      </div>
    </el-card>
    <el-divider></el-divider>
  </div>
  <div class="rightContent" v-else>
    <el-card class="wrapper func" shadow="never">
      <div class="wrapper__item">
        <div class="wrapper__item_title">Hợp đồng</div>
        <div class="wrapper__item_content">
          <div>Ngày bắt đầu: {{patientOverview.contractDetail.dateStarted}}</div>
          <div>Ngày kết thúc: {{patientOverview.contractDetail.dateFinished}}</div>
          <el-link
            type="primary"
            v-on:click.native="getContractDetail({ contractId: patientOverview.contractDetail.contractId, where: 'DETAIL' })"
          >
            Chi tiết
            <i class="el-icon-view el-icon--right"></i>
          </el-link>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      isAppointmentCurrent:
        this.$store.state.patients.patientOverview.appointmentNext === null
          ? null
          : new Date(
            this.$store.state.patients.patientOverview.appointmentNext.dateExamination.split(
              'T'
            )[0]
          ) <= new Date(this.$store.state.time.timeNow.split('T')[0])
    }
  },
  computed: {
    ...mapState('patients', ['patientOverview']),
    ...mapState('medicalInstruction', ['patientSelected']),
    ...mapState('appointments', ['isMeetFirst']),
    ...mapState('businessValidator', ['isFirstAppointmentFinished'])
  },
  mounted () {
    this.getTimeSystem()
  },
  methods: {
    ...mapActions('notifications', ['sendRequireBand']),
    ...mapActions('medicalInstruction', ['setMedicalSchedule', 'setVitalSign']),
    ...mapActions('modals', [
      'openUpdateAppointmentShow',
      'openRequestMedicalInstruction',
      'openFinishAppointmentShow'
    ]),
    ...mapActions('contracts', ['getContractDetail']),
    ...mapActions('time', ['getTimeSystem']),
    openAddMedicalInstructionForm () {
      this.$store.dispatch('modals/openAddMedicalInstructionForm', null, {
        root: true
      })
    },
    openNotification () {
      this.$alert(
        'Bác sĩ cần có một lịch hẹn để kiểm tra tình trạng cho bệnh nhân trước khi đưa ra những y lệnh khác',
        'Thông báo',
        {
          confirmButtonText: 'Đồng ý'
        }
      )
    },
    handleAddAppointment (patientSelected) {
      this.$store.commit('appointments/setChoosePatient', false, {
        root: true
      })
      this.$store.commit('appointments/setSelectPatient', true, {
        root: true
      })
      this.$store.dispatch(
        'appointments/selectPatientAppointment',
        {
          healthRecordId: patientSelected.healthRecordId,
          accountPatientId: patientSelected.accountPatientId
        },
        { root: true }
      )
      this.$store.dispatch('modals/openAppointmentPatientsModal', null, {
        root: true
      })
    },
    goToMedicationSchedule () {
      this.setMedicalSchedule('PATIENT-DETAIL')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.wrapper {
  margin: 1em 0;
}
.func {
  font-size: 13px;
  padding: 0.5em;
  border-radius: 12px;
  background: linear-gradient(45deg, #ffffff, #d8d8dd);
  box-shadow: 5px -5px 10px #c7c7cb, -5px 5px 10px #ffffff;
  margin: 1em 0;
  img {
    width: 20px;
  }
  .func__item {
    display: flex;
    align-items: center;
    height: 25px;
  }
}
</style>
