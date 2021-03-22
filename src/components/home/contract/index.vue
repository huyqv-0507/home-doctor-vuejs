<template>
  <div class="mainContent">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
      <el-breadcrumb-item>Quản lý hợp đồng</el-breadcrumb-item>
    </el-breadcrumb>
    <h1 >Quản lý hợp đồng</h1>
    <br />
    <el-row class="tab">
      <div
        v-bind:class="{active: activeTab}"
        class="tab__item router-pointer"
        v-on:click="handleActive()"
      >
        <div :span="8" class="horizontalCenter">Đang theo dõi</div>
      </div>
      <div
        v-bind:class="{active: finishTab}"
        class="tab__item router-pointer"
        v-on:click="handleFinish()"
      >
        <div :span="8" class="horizontalCenter">Đã hết hạn</div>
      </div>
      <div
        v-bind:class="{active: rejectTab}"
        class="tab__item router-pointer"
        v-on:click="handleReject()"
      >
        <div :span="8" class="horizontalCenter">Đã từ chối</div>
      </div>
      <div
        v-bind:class="{active: pendingTab}"
        class="tab__item router-pointer"
        v-on:click="handlePending()"
      >
        <div :span="8" class="horizontalCenter">Chờ xét duyệt</div>
      </div>
      <div
        v-bind:class="{active: approvedTab}"
        class="tab__item router-pointer"
        v-on:click="handleApproved()"
      >
        <div :span="8" class="horizontalCenter">Chờ đồng ý</div>
      </div>
    </el-row>
    <router-view />
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeTab: true,
      finishTab: false,
      rejectTab: false,
      pendingTab: false,
      approvedTab: false
    }
  },
  methods: {
    handleActive () {
      this.activeTab = true
      this.finishTab = false
      this.rejectTab = false
      this.pendingTab = false
      this.approvedTab = false
      this.$router.push('/home/contracts/active-contract')
    },
    handleFinish () {
      this.activeTab = false
      this.finishTab = true
      this.rejectTab = false
      this.pendingTab = false
      this.approvedTab = false
      this.$router.push('/home/contracts/finish-contract')
    },
    handleReject () {
      this.activeTab = false
      this.finishTab = false
      this.rejectTab = true
      this.pendingTab = false
      this.approvedTab = false
      this.$router.push('/home/contracts/reject-contract')
    },
    handlePending () {
      this.activeTab = false
      this.finishTab = false
      this.rejectTab = false
      this.pendingTab = true
      this.approvedTab = false
      this.$router.push('/home/contracts/pending-contract')
    },
    handleApproved () {
      this.activeTab = false
      this.finishTab = false
      this.rejectTab = false
      this.pendingTab = false
      this.approvedTab = true
      this.$router.push('/home/contracts/approve-contract')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.tab {
  display: flex;
  justify-content: space-between;
  .tab__item {
    width: 150px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: gainsboro;
  }
}
.active {
  background-image: linear-gradient(to bottom, #64e8de, #8a64e8);
  color: white;
}
.router-pointer {
  cursor: pointer;
}
</style>
