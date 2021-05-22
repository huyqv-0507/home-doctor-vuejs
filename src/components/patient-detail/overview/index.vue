<template>
  <div class="mainContent">
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>Bệnh nhân</el-breadcrumb-item>
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
              <strong>{{patientOverview.fullName}}</strong>
            </p>
            <p class="margin-vertical">
              Ngày sinh:
              <strong>{{patientOverview.dateOfBirth.split('T')[0].split('-').reverse().join('/')}}</strong>
            </p>
            <p class="margin-vertical">
              Giới tính:
              <strong>{{patientOverview.gender}}</strong>
            </p>
            <p class="margin-vertical">
              Địa chỉ:
              <strong>{{patientOverview.address}}</strong>
            </p>
         <h2 class="margin-vertical">Tiền sử bệnh</h2>
        <p class="margin-vertical" v-if="patientOverview.personalMedicalHistory !== null">
          Bản thân:
          <strong>{{patientOverview.personalMedicalHistory}}</strong>
        </p>
        <p class="margin-vertical" v-if="patientOverview.familyMedicalHistory !== null">
          Di ứng:
          <strong>{{patientOverview.familyMedicalHistory}}</strong>
        </p>
          </el-col>
          <el-col :span="12">
            <p class="margin-vertical">
              Số điện thoại:
              <strong>{{patientOverview.phoneNumber}}</strong>
            </p>
            <p class="margin-vertical">
              Nghề nghiệp:
              <strong>{{patientOverview.career}}</strong>
            </p>
            <p class="margin-vertical">
              Chiều cao:
              <strong>{{patientOverview.height}} cm</strong>
            </p>
            <p class="margin-vertical">
              Cân nặng:
              <strong>{{patientOverview.weight}} kg</strong>
            </p>
          </el-col>
        </el-row>
      </div>
      <div class="bg-theme">
        <h2 class="margin-vertical">Bệnh lý</h2>
        <p class="margin-vertical" v-for="(disease, indexDs) in patientOverview.diseases" :key="`disease-${indexDs}`">
          - ({{disease.diseaseId}}) {{disease.diseaseName}}
         </p>
      </div>
      <div class="bg-theme">
        <h2 class="margin-vertical">Y lệnh được chọn trong hợp đồng</h2>
        <el-row class="pointer margin-bottom">
          <div
            v-for="(medicalInstruction, index) in patientOverview.medicalInstructions"
            :key="`medicalInstructionType-${index}`"
          >
            <div>
              <strong>{{medicalInstruction.medicalInstructionTypeName}}</strong>
            </div>
            <div
              v-if="medicalInstruction.medicalInstructionTypeName === 'Đơn thuốc'"
              style="display: flex; margin: .4em;"
            >
              <div
                v-for="(mi, indexMi) in medicalInstruction.medicalInstructions"
                :key="`mi${indexMi}`"
                style="display: flex;"
              >
                <div v-if="mi.images !== null">
                  <el-image
                    v-on:click="showMedicalInstructionImageDetail(mi.medicalInstructionId)"
                    :src="im.url"
                    v-for="(im, index) in mi.images"
                    :key="`i${index}`"
                    style="width: 100px; margin: .3em;"
                  />
                </div>
                <div v-else>
                  <img
                    src="../../../assets/icons/ic-medicine.png"
                    style="width: 30px; margin: 0 1em;"
                  />
                  <div>
                    <el-link
                      size="mini"
                      type="primary"
                      v-on:click="handleView({
                       medicalInstructionId: mi.medicalInstructionId,
                       medicalInstructionTypeName: medicalInstruction.medicalInstructionTypeName})"
                    >Đơn thuốc {{indexMi + 1}}</el-link>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else-if="medicalInstruction.medicalInstructionTypeName === 'Sinh hiệu'"
              style="display: flex;"
            >
              <div
                v-for="(mi, indexMi) in medicalInstruction.medicalInstructions"
                :key="`mi${indexMi}`"
                style="display: flex;"
              >
                <div v-if="mi.images !== null">
                  <el-image
                    v-on:click="showMedicalInstructionImageDetail(mi.medicalInstructionId)"
                    :src="im.url"
                    v-for="(im, index) in mi.images"
                    :key="`i${index}`"
                    style="width: 100px; margin: .3em;"
                  />
                </div>
                <div v-else>
                  <img
                    src="../../../assets/icons/ic-blood-pressure.png"
                    style="width: 30px; margin: 0 1em;"
                  />
                  <div>
                    <el-link
                      size="mini"
                      type="primary"
                      v-on:click="handleView({
                       medicalInstructionId: mi.medicalInstructionId,
                       medicalInstructionTypeName: medicalInstruction.medicalInstructionTypeName})"
                    >Sinh hiệu {{indexMi + 1}}</el-link>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div
                v-for="(mi, index) in medicalInstruction.medicalInstructions"
                :key="`mi${index}`"
              >
                <div v-if="mi.images !== null">
                  <el-image
                    v-on:click="showMedicalInstructionImageDetail(mi.medicalInstructionId)"
                    :src="im.url"
                    v-for="(im, index) in mi.images"
                    :key="`i${index}`"
                    style="width: 100px; margin: .3em;"
                  />
                </div>
              </div>
            </div>
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('patients', ['patientOverview']),
    ...mapState('medicalInstruction', ['patientSelected'])
  },
  methods: {
    ...mapActions('image', ['showMedicalInstructionImageDetail']),
    handleView (mi) {
      const medicalInstruction = {
        medicalInstructionId: mi.medicalInstructionId,
        medicalInstructionTypeName: mi.medicalInstructionTypeName
      }
      this.$store.dispatch(
        'appointments/viewMedicalInstruction',
        medicalInstruction,
        { root: true }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.margin-vertical {
  margin: 1em 0;
}
.margin-top05 {
  margin-top: 1em;
}
.image-custom {
  margin: 0.5em;
}
</style>
