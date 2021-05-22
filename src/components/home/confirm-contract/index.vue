<template>
  <div class="mainContent">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>Danh sách yêu cầu</el-breadcrumb-item>
      <el-breadcrumb-item>Thông tin bệnh nhân</el-breadcrumb-item>
      <el-breadcrumb-item>Xác nhận hợp đồng</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="contract bg-theme">
      <el-row class="horizontalCenter">
        <b>CÔNG HOÀ XÃ HÔI CHỦ NGHĨA VIỆT NAM</b>
      </el-row>
      <el-row class="horizontalCenter margin-line margin-bottom2em">
        <u>Độc lập - Tự do - Hạnh phúc</u>
      </el-row>
      <el-row>
        <el-col :span="24" class="contract__title" style="display: flex; justify-content: center;">
          <h1>HỢP ĐỒNG KHÁM BỆNH CHỮA BỆNH</h1>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="contract__content font-size14">
        <p
          class="margin-line"
          v-for="(baseLaw, index) in contractSample.baseLaw"
          :key="`baselaw-${index}`"
        >{{baseLaw}}.</p>
        <el-row>
          <h4>Bên A: {{contractSample.dutyAndInterest[0].name}} ({{contractSample.partyA.name}}):</h4>
        </el-row>
        <el-row class="margin-line">
          <p>
            Họ tên:
            <strong>{{contractSample.partyA.fullName}}.</strong>
          </p>
        </el-row>
        <el-row class="margin-line">
          <p>
            Giới tính:
            <strong>{{contractSample.partyA.gender}}.</strong>
          </p>
        </el-row>
        <el-row class="margin-line">
          <p>
            Ngày sinh:
            <strong>{{contractSample.partyA.dateOfBirth.split('-').reverse().join('/')}}.</strong>
          </p>
        </el-row>
        <el-row class="margin-line">
          <p>
            Số điện thoại:
            <strong>{{contractSample.partyA.phoneNumber}}.</strong>
          </p>
        </el-row>
        <el-row class="margin-line">
          <p>
            Địa chỉ:
            <strong>{{contractSample.partyA.address}}.</strong>
          </p>
        </el-row>
        <el-row>
          <b>Bên B: {{contractSample.dutyAndInterest[1].name}} ({{contractSample.partyB.name}}):</b>
        </el-row>
        <el-row class="margin-line">
          <p>
            Họ tên:
            <strong>{{contractSample.partyB.fullName}}.</strong>
          </p>
        </el-row>
        <el-row class="margin-line">
          <p>
            Ngày sinh:
            <strong>{{contractSample.partyB.dateOfBirth}}.</strong>
          </p>
        </el-row>
        <el-row class="margin-line">
          <p>
            Số điện thoại:
            <strong>{{contractSample.partyB.phoneNumber}}.</strong>
          </p>
        </el-row>
        <el-row class="margin-line">
          <p>
            Chuyên khoa:
            <strong>{{contractSample.partyB.specialization}}.</strong>
          </p>
        </el-row>
        <el-row class="margin-line">
          <p>
            Địa chỉ làm việc:
            <strong>{{contractSample.partyB.workLocation}}.</strong>
          </p>
        </el-row>
        <el-row class="margin-line">
          <p>
            Địa chỉ:
            <strong>{{contractSample.partyB.address}}.</strong>
          </p>
        </el-row>
        <el-row>
          <p>
            <i>{{contractSample.descriptionSum}}:</i>
          </p>
        </el-row>
        <el-row class="margin-line">
          <b>Điều 1: {{contractSample.timeAndMission.title}}:</b>
        </el-row>
        <el-row class="margin-line">
          <p>- Hợp đồng có hiệu lực từ ngày {{contractSample.dateStarted.split('-')[2]}} tháng {{contractSample.dateStarted.split('-')[1]}} năm {{contractSample.dateStarted.split('-')[0]}} đến ngày {{contractSample.dateContractFinished.day}} tháng {{contractSample.dateContractFinished.month}} năm {{contractSample.dateContractFinished.year}}.</p>
          <p>- Theo yêu cầu của bên A về việc thực hiện khám và theo dõi bệnh, bên B đảm nhận và thực hiện yêu cầu bên A</p>
        </el-row>
        <el-row class="margin-line">
          <p
            class="margin-line"
            v-for="(des, index) in contractSample.timeAndMission.description"
            :key="`tamd${index}`"
          >- {{des}}.</p>
        </el-row>
        <el-row class="margin-line">
          <b>Điều 2: {{contractSample.workingMode.title}}:</b>
        </el-row>
        <el-row class="margin-line">
          <p>- Sử dụng HDr System để hỗ trợ khám và tư vấn cho bên A</p>
        </el-row>
        <el-row class="margin-line">
          <p
            class="margin-line"
            v-for="(des, index) in contractSample.workingMode.description"
            :key="`wmd${index}`"
          >- {{des}}.</p>
        </el-row>
        <el-row class="margin-line">
          <b>Điều 3: Nghĩa vụ và quyền lợi của bên A:</b>
        </el-row>
        <el-row class="margin-line">
          <b>1. Quyển lợi</b>
        </el-row>
        <el-row class="margin-line">
          <p
            class="margin-line"
            v-for="(des, index) in contractSample.dutyAndInterest[0].duty"
            :key="`add${index}`"
          >- {{des}}.</p>
        </el-row>
        <el-row class="margin-line">
          <b>2. Nghĩa vụ</b>
        </el-row>
        <el-row class="margin-line">
          <p
            class="margin-line"
            v-for="(des, index) in contractSample.dutyAndInterest[0].interest"
            :key="`aid${index}`"
          >- {{des}}.</p>
        </el-row>
        <el-row class="margin-line">
          <b>Điều 4: Nghĩa vụ và quyền lợi của bên B:</b>
        </el-row>
        <el-row class="margin-line">
          <b>1. Quyển lợi</b>
        </el-row>
        <el-row class="margin-line">
          <p
            class="margin-line"
            v-for="(des, index) in contractSample.dutyAndInterest[1].duty"
            :key="`bdd${index}`"
          >- {{des}}.</p>
        </el-row>
        <el-row class="margin-line">
          <b>2. Nghĩa vụ</b>
        </el-row>
        <el-row class="margin-line">
          <p
            class="margin-line"
            v-for="(des, index) in contractSample.dutyAndInterest[1].interest"
            :key="`bid${index}`"
          >- {{des}}.</p>
        </el-row>
        <el-row class="margin-line">
          <b>Điều 5: {{contractSample.disputeResolution.title}}:</b>
        </el-row>
        <el-row class="margin-line">
          <p
            class="margin-line"
            v-for="(des, index) in contractSample.disputeResolution.description"
            :key="`tamd${index}`"
          >- {{des}}.</p>
        </el-row>
        <el-row class="margin-line">
          <b>Điều 6: Tiền dịch vụ và phương thức thanh toán:</b>
        </el-row>
        <el-row class="margin-line">
          <p>
            - Tiền dịch vụ:
            <b>{{ contractSample.price }} VNĐ</b>
            từ ngày {{contractSample.dateStarted.split('-')[2]}} tháng {{contractSample.dateStarted.split('-')[1]}} năm {{contractSample.dateStarted.split('-')[0]}} đến ngày {{contractSample.dateContractFinished.day}} tháng {{contractSample.dateContractFinished.month}} năm {{contractSample.dateContractFinished.year}}
          </p>
          <p>- Phương thức thanh toán: Thanh toán trực tiếp vào tài khoản của Home Doctor thông qua VNPAY</p>
        </el-row>
        <el-row class="margin-line">
          <b>Điều 7: {{contractSample.collectiveCommitment.title}}:</b>
        </el-row>
        <el-row class="margin-line">
          <p
            class="margin-line"
          >- Hai bên cam kết thực hiện đúng những điều khoản trong hợp đồng từ ngày {{contractSample.dateStarted.split('-')[2]}} tháng {{contractSample.dateStarted.split('-')[1]}} năm {{contractSample.dateStarted.split('-')[0]}} đến ngày {{contractSample.dateContractFinished.day}} tháng {{contractSample.dateContractFinished.month}} năm {{contractSample.dateContractFinished.year}}.</p>
          <p
            class="margin-line"
            v-for="(des, index) in contractSample.collectiveCommitment.description"
            :key="`tamd${index}`"
          >- {{des}}.</p>
        </el-row>
      </el-row>
      <el-row class="margin-line">
        <el-checkbox v-model="confirmRule">
          <strong>Đồng ý với các điều khoản trên.</strong>
        </el-checkbox>
      </el-row>
      <el-row class="handle-event">
        <el-button
          class="handle-event__button"
          type="secondary"
          @click="backToRequestDetailContract()"
        >Trở lại</el-button>
        <el-button
          v-if="confirmRule"
          class="handle-event__button"
          type="primary"
          @click="handleConfirmContract(contract)"
        >Xác nhận</el-button>
        <el-button v-else class="handle-event__button" type="primary" disabled>Xác nhận</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      confirmRule: false
    }
  },
  computed: {
    ...mapState('contracts', [
      'requestDetail',
      'contractRequests',
      'contractCode',
      'cancelContractVisible',
      'contract',
      'patientDetail',
      'contractSample',
      'license'
    ]),
    ...mapState('users', ['user'])
  },
  mounted () {
  },
  methods: {
    ...mapActions('contracts', [
      'backToRequestDetailContract',
      'confirmContract',
      'getContractSample'
    ]),
    handleConfirmContract (contract) {
      this.$confirm('Sau khi xác nhận, bác sĩ phải cam kết thực hiện những gì đã mô tả trong hợp đồng. Bác sĩ có thể chọn lại y lệnh trước khi hợp đồng được xác nhận bởi bệnh nhân. Tiếp tục?', 'Thông báo', {
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Huỷ',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('contracts/confirmContract', contract, {
            root: true
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.handle-event {
  display: flex;
  justify-content: center;
  align-items: center;
  .handle-event__button {
    margin: 0 40px;
  }
}
.contract {
  padding: 2em 1.5em;
  .contract__today {
    display: flex;
    justify-content: flex-end;
    color: grey;
    margin-bottom: 0.5em;
  }
  .contract__title {
    margin-bottom: 2em;
  }
  .contract__content {
    .contract__content_social-legal {
      margin-bottom: 0.8em;
    }
    .contract__content_medical-exam-and-treatment-law {
      margin-bottom: 0.5em;
    }
    .contract__content_decree {
      margin-bottom: 0.8em;
    }
    .contract__content_circular {
      margin-bottom: 1em;
    }
    .contract__content_today {
      margin: 1em 0;
    }
  }
}
.margin-line {
  margin: 0.8em 0;
  line-height: 1.8;
}
.margin-bottom2em {
  margin-bottom: 2em;
}
.margin-bottom1em {
  margin-bottom: 1em;
}
</style>
