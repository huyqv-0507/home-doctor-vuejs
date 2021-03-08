<template>
  <div class="wrapper">
    <base-layout>
      <template v-slot:left-content>
        <left-content />
      </template>
      <template v-slot:main-content>
        <router-view></router-view>
        <gallery
          v-for="(medicalInstructionShared, index) in medicalInstructionShareds"
          :id="`gallery-${index}`"
          :key="`gallery-${index}`"
          :images="medicalInstructionShared.images"
          :index="medicalInstructionShared.index"
          @close="closeZoom()"
        ></gallery>
        <div v-show="visibleAllImages" class="image-view">
          <div class="image-view__content_exit pointer" v-on:click="closeAllImages()"><strong>x</strong></div>
          <el-carousel
            class="image-view__content_images"
            arrow="always"
            height="800px"
            :autoplay="false"
            @change="imageChange"
          >
            <el-carousel-item
              v-for="(item, index) in allMedicalInstructionShareds"
              :key="`allImg-${index}`"
            >
              <div class="image-view__content_images-image">
                <img class :src="item.image" />
              </div>
            </el-carousel-item>
          </el-carousel>
          <div class="image-view__content_body">
            <div class="bg-theme" style="margin-top: 3em;">
              <el-row class="image-view__content_body-title margin-all">
                <h3>{{imageInfo.medicalInstructionType}}</h3>
              </el-row>
              <el-row class="image-view__content_body-diagnose margin-all">
                <p>Chuẩn đoán: {{imageInfo.diagnose}}</p>
              </el-row>
              <el-row class="image-view__content_body-description margin-all">
                <p>Mô tả: {{imageInfo.description}}</p>
              </el-row>
            </div>
          </div>
        </div>
        <medical-instruction-dialog />
        <add-medicine-form />
        <edit-medicine-form/>
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
import VueGallery from 'vue-gallery'
import MedicalInstruction from '../../components/home/dialog/MedicalInstruction.vue'
import AddMedicineForm from '../../components/home/dialog/AddMedicineForm.vue'
import EditMedicineForm from '../../components/home/dialog/EditMedicineForm.vue'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState('slideshows', [
      'medicalInstructionSharedIndex',
      'medicalInstructionShareds',
      'visibleAllImages',
      'imageInfo'
    ]),
    ...mapState('contracts', [
      'contractImgs',
      'requestDetail',
      'allMedicalInstructionShareds'
    ])
  },
  methods: {
    ...mapActions('modals', [
      'closeEditMedicine' // Đóng modal sửa thuốc
    ]),
    ...mapActions('slideshows', ['closeZoom', 'closeAllImages']),
    imageChange (index) {
      this.$store.dispatch('slideshows/setImageInfo', index, { root: true })
    }
  },
  components: {
    'base-layout': BaseLayout,
    'left-content': LeftContent,
    'right-content': RightContent,
    gallery: VueGallery,
    'medical-instruction-dialog': MedicalInstruction,
    'add-medicine-form': AddMedicineForm,
    'edit-medicine-form': EditMedicineForm
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
.image-view {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: black;
  z-index: 2000;
  .image-view__content_exit {
    background-color: #eeeff3;
    border-radius: 30px;
    padding: .3em;
    position: absolute;
    left: .5em;
    top: .5em;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    width: 20px;
    height: 20px;
    z-index: 2002;
  }
  .image-view__content_images {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 400px;
    .image-view__content_images-image {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      /* z-index: 10000; */
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .image-view__content_body {
    position: absolute;
    width: 400px;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: white;
    z-index: 2001;
  }
}
.margin-all {
  margin-bottom: 2em;
  margin: 1em;
}
</style>
