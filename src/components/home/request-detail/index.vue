<template>
  <div class="mainContent">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>Trang chủ</el-breadcrumb-item>
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
            <strong
              v-if="requestDetail.dobPatient !== undefined"
            >{{requestDetail.dobPatient.split('-')[2]}}/{{requestDetail.dobPatient.split('-')[1]}}/{{requestDetail.dobPatient.split('-')[0]}}.</strong>
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
      <p
        class="font-size14"
        style="margin-left: .5em; margin-bottom: 1em;"
        v-for="(disease, index) in requestDetail.diseases"
        :key="'disease ' + index"
      >- ({{disease.diseaseId}}) {{disease.diseaseName}}</p>
      <h2 class="info_title">Y lệnh chia sẻ</h2>
      <div v-show="requestDetail.status === 'APPROVED'">
        <p style="color: blue; font-size: 12px;">
          <i>Bác sĩ có thể thay đổi y lệnh trong hồ sơ đang hiện hành.</i>
        </p>
        <el-button
          @click="updateMedicalInstructionToContract({checkImgs: checkImgs, contractId: requestDetail.contractId})"
          size="mini"
          type="primary"
          style="margin: .5em;"
        >Lưu</el-button>
      </div>
      <el-row>
        <el-collapse accordion>
          <el-collapse-item
            v-show="requestDetail.medicalInstructionDiseases.length !== 0"
            :name="index"
            v-for="(medicalInstructionType, index) in requestDetail.medicalInstructionDiseases"
            :key="`medicalInstructionShared-${index}`"
          >
            <template slot="title">
              <p
                style="font-size: 13px;"
              >- ({{ medicalInstructionType.diseaseId }}) {{ medicalInstructionType.diseaseName }}</p>
            </template>
            <el-row class="margin-bottom">
              <div
                class="image pointer"
                v-for="(medicalInstruction, indexImg) in medicalInstructionType.medicalInstructions"
                :key="`${index}-${indexImg}`"
              >
                <p>{{medicalInstruction.medicalInstructionTypeName}}</p>
                <div v-if="medicalInstruction.images !== null">
                  <input
                    type="checkbox"
                    :id="`${medicalInstruction.medicalInstructionId}-${medicalInstructionType.diseaseId}`"
                    :value="{
                          medicalInstructionId: medicalInstruction.medicalInstructionId,
                          medicalInstructionTypeName: medicalInstruction.medicalInstructionTypeName
                          }"
                    v-model="checkImgs"
                  />
                  <el-image
                    v-on:click="showMedicalInstructionImageDetail(medicalInstruction.medicalInstructionId)"
                    :src="im.url"
                    v-for="(im, index) in medicalInstruction.images"
                    :key="`i${index}`"
                    style="width: 100px; margin: .3em;"
                  />
                </div>
              </div>
            </el-row>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              <p style="font-size: 13px;">- Phiếu khác</p>
            </template>
            <el-row class="margin-bottom">
              <div
                v-for="(medicalInstruction, index) in requestDetail.medicalInstructionOthers"
                :key="`medicalinstructionother${index}`"
              >
                <div>{{medicalInstruction.medicalInstructionTypeName}}</div>
                <div
                  v-if="medicalInstruction.medicalInstructionTypeName === 'Đơn thuốc'"
                  style="display: flex; margin: .4em;"
                >
                  <div
                    v-for="(mi, indexMi) in medicalInstruction.medicalInstructions"
                    :key="`mi${indexMi}`"
                    style="display: flex;"
                  >
                    <input
                      type="checkbox"
                      :id="`${mi.medicalInstructionId}-${medicalInstruction.medicalInstructionTypeName}`"
                      :value="{
                       medicalInstructionId: mi.medicalInstructionId,
                       medicalInstructionTypeName: medicalInstruction.medicalInstructionTypeName}"
                      v-model="checkImgs"
                    />
                    <div v-if="mi.images !== null">
                      <el-image
                        v-on:click="showMedicalInstructionImageDetail(mi.medicalInstructionId)"
                        :src="im.url"
                        v-for="(im, index) in mi.images"
                        :key="`i${index}`"
                        style="width: 100px; margin: .3em; cursor: pointer;"
                      />
                    </div>
                    <div v-else>
                      <img
                        src="../../../assets/icons/ic-medicine.png"
                        style="width: 30px; margin: 0 1em;"
                      />
                      <div>
                        <el-link
                          size="mini"
                          type="primary"
                          v-on:click="handleView({
                       medicalInstructionId: mi.medicalInstructionId,
                       medicalInstructionTypeName: medicalInstruction.medicalInstructionTypeName})"
                        >Đơn thuốc {{indexMi + 1}}</el-link>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-else-if="medicalInstruction.medicalInstructionTypeName === 'Sinh hiệu'"
                  style="display: flex;"
                >
                  <div
                    v-for="(mi, indexMi) in medicalInstruction.medicalInstructions"
                    :key="`mi${indexMi}`"
                    style="display: flex;"
                  >
                    <input
                      type="checkbox"
                      :id="`${mi.medicalInstructionId}-${medicalInstruction.medicalInstructionTypeName}`"
                      :value="{
                       medicalInstructionId: mi.medicalInstructionId,
                       medicalInstructionTypeName: medicalInstruction.medicalInstructionTypeName}"
                      v-model="checkImgs"
                    />
                    <div v-if="mi.images !== null">
                      <el-image
                        v-on:click="showMedicalInstructionImageDetail(mi.medicalInstructionId)"
                        :src="im.url"
                        v-for="(im, index) in mi.images"
                        :key="`i${index}`"
                        style="width: 100px; margin: .3em; cursor: pointer;"
                      />
                    </div>
                    <div v-else>
                      <img
                        src="../../../assets/icons/ic-blood-pressure.png"
                        style="width: 30px; margin: 0 1em;"
                      />
                      <div>
                        <el-link
                          size="mini"
                          type="primary"
                          v-on:click="handleView({
                       medicalInstructionId: mi.medicalInstructionId,
                       medicalInstructionTypeName: medicalInstruction.medicalInstructionTypeName})"
                        >Sinh hiệu {{indexMi + 1}}</el-link>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div
                    v-for="(mi, index) in medicalInstruction.medicalInstructions"
                    :key="`mi${index}`"
                  >
                    <input
                      type="checkbox"
                      :id="`${mi.medicalInstructionId}-${medicalInstruction.medicalInstructionTypeName}`"
                      :value="{
                       medicalInstructionId: mi.medicalInstructionId,
                       medicalInstructionTypeName: medicalInstruction.medicalInstructionTypeName}"
                      v-model="checkImgs"
                    />
                    <div v-if="mi.images !== null">
                      <el-image
                        v-on:click="showMedicalInstructionImageDetail(mi.medicalInstructionId)"
                        :src="im.url"
                        v-for="(im, index) in mi.images"
                        :key="`i${index}`"
                        style="width: 100px; margin: .3em; cursor: pointer;"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-row>
      <h2 class="info_title">Y lệnh bác sĩ đã chọn</h2>
      <div v-show="checkImgs.length === 0">
        <i style="color: grey; font-size: 12px;">Bác sĩ chưa chọn y lệnh nào.</i>
      </div>
      <div v-for="(img, index) in imgSelected" :key="`img-${index}`">
        <p>- {{img.medicalInstructionTypeName}} ({{img.medicalInstructions.length}})</p>
      </div>
      <div v-if="requestDetail.note !== ''">
        <h2 class="info_title">Mô tả</h2>
        <el-row
          class="wrapper_patient font-size14"
          style="margin-left: .5em;"
        >- {{requestDetail.note}}.</el-row>
        <el-button
          @click="updateMedicalInstructionToContract({contractId: contractIdUpdate, checkImgs: checkImgs})"
        ></el-button>
      </div>
      <h2 class="info_title">Thời gian</h2>
      <div v-if="requestDetail.status === 'APPROVED'">
        <el-row class="wrapper_patient-item font-size14 verticalCenter">
          <el-col :span="6">Ngày bắt đầu theo dõi:</el-col>
          <el-col :span="8">
            <el-date-picker
              size="mini"
              v-model="requestDetail.dateStarted"
              type="date"
              format="dd/MM/yyyy"
              value-format="dd-MM-yyyy"
              disabled
            ></el-date-picker>
          </el-col>
        </el-row>
        <el-row class="wrapper_patient-item font-size14">
          Số ngày theo dõi:
          <el-input-number size="mini" v-model="requestDetail.daysOfTracking" disabled></el-input-number>
        </el-row>
      </div>
      <div v-else-if="requestDetail.status === 'PENDING'">
        <div class="wrapper_patient">
          <el-row class="wrapper_patient-item font-size14">
            <el-checkbox v-model="dateChk">Xác định số ngày theo dõi</el-checkbox>
          </el-row>
          <div v-if="dateChk === true">
            <el-row class="wrapper_patient-item font-size14 verticalCenter">
              <el-col :span="6">Ngày bắt đầu theo dõi:</el-col>
              <el-col :span="8">
                <el-date-picker
                  size="mini"
                  v-model="dateStarted"
                  type="date"
                  format="dd/MM/yyyy"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOption"
                ></el-date-picker>
              </el-col>
            </el-row>
            <el-row class="wrapper_patient-item font-size14">
              <p
                style="color: red; margin-bottom: .5em; margin-top: .8em;"
              >Số ngày theo dõi tối thiểu phải là 30 để HDr hoạt động hiệu quả nhất.</p>Số ngày theo dõi:
              <el-input-number
                size="mini"
                v-model="daysOfTracking"
                :min="30"
                :step="5"
              ></el-input-number>
            </el-row>
          </div>
          <div v-else-if="dateChk === false">
            <el-row class="wrapper_patient-item font-size14 verticalCenter">
              <el-col :span="6">Ngày bắt đầu theo dõi:</el-col>
              <el-col :span="8">
                <el-date-picker
                  size="mini"
                  v-model="dateStarted"
                  type="date"
                  format="dd/MM/yyyy"
                  value-format="dd-MM-yyyy"
                  disabled
                ></el-date-picker>
              </el-col>
            </el-row>
            <el-row class="wrapper_patient-item font-size14">
              Số ngày theo dõi:
              <el-input-number size="mini" v-model="daysOfTracking" disabled></el-input-number>
            </el-row>
          </div>
          <el-row class="wrapper_action">
            <el-button
              type="secondary"
              @click="rejectContract()"
              class="wrapper_action-item"
            >Từ chối</el-button>
            <el-button
              v-if="requestDetail.daysOfTracking !== undefined && dateChk === true"
              type="primary"
              @click="handleNextCreateContract()"
              class="wrapper_action-item"
            >Tiếp tục</el-button>
            <el-button v-else class="wrapper_action-item" type="primary" disabled>Tiếp tục</el-button>
            <el-dialog title="Thông báo" :visible.sync="rejectDialogVisible" width="30%">
              <span>Bạn có muốn từ chối yêu cầu không?</span>
              <br />
              <el-button type="secondary" @click="continueAssignContract()">Không</el-button>
              <el-button type="primary" @click="confirmRejectContract(contract.contractId)">Đồng ý</el-button>
            </el-dialog>
          </el-row>
        </div>
      </div>
      <div v-else-if="requestDetail.status === 'CANCELD'">
        <el-row class="wrapper_patient-item font-size14 verticalCenter">
          <el-col :span="6">Ngày bắt đầu theo dõi:</el-col>
          <el-col :span="8">
            <el-date-picker
              size="mini"
              v-model="requestDetail.dateStarted"
              type="date"
              format="dd/MM/yyyy"
              value-format="dd-MM-yyyy"
              disabled
            ></el-date-picker>
          </el-col>
        </el-row>
        <el-row class="wrapper_patient-item font-size14">
          Số ngày theo dõi:
          <el-input-number size="mini" v-model="requestDetail.daysOfTracking" disabled></el-input-number>
        </el-row>
      </div>
      <div v-else-if="requestDetail.status === 'SIGNED'">
        <el-row class="wrapper_patient-item font-size14 verticalCenter">
          <el-col :span="6">Ngày bắt đầu theo dõi:</el-col>
          <el-col :span="8">
            <el-date-picker
              size="mini"
              v-model="requestDetail.dateStarted"
              type="date"
              format="dd/MM/yyyy"
              value-format="dd-MM-yyyy"
              disabled
            ></el-date-picker>
          </el-col>
        </el-row>
        <el-row class="wrapper_patient-item font-size14">
          Số ngày theo dõi:
          <el-input-number size="mini" v-model="requestDetail.daysOfTracking" disabled></el-input-number>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { groupBy } from '../../../utils/common'

export default {
  data () {
    return {
      dateChk: false,
      checkImgs: this.$store.state.contracts.defaultCheckImgs,
      pickerOption: {
        disabledDate: this.handleDisabledDate
      },
      timeNow: this.$store.state.contracts.requestDetail.dateCreated,
      dateStarted: this.$store.state.contracts.requestDetail.dateStarted,
      daysOfTracking: this.$store.state.contracts.contractCondition.minimumDate
    }
  },
  computed: {
    imgSelected: function () {
      if (this.checkImgs.length !== 0) {
        return groupBy(
          this.checkImgs,
          'medicalInstructionTypeName',
          'medicalInstructionTypeName',
          'medicalInstructions'
        )
      } else {
        return []
      }
    },
    ...mapState('contracts', [
      'requestDetail',
      'rejectDialogVisible',
      'contract',
      'patientDetail',
      'contractImgs',
      'contractRequests',
      'contractCondition',
      'contractIdUpdate',
      'defaultCheckImgs',
      'isNextContract'
    ]),
    ...mapState('users', ['user']),
    ...mapState('slideshows', [
      'healthRecordImgs',
      'healthRecordImgIndex',
      'medicalInstructionChoose'
    ]),
    ...mapGetters('slideshows', ['getImage']),
    ...mapState('medicalInstruction', ['medicalInstructionOfNewHealthRecord'])
  },
  mounted () {
    this.getRequestDetail(`${this.$route.params.contractId}`)
    this.getContractCondition()
  },
  methods: {
    ...mapActions('image', ['showMedicalInstructionImageDetail']),
    handleNextCreateContract () {
      this.$store.dispatch('contracts/nextCreateContract', { dateStarted: this.dateStarted, daysOfTracking: this.daysOfTracking, checkImgs: this.checkImgs }, { root: true })
    },
    ...mapActions('contracts', [
      'getRequestDetail',
      'rejectContract',
      'continueAssignContract',
      'confirmRejectContract',
      'nextCreateContract',
      'getContractCondition',
      'updateMedicalInstructionToContract'
    ]),
    ...mapActions('slideshows', ['selectImg', 'openImageShow', 'showImages']),
    handleChangeDateStarted (date) {
      var now = new Date()
      const numberConditionDate = this.$store.state.contracts.contractCondition
        .distanceDate
      if (
        now.setDate(now.getDate() + numberConditionDate) >
        new Date(
          date
            .split('-')
            .reverse()
            .join('-')
        )
      ) {
        this.isValidDateStarted = false
      } else {
        this.$store.dispatch(
          'contracts/setDateStartedContract',
          new Date(
            date
              .split('-')
              .reverse()
              .join('-')
          ),
          {
            root: true
          }
        )
        this.isValidDateStarted = true
      }
    },
    handleChangeMedicalInstruction (input) {
      console.log(input)
    },
    handleChooseImg (img) {
      // this.showAllImages()
      this.showImages(img.medicalInstructions)
      var indexImgSelected = this.getImage(img.url) // Vị trí của img trong allMedicalInstructionShared
      this.$store.dispatch('slideshows/setImageInfo', indexImgSelected, {
        root: true
      })
      this.$refs.carousel.setActiveItem(indexImgSelected)
    },
    handleDisabledDate (time) {
      let date = new Date(this.requestDetail.dateCreated)
      date = date.setDate(
        date.getDate() + parseInt(this.contractCondition.distanceDate) - 1
      )
      return time < date
    },
    handleView (mi) {
      const medicalInstruction = {
        medicalInstructionId: mi.medicalInstructionId,
        medicalInstructionTypeName: mi.medicalInstructionTypeName
      }
      this.$store.dispatch(
        'appointments/viewMedicalInstruction',
        medicalInstruction,
        { root: true }
      )
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
