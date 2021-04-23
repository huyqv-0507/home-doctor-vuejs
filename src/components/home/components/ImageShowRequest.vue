<template>
  <div v-show="isImageRequestShow" class="image-view">
    <div class="image-view__content_exit pointer" v-on:click="closeImageRequestShow()">
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
          <img v-for="(i, index) in imageInfo.images" :key="index"
            class="pointer"
            :src="i.url"
            style="height: 650px"
            fit="scale-down"
          />
        </div>
      </el-carousel-item>
      <div class="image-view__content_body">
        <h2>{{imageInfo.medicalInstructionTypeName}}</h2>
        <p>
          Chuẩn đoán:
          <strong>{{imageInfo.diagnose}}</strong>
        </p>
        <p>
          Mô tả:
          <strong>{{imageInfo.description}}</strong>
        </p>
        <p>
          Ngày tạo:
          <strong>{{imageInfo.dateCreate.split('T')[0].split('-').reverse().join('/')}}</strong>
        </p>
        <p>
          Nơi tạo:
          <strong>{{imageInfo.placeHealthRecord}}</strong>
        </p>
        <div>
          <el-button type="primary" size="mini" v-on:click="handleAddToHR(imageInfo.medicalInstructionId)">Thêm vào hồ sơ</el-button>
          <el-button size="mini" v-on:click="handleRejectAddToHR(imageInfo.medicalInstructionId)">Từ chối</el-button>
        </div>
      </div>
    </el-carousel>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      checkedImgs: []
    }
  },
  computed: {
    ...mapState('slideshows', ['images', 'isImageRequestShow', 'imageInfo'])
  },
  mounted () {},
  methods: {
    ...mapActions('slideshows', ['closeImageRequestShow']),
    imageChange (index) {
      console.log(index)
    },
    handleAddToHR (medicalInstructionId) {
      this.$store.dispatch('medicalInstruction/confirmAddMIToHR', medicalInstructionId, { root: true })
      this.closeImageRequestShow()
    },
    handleRejectAddToHR (medicalInstructionId) {
      this.$store.dispatch('medicalInstruction/rejectAddMIToHR', medicalInstructionId, { root: true })
      this.closeImageRequestShow()
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
  z-index: 2010;
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
    bottom: 0;
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
    bottom: 0;
    left: 50px;
    height: 170px;
    color: white;
    z-index: 2001;
  }
}
</style>
