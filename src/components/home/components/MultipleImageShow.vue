<template>
  <div v-show="visibleAllImages" class="image-view">
    <div class="image-view__content_exit pointer" v-on:click="closeImages()">
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
        v-for="(item, index) in images"
        :key="`allImg-${index}`"
      >
      <div>{{item}}</div>
        <div class="image-view__content_images-image">
          <el-image :src="imageInfo.url" style="height: 650px;" fit="scale-down"></el-image>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="image-view__content_body">
      <div class="bg-theme">
        <h3 class="margin-vertical titleColor">Thông tin phiếu Y lệnh</h3>
        <div class="disease">
          <el-row class="image-view__content_body-title margin-all margin-text">
            Bệnh lý:
            <strong>{{imageInfo.diseases}}</strong>
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
        <el-button
          style="margin-bottom: .5em;"
          type="primary"
          size="mini"
          @click="handleSaveImages(checkedImgs)"
        >Lưu</el-button>
        <div class="medical-instruction">
          <el-collapse accordion>
            <el-collapse-item
              :name="indexDisease"
              v-for="(medicalInstructionDisease, indexDisease) in requestDetail.medicalInstructionDiseases"
              :key="`medicalInstructionType-${indexDisease}`"
            >
              <template slot="title">
                <p
                  style="font-size: 13px; margin-left: .5em;"
                >- ({{medicalInstructionDisease.diseaseId}}) {{medicalInstructionDisease.diseaseName}}</p>
              </template>
              <el-row style="display: flex; align-items: center; overflow-x: auto; margin: .5em;">
                <div
                  v-for="(medicalInstruction, indexMi) in medicalInstructionDisease.medicalInstructions"
                  :key="`medicalInstruction-${indexMi}`"
                >
                  <p>{{medicalInstruction.medicalInstructionTypeName}}</p>
                  <div
                    v-for="(mi, index) in medicalInstruction.medicalInstruction"
                    :key="`mi${index}`"
                  >
                    <input
                      v-if="isShowChkChoose"
                      type="checkbox"
                      :id="`${mi.medicalInstructionId}-${medicalInstructionDisease.diseaseId}`"
                      :value="{
                    medicalInstructionId: mi.medicalInstructionId,
                    medicalInstructionTypeName: medicalInstruction.medicalInstructionTypeName,
                    diseaseId: medicalInstructionDisease.diseaseId,
                    diseaseName: medicalInstructionDisease.diseaseName
                    }"
                      v-model="checkedImgs"
                    />
                    <el-row
                      style="margin: 0.4em; display: inline-flex; overflow: auto;"
                      v-show="medicalInstruction.image !== null"
                    >
                      <el-row
                        v-for="(i, index) in mi.images"
                        :key="`i${index}`"
                        style="margin-right: .3em;"
                      >
                        <el-image
                          class="pointer"
                          v-bind:class="{ borderChoose: i.isChoose }"
                          :src="i.url"
                          style="width: 100px"
                          fit="scale-down"
                          v-on:click="handleChooseImg(
            {
              medicalInstructionTypeName: medicalInstructionType.medicalInstructionTypeName,
              medicalInstruction: medicalInstruction,
              imgUrl: i.url
            }
          )"
                        />
                      </el-row>
                    </el-row>
                  </div>
                </div>
              </el-row>
            </el-collapse-item>
          </el-collapse>
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
      'images',
      'visibleAllImages',
      'imageInfo',
      'medicalInstructionChoose',
      'isShowChkChoose'
    ]),
    ...mapState('contracts', ['requestDetail']),
    ...mapGetters('slideshows', ['getImage'])
  },
  mounted () {},
  methods: {
    ...mapActions('slideshows', ['closeZoom', 'closeAllImages', 'saveImgChks', 'closeImages']),
    ...mapActions('medicalInstruction'),
    imageChange (index) {
      this.$store.dispatch('slideshows/setImageInfo', index, { root: true })
    },
    handleChooseImg (imgChoose) {
      console.log(imgChoose)
      var indexImgSelected = this.getImage(imgChoose.imgUrl) // Vị trí của img trong allMedicalInstructionShared
      this.$store.dispatch('slideshows/setImageInfo', indexImgSelected, {
        root: true
      })
      this.$refs.carousel.setActiveItem(indexImgSelected)
    },
    handleSaveImages (imgChecks) {
      this.$confirm(
        'Bác sĩ đã chắc chắn chọn những Y lệnh này không?',
        'Xác nhận',
        {
          confirmButtonText: 'Đồng ý',
          cancelButtonText: 'Trở lại'
        }
      ).then(() => {
        this.closeAllImages(imgChecks)
      })
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
  overflow-y: auto;
  overflow-x: hidden;
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
