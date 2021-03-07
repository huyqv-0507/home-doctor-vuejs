<template>
<header class="heading">
  <nav class="heading__nav-bar">
    <router-link to="/home" class="router-items">
    <div class="heading__nav-bar_app-name">
      <h3>HOMEDOCTOR</h3>
    </div>
    </router-link>
    <router-link to="/home" class="router-items">
    <div class="heading__nav-bar_logo">
      <img src="../../assets/icons/logo-home-doctor.png"/>
    </div>
    </router-link>
    <div class="heading__nav-bar">
      <el-row class="heading__nav-bar_items">
        <el-col>
          <img src="../../assets/icons/ic-msg-selected.png" style="margin-left: 0;"/>
        </el-col>
        <el-col>
          <img src="../../assets/icons/ic-noti-selected.png"/>
        </el-col>
        <el-col>
          <el-popover
            placement="bottom"
            title="Tải khoản"
            width="200"
            trigger="click">
            <img src="../../assets/icons/avatar-default.jpg" slot="reference" style="border-radius: 30px;"/>
            <router-link to="/account-manage">
              <el-button>Cài đặt</el-button>
            </router-link>
              <el-button>Đăng xuất</el-button>
          </el-popover>
        </el-col>
      </el-row>
    </div>
  </nav>
</header>
</template>
<script>
export default {
  name: 'HeaderDefault'
}
</script>

<style style="scss" scoped>
.heading__nav-bar {
  display: flex;
  justify-content: space-between;
}
.heading__nav-bar_logo {
  padding: .5em 1em;
  margin-left: 8%;
}
.heading__nav-bar_app-name {
  padding: .5em 1em;
}
.heading__nav-bar_app-name h3 {
    background: -webkit-linear-gradient(#64E8DE, #8A64E8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 10px;
}
.heading__nav-bar img {
  width: 30px;
  height: 30px;
}
.heading__nav-bar_items {
  display: inline-flex;
  padding: .5em 1em;
}
.heading__nav-bar_items img {
  margin-left: 5em;
}
.router-items {
  text-decoration: none;
  color: black;
}
</style>
