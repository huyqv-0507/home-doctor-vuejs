<template>
  <div class="wrapper">
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>Bệnh nhân</el-breadcrumb-item>
        <el-breadcrumb-item>Hợp đồng</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="contract bg-theme">
      <el-row class="horizontalCenter">
        <b>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</b>
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
          v-for="(baseLaw, index) in contractDetailHistory.baseLaw"
          :key="`baselaw-${index}`"
        >{{baseLaw}}.</p>
        <el-row class="contract__content_today font-size14 margin-line">
          <p>Hôm nay, ngày {{contractDetailHistory.today.day}} tháng {{contractDetailHistory.today.month}} năm {{contractDetailHistory.today.year}}, chúng tôi gồm:</p>
        </el-row>
        <el-row>
          <h4>Bên A: {{contractDetailHistory.dutyAndInterest[0].name}} ({{contractDetailHistory.partyA.name}}):</h4>
        </el-row>
        <el-row class="margin-line">
          <p>Họ tên: <strong>{{contractDetailHistory.partyA.fullName}}.</strong></p>
        </el-row>
        <el-row class="margin-line">
          <p>Giới tính: <strong>{{contractDetailHistory.partyA.genderPatient}}.</strong></p>
        </el-row>
        <el-row class="margin-line">
          <p>Ngày sinh: <strong>{{contractDetailHistory.partyA.dateOfBirth}}.</strong></p>
        </el-row>
        <el-row class="margin-line">
          <p>Số điện thoại: <strong>{{contractDetailHistory.partyA.phoneNumber}}.</strong></p>
        </el-row>
        <el-row class="margin-line">
          <p>Địa chỉ: <strong>{{contractDetailHistory.partyA.address}}.</strong></p>
        </el-row>
        <el-row>
          <b>Bên B: {{contractDetailHistory.dutyAndInterest[1].name}} ({{contractDetailHistory.partyB.name}}):</b>
        </el-row>
        <el-row class="margin-line">
          <p>Họ tên: <strong>{{contractDetailHistory.partyB.fullName}}.</strong></p>
        </el-row>
        <el-row class="margin-line">
          <p>Ngày sinh: <strong>{{contractDetailHistory.partyB.dateOfBirth}}.</strong></p>
        </el-row>
        <el-row class="margin-line">
          <p>Số điện thoại: <strong>{{contractDetailHistory.partyB.phoneNumber}}.</strong></p>
        </el-row>
        <el-row class="margin-line">
          <p>Chuyên khoa: <strong>{{contractDetailHistory.partyB.specialization}}.</strong></p>
        </el-row>
        <el-row class="margin-line">
          <p>Địa chỉ làm việc: <strong>{{contractDetailHistory.partyB.workLocation}}.</strong></p>
        </el-row>
        <el-row class="margin-line">
          <p>Địa chỉ: <strong>{{contractDetailHistory.partyB.address}}.</strong></p>
        </el-row>
        <el-row>
          <p><i>{{contractDetailHistory.descriptionSum}}</i></p>
        </el-row>
        <el-row class="margin-line">
          <b>Điều 1: {{contractDetailHistory.timeAndMission.title}}:</b>
        </el-row>
        <el-row class="margin-line">
          <p class="margin-line">- Hợp đồng có hiệu lực từ ngày {{contractDetailHistory.dateStarted.split('/')[0]}} tháng {{contractDetailHistory.dateStarted.split('/')[1]}} năm {{contractDetailHistory.dateStarted.split('/')[2]}} đến ngày {{contractDetailHistory.dateFinished.split('/')[0]}} tháng {{contractDetailHistory.dateFinished.split('/')[1]}} năm {{contractDetailHistory.dateFinished.split('/')[2]}}.</p>
          <p class="margin-line">- Theo yêu cầu của bên A về việc thực hiện khám và theo dõi bệnh, bên B đám nhận và thực hiện yêu cầu bên A</p>
        </el-row>
        <el-row class="margin-line">
          <b>Điều 2: {{contractDetailHistory.workingMode.title}}:</b>
        </el-row>
        <el-row class="margin-line">
          <p>- Sử dụng HDr System để hỗ trợ khám và tư vấn cho bên A</p>
        </el-row>
        <el-row class="margin-line">
          <p class="margin-line" v-for="(des, index) in contractDetailHistory.workingMode.description" :key="`wmd${index}`">- {{des}}.</p>
        </el-row>
        <el-row class="margin-line">
          <b>Điều 3: Nghĩa vụ và quyền lợi của bên A:</b>
        </el-row>
        <el-row class="margin-line">
          <b>1. Quyển lợi</b>
        </el-row>
        <el-row class="margin-line">
          <p class="margin-line" v-for="(des, index) in contractDetailHistory.dutyAndInterest[0].duty" :key="`add${index}`">- {{des}}.</p>
        </el-row>
        <el-row class="margin-line">
          <b>1. Nghĩa vụ</b>
        </el-row>
        <el-row class="margin-line">
          <p class="margin-line" v-for="(des, index) in contractDetailHistory.dutyAndInterest[0].interest" :key="`aid${index}`">- {{des}}.</p>
        </el-row>
        <el-row class="margin-line">
          <b>Điều 3: Nghĩa vụ và quyền lợi của bên B:</b>
        </el-row>
        <el-row class="margin-line">
          <b>1. Quyển lợi</b>
        </el-row>
        <el-row class="margin-line">
          <p class="margin-line" v-for="(des, index) in contractDetailHistory.dutyAndInterest[1].duty" :key="`bdd${index}`">- {{des}}.</p>
        </el-row>
        <el-row class="margin-line">
          <b>1. Nghĩa vụ</b>
        </el-row>
        <el-row class="margin-line">
          <p class="margin-line" v-for="(des, index) in contractDetailHistory.dutyAndInterest[1].interest" :key="`bid${index}`">- {{des}}.</p>
        </el-row>
        <el-row class="margin-line">
          <b>Điều 4: {{contractDetailHistory.disputeResolution.title}}:</b>
        </el-row>
        <el-row class="margin-line">
          <p class="margin-line" v-for="(des, index) in contractDetailHistory.disputeResolution.description" :key="`tamd${index}`">- {{des}}.</p>
        </el-row>
        <el-row class="margin-line">
          <b>Điều 5: Tiền dịch vụ và phương thức thanh toán:</b>
        </el-row>
        <el-row class="margin-line">
          <p class="margin-line">- Tiền dịch vụ: <b>{{ contractDetail.priceLicense }} VNĐ</b> từ ngày {{contractDetailHistory.dateStarted.split('/')[0]}} tháng {{contractDetailHistory.dateStarted.split('/')[1]}} năm {{contractDetailHistory.dateStarted.split('/')[2]}} đến ngày {{contractDetailHistory.dateFinished.split('/')[0]}} tháng {{contractDetailHistory.dateFinished.split('/')[1]}} năm {{contractDetailHistory.dateFinished.split('/')[2]}}.</p>
          <p class="margin-line">- Phương thức thanh toán: Chuyển khoản trực tiếp vào tài khoản của HDr (Tên TK: Home Doctor Vietnam, Số TK: 123456789, Ngân hàng TP Bank)</p>
        </el-row>
        <el-row class="margin-line">
          <b>Điều 7: {{contractDetailHistory.collectiveCommitment.title}}:</b>
        </el-row>
        <el-row class="margin-line"><p class="margin-line">- Hai bên cam kết thực hiện đúng những điều khoản trong hợp đồng từ ngày {{contractDetailHistory.dateStarted.split('/')[0]}} tháng {{contractDetailHistory.dateStarted.split('/')[1]}} năm {{contractDetailHistory.dateStarted.split('/')[2]}} đến ngày {{contractDetailHistory.dateFinished.split('/')[0]}} tháng {{contractDetailHistory.dateFinished.split('/')[1]}} năm {{contractDetailHistory.dateFinished.split('/')[2]}}.</p>
          <p class="margin-line" v-for="(des, index) in contractDetailHistory.collectiveCommitment.description" :key="`tamd${index}`">- {{des}}.</p>
        </el-row>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('contracts', ['contractDetail', 'contractDetailHistory'])
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../style/index.scss';
.wrapper {
  top: 3.125em;
  position: absolute;
  left: 18.75em;
  right: 18.75em;
  overflow: auto;
  padding: 1em 1em 0 1em;
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
}
.margin-bottom2em {
  margin-bottom: 2em;
}
.margin-bottom1em {
  margin-bottom: 1em;
}
</style>
