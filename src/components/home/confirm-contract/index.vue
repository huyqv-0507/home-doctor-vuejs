<template>
  <div>
    <el-breadcrumb separator="/" style="font-size: 10px">
       <el-breadcrumb-item :to="{ path: '/' }">Danh sách yêu cầu</el-breadcrumb-item>
       <el-breadcrumb-item>Thông tin bệnh nhân</el-breadcrumb-item>
       <el-breadcrumb-item>Xác nhận hợp đồng</el-breadcrumb-item>
    </el-breadcrumb><br/><br/>
    <el-row>
      <el-col :span="12"><h1>HỢP ĐỒNG KHÁM BỆNH CHỮA BỆNH</h1></el-col>
      <el-col :span="12"><el-button type="dark">Xuất thành PDF</el-button></el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
          <p>Mã hợp đồng: <strong>{{contractCode}}</strong></p>
          <p>Bác sĩ: <strong>{{user.fullName}}</strong></p>
          <p>Ngày bắt đầu theo dõi:</p>
          <p><strong>{{requestDetail.dateStarted}}</strong></p>
      </el-col>
      <el-col :span="12">
          <p>Công tác tại: <strong>{{user.workLocation}}</strong></p>
          <p>Số năm kinh nghiệm: <strong>{{user.experienceYear}}</strong></p>
          <p>Ngày kết thúc theo dõi:</p>
          <p><strong>{{requestDetail.dateFinished}}</strong></p>
      </el-col>
    </el-row>
    <el-row>
      <h3>I. HÀNH CHÍNH</h3>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
          <p>Họ tên: <strong>{{requestDetail.fullName}}</strong></p>
          <p>Giới tính: <strong>{{requestDetail.gender}}</strong></p>
          <p>Ngày sinh: <strong>{{requestDetail.dateOfBirth}}</strong></p>
          <p>Địa chỉ<strong>{{requestDetail.address}}</strong></p>
          <p>Họ tên người nhà<strong>{{requestDetail.relativeName}}</strong></p>
      </el-col>
      <el-col :span="12">
          <p>Tuổi: <strong>{{requestDetail.dateOfBirth}}</strong></p>
          <p>Nghề nghiệp: <strong>{{requestDetail.career}}</strong></p>
          <p>Số điện thoại: <strong>{{requestDetail.phoneNumber}}</strong></p>
          <p></p>
          <p>Số điện thoại người nhà: <strong>{{requestDetail.relativePhoneNumber}}</strong></p>
      </el-col>
    </el-row>
    <el-row>
      <h3>II. Lý do theo dõi</h3>
    </el-row>
    <el-row :gutter="10">
      <el-row>Loại bệnh</el-row>
    <el-row>
      <el-select v-model="value" placeholder="Chọn bệnh">
        <el-option
          v-for="item in diseaseOptions"
          :key="item.name"
          :label="item.value"
          :value="item.name">
        </el-option>
      </el-select>
    </el-row>
    <el-row>
      <p>Ghi chú</p>
        <el-input type="textarea" :rows="5" v-model="txtNote"></el-input>
    </el-row>
    </el-row>
    <el-row>
      <h3>III. Cam kết</h3>
      <h5>1. Quyền và trách nhiệm bên bác sĩ</h5>
      <h5>2. Quyền và trách nhiệm bên người bệnh</h5>
      <h5>3. Cam kết chung</h5>
      <p>- Hai bên cam kết thực hiện đúng các quy định về pháp luật và những điều khoản có trong hợp đồng.</p>
      <p>- Trong trường hợp thay đổi hoặc chấm dứt hợp đồng trước thời hạn, hai bên phải thông báo cho nhau trước một tháng để đảm bảo quyền lợi cho hai bên</p>
      <p>- Hai bên thống nhất phối hợp và sử dụng ứng dụng HDr để thuận tiện cho việc theo dõi bệnh.</p>
    </el-row>
    <el-row>
      <el-col :span="12" ><el-button type="info" @click="cancelContract()">Huỷ hợp đồng</el-button></el-col>
        <el-dialog title="Thông báo" :visible.sync="cancelContractVisible" width="30%">
          <span>Bác sĩ có muốn huỷ hợp đồng không?</span><br/>
          <el-button type="info" @click="rejectCancelContract()">Không</el-button>
          <el-button type="info" @click="confirmCancelContract()">Đồng ý</el-button>
        </el-dialog>
      <el-col :span="12" ><el-button type="info" @click="confirmContract([contract, value])">Xác nhận</el-button></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      diseaseOptions: [
        {
          name: 'nhoimaucotim',
          value: 'Nhồi máu cơ tim'
        },
        {
          name: 'suytim',
          value: 'Suy tim'
        }
      ],
      value: '',
      txtNote: ''
    }
  },
  computed: {
    ...mapState('contracts', ['requestDetail', 'contractRequests', 'contractCode', 'cancelContractVisible', 'contract']),
    ...mapState('users', ['user'])
  },
  methods: {
    ...mapActions('contracts', [
      'cancelContract',
      'rejectCancelContract',
      'confirmCancelContract',
      'confirmContract'
    ])
  }
}
</script>

<style>

</style>
