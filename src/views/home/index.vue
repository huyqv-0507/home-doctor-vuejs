<template>
  <div class="wrapper">
    <base-layout>
      <template v-slot:left-content>
        <left-content />
      </template>
      <template v-slot:main-content>
        <router-view></router-view>
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
                <p>Bệnh lý: <strong v-for="(disease, index) in imageShow.diseases" :key="`disease-${index}`">({{disease.diseaseId}}) {{disease.nameDisease}};</strong></p>
              </el-row>
              <el-row class="image-view__content_body-diagnose margin-all">
                <p>Loại y lệnh: <strong>{{imageShow.medicalInstructionTypeName}}</strong></p>
              </el-row>
              <el-row class="image-view__content_body-diagnose margin-all">
                <p>Chuẩn đoán: <strong>{{imageShow.diagnose}}</strong></p>
              </el-row>
              <el-row class="image-view__content_body-description margin-all">
                <p>Mô tả: <strong>{{imageShow.description}}</strong></p>
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
                <p>Bệnh lý: <strong v-for="(disease, index) in imageInfo.diseases" :key="`disease-${index}`">({{disease.diseaseId}}) {{disease.nameDisease}};</strong></p>
              </el-row>
              <el-row class="image-view__content_body-diagnose margin-all">
                <p>Loại y lệnh: <strong>{{imageInfo.medicalInstructionTypeName}}</strong></p>
              </el-row>
              <el-row class="image-view__content_body-diagnose margin-all">
                <p>Chuẩn đoán: <strong>{{imageInfo.diagnose}}</strong></p>
              </el-row>
              <el-row class="image-view__content_body-description margin-all">
                <p>Mô tả: <strong>{{imageInfo.description}}</strong></p>
              </el-row>
            </div>
          </div>
        </div>
        <medical-instruction-dialog />
        <add-medicine-form />
        <edit-medicine-form />
        <patient-select-diaglog />
      </template>
      <template v-slot:right-content>
        <right-content />
      </template>
    </base-layout>
  </div>
</template>

<script>
import BaseLayout from '../../layouts/BaseLayout.vue'
import LeftContent from '../../components/left-content'
import RightContent from '../../components/right-content'
import { mapState, mapActions } from 'vuex'
import MedicalInstruction from '../../components/home/dialog/MedicalInstruction.vue'
import AddMedicineForm from '../../components/home/dialog/AddMedicineForm.vue'
import EditMedicineForm from '../../components/home/dialog/EditMedicineForm.vue'
import PatientSelectDialog from '../../components/home/appointment/patient-select-dialog'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState('slideshows', [
      'allMedicalInstructionShared',
      'visibleAllImages',
      'imageInfo',
      'isShowImg',
      'imageShow'
    ]),
    ...mapState('contracts', ['contractImgs', 'requestDetail'])
  },
  methods: {
    ...mapActions('modals', [
      'closeEditMedicine' // Đóng modal sửa thuốc
    ]),
    ...mapActions('slideshows', [
      'closeZoom',
      'closeAllImages',
      'closeImgShow'
    ]),
    imageChange (index) {
      this.$store.dispatch('slideshows/setImageInfo', index, { root: true })
    }
  },
  components: {
    'base-layout': BaseLayout,
    'left-content': LeftContent,
    'right-content': RightContent,
    'medical-instruction-dialog': MedicalInstruction,
    'add-medicine-form': AddMedicineForm,
    'edit-medicine-form': EditMedicineForm,
    'patient-select-diaglog': PatientSelectDialog
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.form {
  .form__item {
    margin-bottom: 10px;
    .form__item_use-time {
      margin-bottom: 0.5em;
    }
    .form__item_content-opt {
      margin-left: 0.5em;
    }
  }
}

.margin-all {
  margin-bottom: 2em;
  margin: 1em;
}
</style>
