<template>
  <div class="mainContent">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
      <el-breadcrumb-item>Danh sách yêu cầu</el-breadcrumb-item>
      <el-breadcrumb-item>Thông tin bệnh nhân</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="info">
      <h2 class="info_title">Thông tin cơ bản</h2>
      <el-row :gutter="20" class="wrapper_patient font-size14">
        <el-col :span="14">
          <el-row class="wrapper_patient-item">
            Họ và tên:
            <strong>{{requestDetail.fullNamePatient}}.</strong>
          </el-row>
          <el-row class="wrapper_patient-item">
            Ngày sinh:
            <strong>{{requestDetail.dobPatient}}.</strong>
          </el-row>
          <el-row class="wrapper_patient-item">
            Địa chỉ:
            <strong>{{requestDetail.addressPatient}}.</strong>
          </el-row>
        </el-col>
        <el-col :span="10">
          <el-row class="wrapper_patient-item">
            Nghề nghiệp:
            <strong>{{patientDetail.career}}.</strong>
          </el-row>
          <el-row class="wrapper_patient-item">
            Số điện thoại:
            <strong>{{requestDetail.phoneNumberPatient}}.</strong>
          </el-row>
        </el-col>
      </el-row>
      <h2 class="info_title">Bệnh lý:</h2>
      <p
        class="font-size14"
        style="margin-left: .5em;"
        v-for="(disease, index) in requestDetail.diseases"
        :key="'disease ' + index"
      >
        -
        <strong>({{disease.diseaseId}})</strong>
        {{disease.name}}.
      </p>
      <div v-if="requestDetail.note !== ''">
        <h2 class="info_title">Mô tả:</h2>
        <el-row
          class="wrapper_patient font-size14"
          style="margin-left: .5em;"
        >- {{requestDetail.note}}.</el-row>
      </div>
      <h2 class="info_title">Hồ sơ bệnh án</h2>
      <!--<p class="font-size14">Những y lệnh bệnh nhân đã chia sẻ gồm:</p>
      <p
        class="font-size14"
        style="margin-left: .5em;"
        v-for="(mi, index) in requestDetail.medicalInstructionShared"
        :key="'mi ' + index"
      >- {{mi.medicalInstructionType}}</p>
      <el-row>
        <div
          class="image pointer"
          v-for="(image, imageIndex) in contractImgs"
          :key="`${i}-${imageIndex}`"
          @click="selectImg(imageIndex)"
          :style="{
                backgroundImage: 'url(' + image + ')',
                width: '150px',
                height: '150px'
                }"
      ></div>-->
      <el-row><div
        v-for="(medicalInstructionShared, index) in requestDetail.medicalInstructionShared"
        :key="`medicalInstructionShared-${index}`"
      >
       <el-row><i style="font-size: 13px;">{{medicalInstructionShared.medicalInstructionType}}</i></el-row>
        <el-row class="margin-bottom">
        <div
        class="image pointer"
          v-for="(image, indexImg) in medicalInstructionShared.images"
          :key="`${index}-${indexImg}`" @click="selectImg({index: index, indexImg: indexImg})"
        ><img :src="image.image" style="width: 150px; height: 150px"/></div></el-row>
      </div>
      </el-row>
      <el-row class="pointer"><el-button @click="showAllImages()">Xem tất cả</el-button></el-row>
      <h2 class="info_title">Thời gian</h2>
      <div class="wrapper_patient">
        <el-row class="wrapper_patient-item font-size14">
          <el-checkbox v-model="dateChk">Chỉnh sửa thời gian theo dõi</el-checkbox>
        </el-row>
        <div v-if="dateChk === true">
          <el-row class="wrapper_patient-item font-size14">
            Ngày bắt đầu theo dõi:
            <el-date-picker v-model="requestDetail.dateStarted" type="date" disabled></el-date-picker>
          </el-row>
          <el-row class="wrapper_patient-item font-size14">
            Số ngày theo dõi:
            <el-input-number v-model="requestDetail.daysOfTracking"></el-input-number>
          </el-row>
        </div>
        <div v-else-if="dateChk === false">
          <el-row class="wrapper_patient-item font-size14">
            Ngày bắt đầu theo dõi:
            <el-date-picker
              v-model="requestDetail.dateStarted"
              type="date"
              disabled
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-row>
          <el-row class="wrapper_patient-item font-size14">
            Số ngày theo dõi:
            <el-input-number v-model="requestDetail.daysOfTracking" disabled></el-input-number>
          </el-row>
        </div>
      </div>
    </div>
    <el-row class="wrapper_action">
      <el-button type="secondary" @click="rejectContract()" class="wrapper_action-item">Từ chối</el-button>
      <el-button
        type="primary"
        @click="nextCreateContract(requestDetail)"
        class="wrapper_action-item"
      >Tiếp tục</el-button>
      <el-dialog title="Thông báo" :visible.sync="rejectDialogVisible" width="30%">
        <span>Bạn có muốn từ chối yêu cầu không?</span>
        <br />
        <el-button type="secondary" @click="continueAssignContract()">Không</el-button>
        <el-button type="primary" @click="confirmRejectContract(requestDetail.contractId)">Đồng ý</el-button>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      dateChk: false
    }
  },
  computed: {
    ...mapState('contracts', [
      'requestDetail',
      'rejectDialogVisible',
      'contract',
      'patientDetail',
      'contractImgs',
      'contractRequests'
    ]),
    ...mapState('users', ['user']),
    ...mapState('slideshows', ['healthRecordImgs', 'healthRecordImgIndex'])
  },
  mounted () {
    this.getRequestDetail(`${this.$route.params.contractId}`)
  },
  methods: {
    ...mapActions('contracts', [
      'getRequestDetail',
      'rejectContract',
      'continueAssignContract',
      'confirmRejectContract',
      'nextCreateContract'
    ]),
    ...mapActions('slideshows', ['selectImg', 'showAllImages'])
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.image {
  float: left;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid #ebebeb;
  margin: 5px;
  width: 150px;
  height: 150px;
}
.wrapper_patient {
  .wrapper_patient-item {
    margin: 0.5em 0;
  }
}
.wrapper_action {
  display: flex;
  justify-content: center;
  .wrapper_action-item {
    margin: 2em 3em 0 3em;
  }
}
.info {
  .info_title {
    margin: 0.5em 0;
  }
}
.margin-bottom {
  margin-bottom: 1em;
}
</style>
