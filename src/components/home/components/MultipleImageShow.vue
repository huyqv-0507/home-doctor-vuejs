<template>
  <div v-show="visibleAllImages" class="image-view">
    <div class="image-view__content_exit pointer" v-on:click="closeAllImages(checkedImgs)">
      <strong>x</strong>
    </div>
    <el-carousel
      class="image-view__content_images"
      arrow="always"
      :autoplay="false"
      @change="imageChange"
      ref="carousel"
    >
      <el-carousel-item
        style="height: 100%;"
        v-for="(item, index) in allMedicalInstructionShared"
        :key="`allImg-${index}`"
      >
        <div class="image-view__content_images-image">
          <el-image :src="imageInfo.imgUrl" style="height: 650px;" fit="scale-down"></el-image>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="image-view__content_body">
      <div class="bg-theme">
        <h3 class="margin-vertical titleColor">Thông tin phiếu Y lệnh</h3>
        <div class="disease">
          <el-row class="image-view__content_body-title margin-all margin-text">
            Bệnh lý:
            <p v-for="(disease, index) in imageInfo.diseases" :key="`disease-${index}`">
              <strong class="margin-text">- ({{disease.diseaseId}}) {{disease.nameDisease}};</strong>
            </p>
          </el-row>
          <el-row class="image-view__content_body-diagnose margin-all margin-text">
            <p>
              Loại y lệnh:
              <strong>{{imageInfo.medicalInstructionTypeName}}</strong>
            </p>
          </el-row>
          <el-row class="image-view__content_body-diagnose margin-all margin-text">
            <p>
              Chuẩn đoán:
              <strong>{{imageInfo.diagnose}}</strong>
            </p>
          </el-row>
          <el-row class="image-view__content_body-description margin-all margin-text">
            <p>
              Mô tả:
              <strong>{{imageInfo.description}}</strong>
            </p>
          </el-row>
        </div>
      </div>
      <div class="bg-theme">
        <h3 class="margin-vertical titleColor">Danh sách phiếu Y lệnh</h3>
        <div style="font-size: 12px; margin-bottom: .3em;">
          <i>Bác sĩ chọn những Y lệnh để thêm vào hồ sơ bệnh án mới sau khi hợp đồng được ký kết.</i>
          <i style="color: grey;">(Mặc định hệ thống sẽ chọn tất cả nếu bác sĩ không chọn).</i>
        </div>
        <div class="medical-instruction">
          <div
            v-for="(medicalInstructionType, index) in requestDetail.medicalInstructionTypes"
            :key="`medicalInstructionType-${index}`"
          >
            <h4 class="margin-vertical">{{medicalInstructionType.medicalInstructionTypeName}}</h4>
            <div
              v-for="(medicalInstruction, indexMi) in medicalInstructionType.medicalInstructions"
              :key="`medicalInstruction-${indexMi}`"
            >
              <div>
                <input
                  type="checkbox"
                  :id="medicalInstruction.medicalInstructionId"
                  :value="medicalInstruction.medicalInstructionId"
                  v-model="checkedImgs"
                />
                <el-image
                  class="pointer"
                  v-bind:class="{ borderChoose: medicalInstruction.isChoose }"
                  :src="medicalInstruction.image"
                  style="width: 100px"
                  fit="scale-down"
                  v-on:click="handleChooseImg(
            {
              medicalInstructionTypeName: medicalInstructionType.medicalInstructionTypeName,
              medicalInstruction: medicalInstruction
            }
          )"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      checkedImgs: []
    }
  },
  computed: {
    ...mapState('slideshows', [
      'allMedicalInstructionShared',
      'visibleAllImages',
      'imageInfo',
      'medicalInstructionChoose'
    ]),
    ...mapState('contracts', ['requestDetail']),
    ...mapGetters('slideshows', ['getImage'])
  },
  mounted () {},
  methods: {
    ...mapActions('slideshows', ['closeZoom', 'closeAllImages']),
    ...mapActions('medicalInstruction'),
    imageChange (index) {
      this.$store.dispatch('slideshows/setImageInfo', index, { root: true })
    },
    handleChooseImg (imgChoose) {
      var indexImgSelected = this.getImage(imgChoose.medicalInstruction.image) // Vị trí của img trong allMedicalInstructionShared
      this.$store.dispatch('slideshows/setImageInfo', indexImgSelected, {
        root: true
      })
      this.$refs.carousel.setActiveItem(indexImgSelected)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.margin-vertical {
  margin: 0.3em 0 0.8em 0;
}
.medical-instruction {
  overflow: auto;
  max-height: 325px;
  height: auto;
  text-overflow: ellipsis;
  font-size: 13px;
}
.disease {
  margin-top: 0.5em;
  height: auto;
  max-height: 160px;
  overflow: auto;
  font-size: 13px;
}
.margin-text {
  margin: 0.5em 0;
}
.borderChoose {
  border: 3px solid #3ac5c9;
}
</style>
