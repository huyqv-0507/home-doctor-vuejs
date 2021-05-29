<template>
  <el-dialog :visible="isVisibleAppointmentPatients" @close="handleClose" width="40%" center>
    <template slot="title">
      <strong>Lịch hẹn</strong>
    </template>
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
      <el-link
        v-show="isChoosePatient"
        style="margin-bottom: 1em;"
        type="primary"
        v-on:click="backToSelectPatientAppointment()"
      >
        <i class="el-icon-back"></i> Trở về
      </el-link>
      <el-row class="verticalCenter" style="margin-bottom: .5em;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
          <el-form-item label="Ngày hẹn" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker
                  :picker-options="dateOptions"
                  type="date"
                  size="mini"
                  placeholder="Chọn ngày"
                  v-model="ruleForm.date1"
                  format="dd/MM/yyyy"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2" style="display: flex; justify-content: center;">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-select
                  placeholder="Chọn giờ"
                  size="mini"
                  v-model="ruleForm.date2"
                  :picker-options="{
                      start: '06:00',
                      step: '00:05',
                      end: '18:30'
                    }"
                  style="width: 100%;"
                ></el-time-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="Ghi chú" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <div class="dialog-footer">
        <el-button type="primary" @click="confirmAppointment('ruleForm')">Xác nhận</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      ruleForm: {
        date1: '',
        date2: '',
        desc: ''
      },
      rules: {
        date1: [
          {
            required: true,
            message: 'Xin hãy chọn ngày',
            trigger: 'change'
          }
        ],
        date2: [
          {
            required: true,
            message: 'Xin hãy chọn giờ',
            trigger: 'change'
          }
        ]
      },
      dateOptions: {
        disabledDate: this.handleDisabledDate
      }
    }
  },
  computed: {
    ...mapState('modals', ['isVisibleAppointmentPatients']),
    ...mapState('patients', ['approvedPatients']),
    ...mapState('appointments', ['isSelectPatient', 'isChoosePatient'])
  },
  mounted () {
    this.getPatientApproved()
    this.getTimeSystem()
  },
  methods: {
    handleDisabledDate (date) {
      const now = new Date(this.$store.state.time.timeNow)
      now.setDate(now.getDate() - 1)
      return date < now
    },
    ...mapActions('modals', ['closeAppointmentPatientsModal']),
    ...mapActions('patients', ['getPatientApproved']),
    ...mapActions('appointments', ['backToSelectPatientAppointment']),
    ...mapActions('time', ['getTimeSystem']),
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
        console.log('handleSelectPatient', patient)
        this.$store.commit('appointments/setChoosePatient', false, {
          root: true
        })
        this.$store.commit('appointments/setSelectPatient', true, {
          root: true
        })
      }
    },
    handleClose () {
      try {
        if (this.$refs.ruleForm !== undefined) {
          this.$refs.ruleForm.resetFields()
        }
        this.closeAppointmentPatientsModal()
      } catch (error) {
        console.log(error)
      }
    },
    confirmAppointment (ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
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
                  dateExamination: `${this.ruleForm.date1}T${this.ruleForm.date2}:00`,
                  note: this.ruleForm.desc
                },
                { root: true }
              )
              this.$refs[ruleForm].resetFields()
            })
            .catch(() => {})
        } else {
          return false
        }
      })
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
  margin-bottom: 0.3em;
}
</style>
