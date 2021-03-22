<template>
  <div class="mainContent">
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">Bệnh nhân</el-breadcrumb-item>
        <el-breadcrumb-item>Tổng quan</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <div class="bg-theme">
        <h2 class="margin-vertical">Thông tin căn bản</h2>
        <el-row>
          <el-col :span="12">
            <p class="margin-vertical">
              Họ tên:
              <strong>{{healthRecordOverview.fullName}}</strong>
            </p>
            <p class="margin-vertical">
              Ngày sinh:
              <strong>{{healthRecordOverview.dateOfBirth.split('T')[0].split('-').reverse().join('/')}}</strong>
            </p>
            <p class="margin-vertical">
              Giới tính:
              <strong>{{healthRecordOverview.gender}}</strong>
            </p>
            <p class="margin-vertical">
              Địa chỉ:
              <strong>{{healthRecordOverview.address}}</strong>
            </p>
          </el-col>
          <el-col :span="12">
            <p class="margin-vertical">
              Số điện thoại:
              <strong>{{healthRecordOverview.phoneNumber}}</strong>
            </p>
            <p class="margin-vertical">
              Nghề nghiệp:
              <strong>{{healthRecordOverview.career}}</strong>
            </p>
            <p class="margin-vertical">
              Chiều cao:
              <strong>{{healthRecordOverview.height}} cm</strong>
            </p>
            <p class="margin-vertical">
              Cân nặng:
              <strong>{{healthRecordOverview.weight}} kg</strong>
            </p>
          </el-col>
        </el-row>
      </div>
      <div class="bg-theme">
        <h2 class="margin-vertical">Bệnh lý</h2>
        <p class="margin-vertical">
          Bệnh mãn tính:
          <strong>{{healthRecordOverview.personalMedicalHistory}}</strong>
        </p>
        <p class="margin-vertical">
          Di ứng:
          <strong>{{healthRecordOverview.familyMedicalHistory}}</strong>
        </p>
      </div>
      <div class="bg-theme">
        <h2 class="margin-vertical">Y lệnh được chia sẻ trong hợp đồng</h2>
      <el-row class="pointer margin-bottom">
        <el-button size="mini" @click="showAllImagesPatientDetail()">Xem tất cả</el-button>
      </el-row>
        <div class="margin-vertical"
          v-for="(medicalInstructionType, index) in patientDetailUsing.conditionHealing.medicalInstructionTypes"
          :key="index"
        >
          <h4 class="margin-vertical">{{medicalInstructionType.medicalInstructionTypeName}}</h4>
          <el-image
            class="image-custom pointer"
            v-for="(mi, index) in medicalInstructionType.medicalInstructions"
            :key="index"
            style="width: 100px;"
            :src="mi.image"
            fit="scale-down"
                    @click="selectImg({
                        diseases: '',
                        medicalInstructionTypeName: medicalInstructionType.medicalInstructionTypeName,
                        diagnose: '',
                        description: '',
                        imgUrl: mi.image
                    })"
          ></el-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('patients', ['healthRecordOverview', 'patientDetailUsing'])
  },
  mounted () {
    this.getOverviewPatient()
  },
  methods: {
    ...mapActions('patients', ['getOverviewPatient']),
    ...mapActions('slideshows', ['selectImg', 'showAllImagesPatientDetail'])
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.margin-vertical {
  margin: 1em 0;
}
.image-custom {
  margin: .5em;
}
</style>
