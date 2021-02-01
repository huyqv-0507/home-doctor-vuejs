<template>
  <div class="wrapper">
    <div class="wrapper_menu">
      <h4>Danh mục</h4>
        <div class="wrapper_menu-items">
          <el-row :gutter="20" class="wrapper_menu-items_item">
            <el-col :span="4"><img src="../../assets/icons/ic-health.png"/></el-col>
            <el-col :span="20"><span>Bệnh nhân theo dõi</span></el-col>
          </el-row>
          <el-row :gutter="20" class="wrapper_menu-items_item">
            <el-col :span="4"><img src="../../assets/icons/ic-calendar.png"/></el-col>
            <el-col :span="20"><span>Lịch</span></el-col>
          </el-row>
        </div>
    </div>
    <div class="wrapper_shortcut">
      <h4>Lối tắt</h4>
      <div class="wrapper_shortcut-items">
        <router-link to="/medical-instruction" class="router-items">
        <el-row :gutter="20" class="wrapper_shortcut-items_item"  style="margin-left: -15px; margin-right: 5px; margin-top: .7em;">
          <el-col :span="4">
            <img src="../../assets/icons/ic-medicine.png"/>
          </el-col>
          <el-col :span="20">
            <el-row><span class="wrapper_shortcut-items_item-title">Y lệnh</span></el-row>
            <el-row><span class="wrapper_shortcut-items_item-description">Bác sĩ ra y lệnh cho bệnh nhân</span></el-row>
          </el-col>
        </el-row>
        </router-link>
        <el-row :gutter="20" class="wrapper_shortcut-items_item"  style="margin-left: -15px; margin-right: 5px; margin-top: .7em;">
          <el-col :span="4">
            <img src="../../assets/icons/ic-add-new.png"/>
          </el-col>
          <el-col :span="20">
            <el-row><span class="wrapper_shortcut-items_item-title">Bệnh nhân mới</span></el-row>
            <el-row><span class="wrapper_shortcut-items_item-description">Thêm bệnh nhân vào hệ thống để theo dõi bệnh lý</span></el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="wrapper_shortcut-items_item"  style="margin-left: -15px; margin-right: 5px; margin-top: .7em;">
          <el-col :span="4">
            <img src="../../assets/icons/ic-dashboard-selected.png"/>
          </el-col>
          <el-col :span="20">
            <el-row><span class="wrapper_shortcut-items_item-title">Phiếu khám bệnh</span></el-row>
            <el-row><span class="wrapper_shortcut-items_item-description">Tạo phiếu khám bệnh cho bệnh nhân</span></el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="wrapper_shortcut-items_item"  style="margin-left: -15px; margin-right: 5px; margin-top: .7em;">
          <el-col :span="4">
            <img src="../../assets/icons/ic-calendar.png"/>
          </el-col>
          <el-col :span="20">
            <el-row><span class="wrapper_shortcut-items_item-title">Lịch tái khám</span></el-row>
            <el-row><span class="wrapper_shortcut-items_item-description">Đặt lịch nhắc hẹn với bệnh nhân</span></el-row>
          </el-col>
        </el-row>
        <router-link to="/contract-request" class="router-items">
          <el-row :gutter="20" class="wrapper_shortcut-items_item" style="margin-left: -15px; margin-right: 5px; margin-top: 1em;">
            <el-col :span="4">
              <img src="../../assets/icons/ic-patient-list.png"/>
            </el-col>
            <el-col :span="20">
              <el-row><span class="wrapper_shortcut-items_item-title">Danh sách yêu cầu</span></el-row>
              <el-row><span class="wrapper_shortcut-items_item-description">Những bệnh nhân yêu cầu để được theo dõi</span></el-row>
            </el-col>
          </el-row>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftContent'
}
</script>

<style lang="scss" scoped>
@import '../../style/index.scss';
.router-items {
  text-decoration: none;
  color: black;
}
.wrapper {
  h4 {
    margin: 1em;
  }
}
.wrapper_menu-items {
  margin-left: 2em;
  .wrapper_menu-items_item {
     @include center()
     img {
       width: 2em;
     }
     span {
       font-size: .8em;
     }
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
