<template>
  <base-layout>
    <template v-slot:left-content>
      <left-content />
    </template>
    <template v-slot:main-content>
      <router-view/>
        <div v-show="isShowImg" class="image-view">
          <div class="image-view__content_exit pointer" v-on:click="closeImgShow()">
            <strong>x</strong>
          </div>
          <div class="image-view__content_images">
            <div class="image-view__content_images-image">
              <el-image :src="imageInfo.imgUrl" style="width: 600px;" fit="scale-down" ></el-image>
            </div>
          </div>
          <div class="image-view__content_body">
            <div class="bg-theme" style="margin-top: 3em;">
              <el-row class="image-view__content_body-title margin-all">
                <p>Bệnh lý: <strong v-for="(disease, index) in imageShow.diseases" :key="`disease-${index}`" v-show="disease.diseaseId !== ''">({{disease.diseaseId}}) {{disease.nameDisease}};</strong></p>
              </el-row>
              <el-row class="image-view__content_body-diagnose margin-all">
                <p>Loại y lệnh: <strong>{{imageShow.medicalInstructionTypeName}}</strong></p>
              </el-row>
              <el-row class="image-view__content_body-diagnose margin-all">
                <p v-show="imageShow.diagnose !== ''">Chuẩn đoán: <strong>{{imageShow.diagnose}}</strong></p>
              </el-row>
              <el-row class="image-view__content_body-description margin-all">
                <p v-show="imageShow.description !== ''">Mô tả: <strong>{{imageShow.description}}</strong></p>
              </el-row>
            </div>
          </div>
        </div>
        <div v-show="visibleAllImages" class="image-view">
          <div class="image-view__content_exit pointer" v-on:click="closeAllImages()">
            <strong>x</strong>
          </div>
          <el-carousel
            class="image-view__content_images"
            arrow="always"
            height="800px"
            :autoplay="false"
            @change="imageChange"
          >
            <el-carousel-item
              v-for="(item, index) in allMedicalInstructionShared"
              :key="`allImg-${index}`"
            >
              <div class="image-view__content_images-image">
                <el-image :src="imageInfo.imgUrl" style="width: 600px;" fit="scale-down"></el-image>
              </div>
            </el-carousel-item>
          </el-carousel>
          <div class="image-view__content_body">
            <div class="bg-theme" style="margin-top: 3em;">
              <el-row class="image-view__content_body-title margin-all">
                <p>Bệnh lý: <strong v-for="(disease, index) in imageInfo.diseases" :key="`disease-${index}`" v-show="disease.diseaseId !== ''">({{disease.diseaseId}}) {{disease.nameDisease}};</strong></p>
              </el-row>
              <el-row class="image-view__content_body-diagnose margin-all">
                <p>Loại y lệnh: <strong>{{imageInfo.medicalInstructionTypeName}}</strong></p>
              </el-row>
              <el-row class="image-view__content_body-diagnose margin-all">
                <p v-show="imageInfo.diagnose !== ''">Chuẩn đoán: <strong>{{imageInfo.diagnose}}</strong></p>
              </el-row>
              <el-row class="image-view__content_body-description margin-all">
                <p v-show="imageInfo.description !== ''">Mô tả: <strong>{{imageInfo.description}}</strong></p>
              </el-row>
            </div>
          </div>
        </div>
    </template>
    <template v-slot:right-content>
      <right-content />
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from '../../layouts/BaseLayout.vue'
import PatientDetailLeft from '../../components/left-content/PatientDetail.vue'
import PatientDetailRight from '../../components/right-content/PatientDetail.vue'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    'base-layout': BaseLayout,
    'left-content': PatientDetailLeft,
    'right-content': PatientDetailRight
  },
  computed: {
    ...mapState('slideshows', [
      'visibleAllImages',
      'imageInfo',
      'isShowImg',
      'imageShow'
    ])
  },
  methods: {
    ...mapActions('slideshows', [
      'closeZoom',
      'closeAllImages',
      'closeImgShow'
    ]),
    imageChange (index) {
      this.$store.dispatch('slideshows/setImageInfo', index, { root: true })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
