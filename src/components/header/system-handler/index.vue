<template>
  <div v-if="isShowSystemNotification" class="heading__nav-bar_badge-system">
    <h1>Hệ thống</h1>
    <div v-if="systemNotifications !== null">
      <el-row
        style="margin: 1em 0;"
        v-for="(notification, dateIndex) in systemNotifications"
        :key="`notifications-${dateIndex}`"
      >
        <h3>{{notification.dateCreated}}</h3>
        <div
          v-for="(noti, index) in notification.notifications"
          :key="`noti-${index}`"
          style=" cursor: pointer;"
        >
          <div v-if="noti.status">
            <el-row class="heading__nav-bar_badge-wrapper-system margin-03">
              <el-col :span="4">
                <img src="../../../assets/icons/ic-control-system.png" style="margin: 0" />
              </el-col>
              <el-col :span="20">
                <div
                  v-on:click="handleSystemNotificationLink({
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
            class="heading__nav-bar_badge-wrapper-system unseen-notification margin-03"
          >
            <el-col :span="4">
              <img src="../../../assets/icons/ic-control-system.png" style="margin: 0" />
            </el-col>
            <el-col :span="20">
              <div
                v-on:click="handleSystemNotificationLink({
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
    <h4 v-else style="color: gray;"><i>Bác sĩ chưa có thông báo nào</i></h4>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('systemHandler', [
      'isShowSystemNotification',
      'systemNotifications'
    ])
  },
  methods: {
    ...mapActions('systemHandler', ['handleSystemNotificationLink'])
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.heading__nav-bar_badge-system {
  width: 300px;
  height: auto;
  overflow: auto;
  background-color: whitesmoke;
  position: fixed;
  z-index: 3000;
  top: 30px;
  right: 270px;
  padding: 1em;
  font-size: 13px;
  max-height: 400px;
  box-shadow: 0px 0px 7px -2px rgba(0, 0, 0, 0.93);
  border-radius: 8px;
  img {
    width: 30px;
    height: 30px;
  }
}
.heading__nav-bar_badge-wrapper-system {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 1em;
}
.unseen-notification {
  background-color: #cecece;
}
.margin-03 {
  margin: 0.3em 0;
}
</style>
