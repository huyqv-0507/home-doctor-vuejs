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
      <h2 class="info_title">Bệnh lý</h2>
      <el-row class="pointer margin-bottom">
        <el-button @click="showAllImages()">Xem tất cả</el-button>
      </el-row>
      <p
        class="font-size14"
        style="margin-left: .5em;"
        v-for="(disease, index) in requestDetail.diseases"
        :key="'disease ' + index"
      >- ({{disease.diseaseId}}) {{disease.nameDisease}}</p>
      <h2 class="info_title">Y lệnh chia sẻ</h2>
      <el-row>
        <el-collapse accordion @change="handleChangeMedicalInstruction">
          <el-collapse-item
            :name="index"
            v-for="(medicalInstructionType, index) in requestDetail.medicalInstructionTypes"
            :key="`medicalInstructionShared-${index}`"
          >
            <template slot="title">
              <p style="font-size: 13px;">- {{ medicalInstructionType.medicalInstructionTypeName }}</p>
            </template>
            <el-row class="margin-bottom">
              <div
                class="image pointer"
                v-for="(medicalInstruction, indexImg) in medicalInstructionType.medicalInstructions"
                :key="`${index}-${indexImg}`"
                @click="selectImg({
                        diseases: requestDetail.diseases,
                        medicalInstructionTypeName: medicalInstructionType.medicalInstructionTypeName,
                        diagnose: medicalInstruction.diagnose,
                        description: medicalInstruction.description,
                        imgUrl: medicalInstruction.image
                    })"
              >
                <el-image :src="medicalInstruction.image" style="width: 150px;"></el-image>
              </div>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-row>
      <div v-if="requestDetail.note !== ''">
        <h2 class="info_title">Mô tả</h2>
        <el-row
          class="wrapper_patient font-size14"
          style="margin-left: .5em;"
        >- {{requestDetail.note}}.</el-row>
      </div>
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
      <h2 class="info_title">Thời gian</h2>
      <div class="wrapper_patient">
        <el-row class="wrapper_patient-item font-size14">
          <el-checkbox v-model="dateChk">Xác định số ngày theo dõi</el-checkbox>
        </el-row>
        <div v-if="dateChk === true">
          <el-row class="wrapper_patient-item font-size14">
            Ngày bắt đầu theo dõi:
            <el-date-picker v-model="dateStarted" type="date" @change="handleChangeDateStarted"
              :placeholder="requestDetail.dateStarted"></el-date-picker>
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
              :placeholder="requestDetail.dateStarted"
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
        v-if="requestDetail.daysOfTracking !== undefined && dateChk === true"
        type="primary"
        @click="nextCreateContract(requestDetail)"
        class="wrapper_action-item"
      >Tiếp tục</el-button>
      <el-button v-else class="wrapper_action-item" type="primary" disabled>Tiếp tục</el-button>
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
      dateChk: false,
      dateStarted: ''
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
    ...mapActions('slideshows', ['selectImg', 'showAllImages']),
    handleChangeMedicalInstruction (val) {
      console.log('val medical instruction:::', val)
    },
    handleChangeDisease (val) {
      console.log('val disease:::', val)
    },
    handleChangeDateStarted (date) {
      var now = new Date()
      if (now > date) {
        console.log('Vui lòng chọn ngày ký hợp đồng lớn hơn ngày hiện tại')
      } else {
        this.$store.dispatch('contracts/setDateStartedContract', date, {
          root: true
        })
      }
    }
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
