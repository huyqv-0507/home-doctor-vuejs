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
        <el-row class="heading__nav-bar_items">
          <el-col>
            <img
              src="../../assets/icons/ic-msg-selected.png"
              style="margin-left: 0;"
              class="icon-heading"
            />
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
              <el-card
                style="margin: 1em 0; cursor: pointer"
                v-for="(notification, index) in notifications"
                :key="`notifications-${index}`"
                shadow="never"
              >
                <div v-on:click="goToRequestDetail(notification.contractId)">
                  <div slot="header">
                    <span>{{notification.title}}</span>
                  </div>
                  <!-- card body -->
                  <p>{{notification.description}}</p>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col>
            <el-popover placement="bottom" title="Tải khoản" width="200" trigger="click">
              <img
                src="../../assets/icons/avatar-default.jpg"
                slot="reference"
                style="border-radius: 30px;"
                class="icon-heading"
              />
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
import { mapState, mapActions } from 'vuex'
import router from '../../router'
export default {
  name: 'HeaderDefault',
  computed: {
    ...mapState('notifications', ['numBadge', 'isShowNotify', 'notifications'])
  },
  methods: {
    ...mapActions('notifications', ['handleShowNotification']),
    goToRequestDetail (contractId) {
      console.log('contractId:::', contractId)
      router.push({
        name: 'request-detail',
        params: { contractId: contractId }
      })
      this.$store.dispatch('notifications/showNotify', null, { root: true })
      this.$store.dispatch('notifications/seeNotify', null, { root: true })
    }
  }
}
</script>

<style style="scss" scoped>
.heading__nav-bar {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.heading__nav-bar_badge {
  width: 300px;
  height: auto;
  overflow: scroll;
  background-color: whitesmoke;
  position: absolute;
  z-index: 3000;
  top: 30px;
  right: 140px;
  padding: 1em;
  font-size: 13px;
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
  margin-left: 5em;
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
</style>
