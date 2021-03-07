<template>
  <div class="wrapper">
    <base-layout>
      <template v-slot:left-content>
        <left-content />
      </template>
      <template v-slot:main-content>
        <router-view></router-view>
        <gallery v-for="(medicalInstructionShared, index) in medicalInstructionShareds" :id="`gallery-${index}`" :key="`gallery-${index}`"
          :images="medicalInstructionShared.images"
          :index="medicalInstructionShared.index"
          @close="closeZoom()"
        ></gallery>
        <div v-show="visibleAllImages" class="image-view" >
<div class="pointer" v-on:click="closeAllImages()" style="color: red; right: 0; position: absolute; width: 20px; height: 20px; z-index: 2001;">X</div>
  <el-carousel arrow="always" height="800px" loop="false">
    <el-carousel-item v-for="(item, index) in requestDetail.medicalInstructionShared" :key="`allImg-${index}`">
      <h3 style="color: white;">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
        </div>
        <medical-instruction-dialog />
        <add-medicine-form/>
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

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState('slideshows', ['medicalInstructionSharedIndex', 'medicalInstructionShareds', 'visibleAllImages']),
    ...mapState('contracts', ['contractImgs', 'requestDetail'])
  },
  methods: {
    ...mapActions('modals', [
      'closeEditMedicine' // Đóng modal sửa thuốc
    ]),
    ...mapActions('slideshows', ['closeZoom', 'closeAllImages'])
  },
  components: {
    'base-layout': BaseLayout,
    'left-content': LeftContent,
    'right-content': RightContent,
    gallery: VueGallery,
    'medical-instruction-dialog': MedicalInstruction,
    'add-medicine-form': AddMedicineForm
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
    right: 0;
    left: 0;
    background: black;
    opacity: .8;
    z-index: 2000;
}
</style>
