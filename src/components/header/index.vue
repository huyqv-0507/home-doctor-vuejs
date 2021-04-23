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
          <img src="../../assets/icons/logo-home-doctor.png" />
        </div>
      </router-link>
      <div class="heading__nav-bar">
        <el-row class="heading__nav-bar_items horizontalCenter">
          <el-col>
            <el-badge :value="numBadgeSystem" class="badge-heading">
              <img
                v-on:click="handleShowSystemNotification()"
                src="../../assets/icons/ic-control-system.png"
                style="margin-left: 0;"
                class="icon-heading pointer"
              />
            </el-badge>
            <system-handler-notification />
          </el-col>
          <el-col>
            <el-badge :value="numBadge" class="badge-heading">
              <img
                src="../../assets/icons/ic-noti-selected.png"
                class="icon-heading pointer"
                v-on:click="handleShowNotification()"
              />
            </el-badge>
            <div v-show="isShowNotify" class="heading__nav-bar_badge">
              <h1>Thông báo</h1>
              <div v-if="notifications !== null">
                <el-row
                  style="margin: 1em 0;"
                  v-for="(notification, dateIndex) in notifications"
                  :key="`notifications-${dateIndex}`"
                >
                  <h3>{{notification.dateCreated}}</h3>
                  <div
                    v-for="(noti, index) in notification.notifications"
                    :key="`noti-${index}`"
                    style=" cursor: pointer;"
                  >
                    <div v-if="noti.status">
                      <el-row class="heading__nav-bar_badge-wrapper margin-03">
                        <el-col :span="4">
                          <img src="../../assets/icons/ic-noti-selected.png" style="margin: 0" />
                        </el-col>
                        <el-col :span="20">
                          <div
                            v-on:click="handleNotificationLink({
                              dateIndex: dateIndex,
                              notification: noti })"
                          >
                            <div slot="header">
                              <h4>{{noti.title}}</h4>
                            </div>
                            <!-- card body -->
                            <p style="color: grey;">{{noti.description}}</p>
                            <p style="color: grey; font-size: 9px; margin: .3em 0;">
                              <i>{{noti.timeAgo}}</i>
                            </p>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                    <el-row
                      v-else
                      class="heading__nav-bar_badge-wrapper unseen-notification margin-03"
                    >
                      <el-col :span="4">
                        <img src="../../assets/icons/ic-noti-selected.png" style="margin: 0" />
                      </el-col>
                      <el-col :span="20">
                        <div
                          v-on:click="handleNotificationLink({
                              dateIndex: dateIndex,
                              notification: noti })"
                        >
                          <div slot="header">
                            <h4>{{noti.title}}</h4>
                          </div>
                          <!-- card body -->
                          <p style="color: grey;">{{noti.description}}</p>
                          <p style="color: grey; font-size: 9px; margin: .3em 0;">
                            <i>{{noti.timeAgo}}</i>
                          </p>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-row>
              </div>
              <h4 v-else style="color: gray;">
                <i>Bác sĩ chưa có thông báo nào</i>
              </h4>
            </div>
          </el-col>
          <el-col>
            <img
              src="../../assets/icons/ic-msg-selected.png"
              style="margin-left: 0;"
              class="icon-heading pointer"
            />
          </el-col>
          <el-col>
            <el-popover placement="bottom" title="Tải khoản" width="200" trigger="click">
              <img
                src="../../assets/icons/avatar-default.jpg"
                slot="reference"
                style="border-radius: 30px;"
                class="icon-heading pointer"
              />
              <router-link to="/home/account-manage">
                <el-button>Cài đặt</el-button>
              </router-link>
              <el-button v-on:click="handleLogout()">Đăng xuất</el-button>
            </el-popover>
          </el-col>
        </el-row>
      </div>
    </nav>
  </header>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import SystemHandler from '../header/system-handler'
export default {
  name: 'HeaderDefault',
  components: {
    'system-handler-notification': SystemHandler
  },
  computed: {
    ...mapState('notifications', ['numBadge', 'isShowNotify', 'notifications']),
    ...mapState('systemHandler', ['numBadgeSystem'])
  },
  methods: {
    ...mapActions('notifications', [
      'handleShowNotification',
      'handleNotificationLink'
    ]),
    ...mapActions('users', ['handleLogout']),
    ...mapActions('contracts', ['checkNavigateContract']),
    ...mapActions('systemHandler', ['handleShowSystemNotification'])
    /*
    handleNotificationLink (notificationSelected) {
    } */
  }
}
</script>

<style style="scss" scoped>
.horizontalCenter {
  display: flex;
  width: 300px;
}
.heading__nav-bar {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.heading__nav-bar_badge {
  width: 300px;
  height: auto;
  overflow: auto;
  background-color: whitesmoke;
  position: absolute;
  z-index: 3000;
  top: 30px;
  right: 200px;
  padding: 1em;
  font-size: 13px;
  max-height: 400px;
  box-shadow: 0px 0px 7px -2px rgba(0, 0, 0, 0.93);
  border-radius: 8px;
}
.heading__nav-bar_badge-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 1em;
}
.heading__nav-bar_logo {
  padding: 0.5em 1em;
  margin-left: 8%;
}
.heading__nav-bar_app-name {
  padding: 0.5em 1em;
}
.heading__nav-bar_app-name h3 {
  background: -webkit-linear-gradient(#64e8de, #8a64e8);
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
  padding: 0.5em 1em;
  margin-top: 3px;
}
.heading__nav-bar_items img {
}
.router-items {
  text-decoration: none;
  color: black;
}
.icon-heading {
  width: 25px;
  height: 25px;
}
.pointer {
  cursor: pointer;
}
.unseen-notification {
  background-color: #cecece;
}
.margin-03 {
  margin: 0.3em 0;
}
</style>
