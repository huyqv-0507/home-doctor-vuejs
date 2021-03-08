<template>
  <div class="mainContent">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">Danh sách yêu cầu</el-breadcrumb-item>
      <el-breadcrumb-item>Thông tin bệnh nhân</el-breadcrumb-item>
      <el-breadcrumb-item>Xác nhận hợp đồng</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="contract bg-theme">
      <el-row class="contract__today">
        <span></span>
        <span>
          <i>{{contractForm.today()}}</i>
        </span>
      </el-row>
      <el-row>
        <el-col :span="24" class="contract__title" style="display: flex; justify-content: center;">
          <h1>HỢP ĐỒNG KHÁM BỆNH CHỮA BỆNH</h1>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="contract__content font-size14">
        <el-row class="contract__content_social-legal">{{contractForm.intro.socialLegal}}</el-row>
        <el-row
          class="contract__content_medical-exam-and-treatment-law"
        >{{contractForm.intro.medicalExaminationAndTreatmentLaw}}</el-row>
        <el-row class="contract__content_decree"><p class="text">{{contractForm.intro.decree}}</p></el-row>
        <el-row class="contract__content_circular"><span class="text">{{contractForm.intro.circular}}</span></el-row>
        <el-row class="contract__content_today">{{contractForm.today()}}, chúng tôi gồm:</el-row>
        <el-row class="contract__content_side">
          <el-row class="margin-line">
            <strong>BÊN A:</strong>
            Bên {{contractForm.dutyAndInterest[1].name}}
          </el-row>
          <el-row class="margin-line">Đại diện là Ông/bà: <strong>{{user.fullName}}</strong></el-row>
          <el-row class="margin-line">Ngày sinh: <strong>{{user.dateOfBirth}}</strong></el-row>
          <el-row class="margin-line">Chuyên khoa: <strong>{{user.specialization}}</strong></el-row>
          <el-row class="margin-line">Nơi làm việc: <strong>{{user.workLocation}}</strong></el-row>
          <el-row class="margin-line">Điện thoại: {{user.phone}}</el-row>
          <el-row class="margin-line">
            <strong>BÊN B:</strong>
            Bên {{contractForm.dutyAndInterest[0].name}}
          </el-row>
          <el-row class="margin-line">Đại diện là Ông/bà: <strong>{{requestDetail.fullNamePatient}}</strong></el-row>
          <el-row class="margin-line">Giới tính: <strong>{{patientDetail.gender}}</strong></el-row>
          <el-row class="margin-line">Ngày sinh: <strong>{{requestDetail.dobPatient}}</strong></el-row>
          <el-row class="margin-line">Chỗ ở hiện nay: <strong>{{requestDetail.addressPatient}}</strong></el-row>
          <el-row class="margin-line">Nghề nghiệp: <strong>{{patientDetail.career}}</strong></el-row>
          <el-row class="margin-line">Điện thoại: <strong>{{requestDetail.phoneNumberPatient}}</strong></el-row>
        </el-row>
        <el-row>
          <el-row class="margin-line">
            <strong>Điều 1. {{contractForm.timeAndMission.title}}</strong>
          </el-row>
          <p class="margin-line">- {{contractForm.timeAndMission.description}}</p>
        </el-row>
        <el-row>
          <el-row class="margin-line">
            <strong>Điều 2. {{contractForm.workingMode.title}}</strong>
          </el-row>
          <p class="margin-line">- {{contractForm.workingMode.description}}</p>
        </el-row>
        <el-row>
          <el-row class="margin-line">
            <strong>Điều 3. Nghĩa vụ và quyền lợi của bên B</strong>
          </el-row>
          <el-row>
            <strong>1. Nghĩa vụ:</strong>
          </el-row>
          <p
            class="margin-line"
            v-for="(duty, index) in contractForm.dutyAndInterest[0].duty"
            :key="`duty-a-${index}`"
          >- {{duty}}</p>
          <el-row>
            <strong>2. Quyền lợi:</strong>
          </el-row>
          <p
            class="margin-line"
            v-for="(interest, index) in contractForm.dutyAndInterest[0].interest"
            :key="`interest-a-${index}`"
          >- {{interest}}</p>
        </el-row>
        <el-row>
          <el-row class="margin-line">
            <strong>Điều 4. Nghĩa vụ và quyền lợi của bên A</strong>
          </el-row>
          <el-row>
            <strong>1. Nghĩa vụ:</strong>
          </el-row>
          <p
            class="margin-line"
            v-for="(duty, index) in contractForm.dutyAndInterest[1].duty"
            :key="`duty-a-${index}`"
          >- {{duty}}</p>
          <el-row>
            <strong>2. Quyền lợi:</strong>
          </el-row>
          <p
            class="margin-line"
            v-for="(interest, index) in contractForm.dutyAndInterest[1].interest"
            :key="`interest-a-${index}`"
          >- {{interest}}</p>
        </el-row>
        <el-row>
          <el-row class="margin-line">
            <strong>Điều 5. {{contractForm.termEnforcement.title}}</strong>
          </el-row>
          <p class="margin-line" v-for="(des, index) in contractForm.termEnforcement.description" :key="`des-${index}`">- {{des}}.</p>
        </el-row>
      </el-row>
    <el-row class="margin-line">
      <el-checkbox v-model="confirmRule"><strong>Đồng ý với các điều khoản trên.</strong></el-checkbox>
    </el-row>
    <el-row class="handle-event">
      <el-button
        class="handle-event__button"
        type="secondary"
        @click="backToRequestDetailContract()"
      >Trở lại</el-button>
      <el-button
        v-if="confirmRule"
        class="handle-event__button"
        type="primary"
        @click="confirmContract([contract, value])"
      >Xác nhận</el-button>
      <el-button v-else
        class="handle-event__button"
        type="primary"
        disabled=""
      >Xác nhận</el-button>
    </el-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      confirmRule: false
    }
  },
  computed: {
    ...mapState('contracts', [
      'requestDetail',
      'contractRequests',
      'contractCode',
      'cancelContractVisible',
      'contract',
      'patientDetail',
      'contractForm'
    ]),
    ...mapState('users', ['user'])
  },
  mounted () {
    console.log('contractForm:::', this.contractForm)
  },
  methods: {
    ...mapActions('contracts', [
      'backToRequestDetailContract',
      'confirmContract'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.handle-event {
  display: flex;
  justify-content: center;
  align-items: center;
  .handle-event__button {
    margin: 0 40px;
  }
}
.contract {
  padding: 2em 1.5em;
  .contract__today {
    display: flex;
    justify-content: flex-end;
    color: grey;
    margin-bottom: 0.5em;
  }
  .contract__title {
    margin-bottom: 2em;
  }
  .contract__content {
    .contract__content_social-legal {
      margin-bottom: 0.8em;
    }
    .contract__content_medical-exam-and-treatment-law {
      margin-bottom: 0.5em;
    }
    .contract__content_decree {
      margin-bottom: 0.8em;
    }
    .contract__content_circular {
      margin-bottom: 1em;
    }
    .contract__content_today {
      margin: 1em 0;
    }
  }
}
.margin-line {
  margin: 0.8em 0;
}
</style>
