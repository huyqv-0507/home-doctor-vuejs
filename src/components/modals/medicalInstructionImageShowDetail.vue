<template>
  <el-dialog :visible="imgShow" @close="hideMedicalInstructionImageDetail" center>
    <template slot="title">Chi tiết</template>
    <div v-if="medicalInstruction !== null">
      <el-row class="image-content">
        <img
          class="image-content__image"
          :src="image.imageUrl"
          v-for="(image, index) in medicalInstruction.images"
          :key="`imageUrl-${index}`"
        />
      </el-row>
      <el-row>
        <el-card shadow="never">
          <div class="image-content__description">
            <p class="margin-line">
              Loại y lệnh:
              <strong>{{medicalInstruction.medicalInstructionTypeName}}</strong>
            </p>
            <p class="margin-line">
              Ngày tạo:
              <strong>{{dateCreate}}</strong>
            </p>
            <p class="margin-line">
              Tên bệnh nhân:
              <strong>{{medicalInstruction.patientFullName}}</strong>
            </p>
            <p v-if="medicalInstruction.status !== 'CONTRACT' && medicalInstruction.status !== 'SHARE'" class="margin-line">
              Nơi tạo:
              <strong>{{medicalInstruction.placeHealthRecord}}</strong>
            </p>
            <p v-if=" medicalInstruction.diseases !== null" class="margin-line" style="line-height: 1.2;">
              Chuẩn đoán:
              <strong v-for="(disease, index) in medicalInstruction.diseases" :key="`disease-${index}`">{{disease.diseaseId}} - {{disease.diseaseName}}; </strong>
            </p>
          </div>
        </el-card>
      </el-row>
      <el-row v-show="isAddMedicalInstruction" class="margin-line">
        <p>
          <strong><i>Bác sĩ có muốn thêm y lệnh vào hồ sơ?</i></strong>
        </p>
        <el-button class="margin-line" type="primary" size="mini" @click="handleAddToHR(medicalInstruction.medicalInstructionId)">Thêm</el-button>
        <el-button class="margin-line" type="info" size="mini" @click="handleRejectAddToHR(medicalInstruction.medicalInstructionId)">Bỏ qua</el-button>
      </el-row>
    </div>
    <div v-else class="horizontalCenter">Đang tải...</div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('image', ['imgShow', 'medicalInstruction', 'isAddMedicalInstruction']),
    dateCreate () {
      return this.$store.state.image.medicalInstruction.dateCreate
        .split('T')[0]
        .split('-')
        .reverse()
        .join('/')
    }
  },
  methods: {
    ...mapActions('image', ['hideMedicalInstructionImageDetail']),
    handleAddToHR (medicalInstructionId) {
      this.$store.dispatch('medicalInstruction/confirmAddMIToHR', medicalInstructionId, { root: true }).then(() => {
        this.hideMedicalInstructionImageDetail()
      })
    },
    handleRejectAddToHR (medicalInstructionId) {
      this.$store.dispatch('medicalInstruction/rejectAddMIToHR', medicalInstructionId, { root: true }).then(() => {
        this.hideMedicalInstructionImageDetail()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.image-content {
  display: flex;
  justify-content: center;
  .image-content__image {
    width: 300px;
    height: 400px;
    margin: 0.5em;
    z-index: 100;
    transition: transform 0.3s;
    cursor: zoom-in;
  }
  .image-content__image:hover {
    transform: scale(2);
  }
  .image-content__description {
    margin-top: 1em;
  }
}
.margin-line {
  margin: 0.7em 0;
}
</style>
