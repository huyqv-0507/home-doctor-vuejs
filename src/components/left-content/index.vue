<template>
  <div class="wrapper leftContent">
    <div class="wrapper_intro">
     <p class="wrapper_intro-weekday">{{weekDay}}</p>
     <p class="wrapper_intro-date">{{date}}</p>
     <p class="wrapper_intro-hello">Xin chào, bác sĩ {{user.fullName}}</p>
    </div>
    <div class="wrapper_shortcut">
      <h4 class="titleColor">Lối tắt</h4>
      <div class="wrapper_shortcut-items">
        <div v-on:click="openMedicalInstruction()" class="router-items pointer">
        <el-row :gutter="20" class="wrapper_shortcut-items_item"  style="margin-left: -15px; margin-right: 5px; margin-top: .7em;">
          <el-col :span="4">
            <img src="../../assets/icons/ic-medical-instruction.png"/>
          </el-col>
          <el-col :span="20">
            <el-row><span class="wrapper_shortcut-items_item-title">Y lệnh</span></el-row>
            <el-row><span class="wrapper_shortcut-items_item-description">Bác sĩ ra y lệnh cho bệnh nhân</span></el-row>
          </el-col>
        </el-row>
        </div>
        <div class="router-items pointer">
          <router-link to="/home/contracts" class="router-items pointer">
            <el-row :gutter="20" class="wrapper_shortcut-items_item"  style="margin-left: -15px; margin-right: 5px; margin-top: .7em;">
              <el-col :span="4">
                <img src="../../assets/icons/ic-contract.png"/>
              </el-col>
              <el-col :span="20">
                <el-row><span class="wrapper_shortcut-items_item-title">Hợp đồng</span></el-row>
                <el-row><span class="wrapper_shortcut-items_item-description">Quản lý tất cả hợp đồng của bác sĩ</span></el-row>
              </el-col>
            </el-row>
          </router-link>
        </div>
        <div class="router-items pointer">
          <el-row :gutter="20" class="wrapper_shortcut-items_item"  style="margin-left: -15px; margin-right: 5px; margin-top: .7em;">
            <el-col :span="4">
              <img src="../../assets/icons/ic-dashboard-selected.png"/>
            </el-col>
            <el-col :span="20">
              <el-row><span class="wrapper_shortcut-items_item-title">Phiếu khám bệnh</span></el-row>
              <el-row><span class="wrapper_shortcut-items_item-description">Tạo phiếu khám bệnh cho bệnh nhân</span></el-row>
            </el-col>
          </el-row>
        </div>
        <div class="router-items pointer">
          <el-row :gutter="20" class="wrapper_shortcut-items_item"  style="margin-left: -15px; margin-right: 5px; margin-top: .7em;">
            <el-col :span="4">
              <img src="../../assets/icons/ic-calendar.png"/>
            </el-col>
            <el-col :span="20">
              <el-row><span class="wrapper_shortcut-items_item-title">Lịch tái khám</span></el-row>
              <el-row><span class="wrapper_shortcut-items_item-description">Đặt lịch nhắc hẹn với bệnh nhân</span></el-row>
            </el-col>
          </el-row>
        </div>
        <router-link to="/home/contract-request" class="router-items pointer">
          <el-row :gutter="20" class="wrapper_shortcut-items_item" style="margin-left: -15px; margin-right: 5px; margin-top: 1em;">
            <el-col :span="4">
              <img src="../../assets/icons/ic-patient-list.png"/>
            </el-col>
            <el-col :span="20">
              <el-row><span class="wrapper_shortcut-items_item-title">Danh sách yêu cầu</span></el-row>
              <el-row><span class="wrapper_shortcut-items_item-description">Những bệnh nhân đang yêu cầu để được theo dõi</span></el-row>
            </el-col>
          </el-row>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'LeftContent',
  computed: {
    ...mapState('users', ['user']),
    ...mapState('modals', ['visibleMedicalInstruction'])
  },
  data () {
    const now = new Date()
    var weekDay = ''
    if (now.getDay() === 0) { // weekDay [0-6]
      weekDay = 'Chủ nhật'
    } else if (now.getDay() === 1) {
      weekDay = 'Thứ hai'
    } else if (now.getDay() === 2) {
      weekDay = 'Thứ ba'
    } else if (now.getDay() === 3) {
      weekDay = 'Thứ tư'
    } else if (now.getDay() === 4) {
      weekDay = 'Thứ năm'
    } else if (now.getDay() === 5) {
      weekDay = 'Thứ sáu'
    } else if (now.getDay() === 6) {
      weekDay = 'Thứ bảy'
    }
    const day = now.getDate() // day [1-31]
    const month = now.getMonth() + 1 // month [0-11]
    const year = now.getFullYear() // year

    const date = `ngày ${day} tháng ${month} năm ${year}`
    return {
      weekDay,
      date,
      isShow: false
    }
  },
  methods: {
    ...mapActions('modals', ['openMedicalInstruction', 'show'])
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/index.scss';

.wrapper_intro {
  margin-bottom: 2em;
  .wrapper_intro-weekday {
   color: gray;
   font-weight: $font-semi-bold;
  }
  .wrapper_intro-date {
    font-size: .7em;
    color: gray;
    font-weight: $font-light;
  }
  .wrapper_intro-hello {
    margin: 1em 0;
    font-weight: $font-semi-bold;
  }
}
.wrapper_shortcut-items {
   margin-left: 2em;
  .wrapper_shortcut-items_item {
    background-image: linear-gradient(45deg, #F8F8FA, #EEEFF3);
    border-radius: 15px;
    height: 60px;
    margin-right: 0;
    @include center()
     img {
       width: 2em;
     }
     .wrapper_shortcut-items_item-title {
       font-size: .8em;
     }
     .wrapper_shortcut-items_item-description {
       font-size: .4em;
       color: $color-button-sub-bg;
     }
  }
}
</style>
