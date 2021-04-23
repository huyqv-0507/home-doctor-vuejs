<template>
  <div v-show="isImageShow" class="image-view">
    <div class="image-view__content_exit pointer" v-on:click="closeImageShow()">
      <strong>x</strong>
    </div>
    <el-carousel
      class="image-view__content_images"
      arrow="always"
      :autoplay="false"
      @change="imageChange"
      ref="carousel"
    >
      <el-carousel-item>
        <div class="image-view__content_images-image">
          <img
            src="../../../assets/icons/ic-blood-pressure.png"
            style="height: 650px;"
            fit="scale-down"
          />
        </div>
      </el-carousel-item>
    </el-carousel>
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
      'isImageShow',
      'imageInfo',
      'medicalInstructionChoose',
      'isShowChkChoose'
    ]),
    ...mapState('contracts', ['requestDetail']),
    ...mapGetters('slideshows', ['getImage'])
  },
  mounted () {},
  methods: {
    ...mapActions('slideshows', [
      'closeZoom',
      'closeAllImages',
      'saveImgChks',
      'closeImageShow'
    ]),
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
    padding: 0.3em;
    position: absolute;
    left: 0.5em;
    top: 0.5em;
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
    bottom: 100px;
    left: 0;
    right: 0;
    .image-view__content_images-image {
      height: 100%;
      /* z-index: 10000; */
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .image-view__content_body {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 100px;
    width: 400px;
    background-color: white;
    z-index: 2001;
  }
}
</style>
