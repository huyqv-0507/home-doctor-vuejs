<template>
  <el-dialog
    :visible="isVisibleAppointmentPatients"
    @close="closeAppointmentPatientsModal()"
    width="30%"
  >
    <template slot="title"><strong>Lịch hẹn</strong></template>
    <div v-if="!isSelectPatient">
      <el-row
        align="middle"
        class="content pointer marginbottom"
        v-for="(patient, index) in approvedPatients"
        :key="index"
        v-on:click.native="handleSelectPatient(patient)"
        v-bind:class="{ locked: patient.contractStatus === 'LOCKED'}"
      >
        <el-col :span="4" :offset="0">
          <img
            class="content__avt"
            style="border-radius: 30px; width: 30px;"
            src="../../../../assets/icons/avatar-default.jpg"
          />
        </el-col>
        <el-col :span="16" :offset="0">
          <span class="content__name">{{patient.patientName}}</span>
        </el-col>
        <el-col :span="4" :offset="0">
          <i class="el-icon-arrow-right content__icon"></i>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <el-link v-show="isChoosePatient"
        style="margin-bottom: 1em;"
        type="primary"
        v-on:click="backToSelectPatientAppointment()"
      >
        <i class="el-icon-back"></i> Trở về
      </el-link>
      <el-row class="verticalCenter" style="margin-bottom: .5em;">
        <el-form>
          <el-form-item label="Ngày"></el-form-item>
          <el-form-item label="Giờ"></el-form-item>
          <el-form-item label="Ghi chú"></el-form-item>
        </el-form>
        <el-col :span="6">Ngày hẹn*:</el-col>
        <el-col :span="18">
          <el-date-picker type="datetime" v-model="dateExamination" size="mini" :default-time="['06:00:00', '08:00:00']"></el-date-picker>
        </el-col>
      </el-row>
      <el-row class="verticalCenter">
        <el-col :span="6">Ghi chú:</el-col>
        <el-col :span="18">
          <el-input v-model="note" size="mini"></el-input>
        </el-col>
      </el-row>
      <div class="dialog-footer">
        <el-button type="primary" @click="confirmAppointment({ dateExamination: dateExamination, note: note })">Xác nhận</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      dateExamination: '',
      note: ''
    }
  },
  computed: {
    ...mapState('modals', ['isVisibleAppointmentPatients']),
    ...mapState('patients', ['approvedPatients']),
    ...mapState('appointments', ['isSelectPatient', 'isChoosePatient'])
  },
  mounted () {
    this.getPatientApproved()
  },
  methods: {
    ...mapActions('modals', ['closeAppointmentPatientsModal']),
    ...mapActions('patients', ['getPatientApproved']),
    ...mapActions('appointments', [
      'backToSelectPatientAppointment'
    ]),
    handleSelectPatient (patient) {
      if (patient.contractStatus !== 'ACTIVE') {
        this.$alert(
          'Hợp đồng giữa bác sĩ và bệnh nhân đã bị khoá vì bác sĩ đã không ra y lệnh cho bệnh nhân sau 4 ngày hợp đồng có hiệu lực',
          'Cảnh báo',
          {
            confirmButtonText: 'Đồng ý'
          }
        )
      } else {
        this.$store.commit('appointments/setChoosePatient', true, { root: true })
        this.$store.dispatch('appointments/selectPatientAppointment', {
          healthRecordId: patient.healthRecordId,
          accountPatientId: patient.accountPatientId
        }, { root: true })
      }
    },
    confirmAppointment () {
      this.$confirm(
        'Bác sĩ sẽ đồng ý lịch hẹn tái khám cho bệnh nhân. Xác nhận?',
        'Xác nhận',
        {
          confirmButtonText: 'Đồng ý',
          cancelButtonText: 'Thoát',
          type: 'warning'
        }
      )
        .then(() => {
          this.$store.dispatch(
            'appointments/confirmAppointment',
            {
              dateExamination: this.dateExamination,
              note: this.note
            },
            { root: true }
          )
          // location.reload()
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../style/index.scss";
.content {
  background-color: #eeeff3;
  height: 50px;
  width: 100%;
  border-radius: 13px;
  align-items: center;
  display: flex;
  .content__avt {
    margin: 0 1em;
  }
  .content__name {
    margin-left: 1em;
  }
  .content__icon {
    margin-left: 2em;
  }
}
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2em;
}
.marginbottom {
  margin-bottom: .3em;
}
</style>
