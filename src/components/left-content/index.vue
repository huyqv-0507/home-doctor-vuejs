<template>
  <div class="wrapper leftContent">
    <div class="wrapper_intro">
     <p class="wrapper_intro-weekday">{{timeObj.weekDay}}</p>
     <p class="wrapper_intro-date">{{timeObj.date}}</p>
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
        <router-link to="/history" class="router-items pointer">
          <el-row :gutter="20" class="wrapper_shortcut-items_item"  style="margin-left: -15px; margin-right: 5px; margin-top: .7em;">
            <el-col :span="4">
              <img src="../../assets/icons/ic-dashboard-selected.png"/>
            </el-col>
            <el-col :span="20">
              <el-row><span class="wrapper_shortcut-items_item-title">Nhật ký hoạt động</span></el-row>
              <el-row><span class="wrapper_shortcut-items_item-description">Nhật ký làm việc của bác sĩ</span></el-row>
            </el-col>
          </el-row>
        </router-link>
        <router-link to="/home/appointment" class="router-items pointer">
          <el-row :gutter="20" class="wrapper_shortcut-items_item"  style="margin-left: -15px; margin-right: 5px; margin-top: .7em;">
            <el-col :span="4">
              <img src="../../assets/icons/ic-calendar.png"/>
            </el-col>
            <el-col :span="20">
              <el-row><span class="wrapper_shortcut-items_item-title">Lịch hẹn</span></el-row>
              <el-row><span class="wrapper_shortcut-items_item-description">Đặt lịch nhắc hẹn với bệnh nhân</span></el-row>
            </el-col>
          </el-row>
        </router-link>
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
    ...mapState('modals', ['visibleMedicalInstruction']),
    ...mapState('time', ['timeNow', 'timeObj'])
  },
  data () {
    return {
      isShow: false
    }
  },
  mounted () {
    this.getTimeSystem()
  },
  methods: {
    ...mapActions('modals', ['openMedicalInstruction']),
    ...mapActions('time', ['getTimeSystem'])
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
