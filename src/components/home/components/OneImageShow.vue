<template>
  <div v-show="isShowImg" class="image-view">
    <div class="image-view__content_exit pointer" v-on:click="closeImgShow()">
      <strong>x</strong>
    </div>
    <div class="image-view__content_images">
      <div class="image-view__content_images-image">
        <el-image :src="imageShow.imgUrl" style="height: 650px;" fit="scale-down"></el-image>
      </div>
    </div>
    <div class="image-view__content_body">
      <div class="bg-theme" style="margin-top: 3em;">
        <el-row class="image-view__content_body-title margin-all">
          <p>
            Bệnh lý:
            <strong
              v-for="(disease, index) in imageShow.diseases"
              :key="`disease-${index}`"
            >({{disease.diseaseId}}) {{disease.nameDisease}};</strong>
          </p>
        </el-row>
        <el-row class="image-view__content_body-diagnose margin-all">
          <p>
            Loại y lệnh:
            <strong>{{imageShow.medicalInstructionTypeName}}</strong>
          </p>
        </el-row>
        <el-row class="image-view__content_body-diagnose margin-all">
          <p>
            Chuẩn đoán:
            <strong>{{imageShow.diagnose}}</strong>
          </p>
        </el-row>
        <el-row class="image-view__content_body-description margin-all">
          <p>
            Mô tả:
            <strong>{{imageShow.description}}</strong>
          </p>
        </el-row>
      </div>
      <div class="bg-theme">
        <h3 class="margin-vertical">Danh sách phiếu Y lệnh</h3>
        <div
          v-for="(medicalInstructionType, index) in requestDetail.medicalInstructionTypes"
          :key="`medicalInstructionType-${index}`"
        >
          <h4 class="margin-vertical">{{medicalInstructionType.medicalInstructionTypeName}}</h4>
          <div
            v-for="(medicalInstruction, indexMi) in medicalInstructionType.medicalInstructions"
            :key="`medicalInstruction-${indexMi}`"
          >
            <el-image
              class="pointer"
              :src="medicalInstruction.image"
              style="width: 100px"
              fit="scale-down"
              v-on:click="selectImg({
                        diseases: medicalInstructionType.diseases,
                        medicalInstructionTypeName: medicalInstructionType.medicalInstructionTypeName,
                        diagnose: medicalInstruction.diagnose,
                        description: medicalInstruction.description,
                        imgUrl: medicalInstruction.image
                    })"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('slideshows', ['isShowImg', 'imageShow']),
    ...mapState('contracts', ['requestDetail'])
  },
  methods: {
    ...mapActions('slideshows', ['closeImgShow', 'selectImg'])
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.margin-vertical {
  margin: 1em 0;
}
</style>
