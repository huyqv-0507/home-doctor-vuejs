<template>
  <div class="mainContent">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>Trang chủ</el-breadcrumb-item>
      <el-breadcrumb-item>Quản lý hợp đồng</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="bg-theme">
      <h1>Quản lý hợp đồng</h1>
      <br />
      <el-row class="tab">
        <div
          v-bind:class="{active: activeTab}"
          class="tab__item router-pointer"
          v-on:click="handleActive()"
        >
          <el-popover
            placement="top-start"
            width="200"
            trigger="hover"
            content="Danh sách hợp đồng đang được theo dõi"
          >
            <div slot="reference" :span="8" class="horizontalCenter">Đang theo dõi</div>
          </el-popover>
        </div>
        <div
          v-bind:class="{active: signTab}"
          class="tab__item router-pointer"
          v-on:click="handleSigned()"
        >
          <el-popover
            placement="top-start"
            width="200"
            trigger="hover"
            content="Danh sách hợp đồng đang chờ đến ngày được hệ thống kích hoạt."
          >
            <div slot="reference" :span="8" class="horizontalCenter">Chờ kích hoạt</div>
          </el-popover>
        </div>
        <div
          v-bind:class="{active: finishTab}"
          class="tab__item router-pointer"
          v-on:click="handleFinish()"
        >
          <el-popover
            placement="top-start"
            width="200"
            trigger="hover"
            content="Danh sách bệnh nhân đã hết hạn hợp đồng"
          >
            <div slot="reference" :span="8" class="horizontalCenter">Đã hết hạn</div>
          </el-popover>
        </div>
        <div
          v-bind:class="{active: rejectTab}"
          class="tab__item router-pointer"
          v-on:click="handleReject()"
        >
          <el-popover
            placement="top-start"
            width="200"
            trigger="hover"
            content="Danh sách hợp đồng đã bị bác sĩ từ chối"
          >
            <div slot="reference" :span="8" class="horizontalCenter">Đã từ chối</div>
          </el-popover>
        </div>
        <div
          v-bind:class="{active: pendingTab}"
          class="tab__item router-pointer"
          v-on:click="handlePending()"
        >
          <el-popover
            placement="top-start"
            width="200"
            trigger="hover"
            content="Danh sách hợp đồng đang được bác sĩ xét duyệt"
          >
            <div slot="reference" :span="8" class="horizontalCenter">Chờ xét duyệt</div>
          </el-popover>
        </div>
        <div
          v-bind:class="{active: approvedTab}"
          class="tab__item router-pointer"
          v-on:click="handleApproved()"
        >
          <el-popover
            placement="top-start"
            width="200"
            trigger="hover"
            content="Danh sách hợp đồng đang chờ được bệnh nhân xét duyệt"
          >
            <div slot="reference" :span="8" class="horizontalCenter">Chờ đồng ý</div>
          </el-popover>
        </div>
      </el-row>
      <router-view />
    </div>
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
      approvedTab: false,
      signTab: false
    }
  },
  methods: {
    handleActive () {
      this.activeTab = true
      this.finishTab = false
      this.rejectTab = false
      this.pendingTab = false
      this.approvedTab = false
      this.signTab = false
      this.$router.push('/home/contracts/active-contract')
    },
    handleFinish () {
      this.activeTab = false
      this.finishTab = true
      this.rejectTab = false
      this.pendingTab = false
      this.approvedTab = false
      this.signTab = false
      this.$router.push('/home/contracts/finish-contract')
    },
    handleReject () {
      this.activeTab = false
      this.finishTab = false
      this.rejectTab = true
      this.pendingTab = false
      this.approvedTab = false
      this.signTab = false
      this.$router.push('/home/contracts/reject-contract')
    },
    handlePending () {
      this.activeTab = false
      this.finishTab = false
      this.rejectTab = false
      this.pendingTab = true
      this.approvedTab = false
      this.signTab = false
      this.$router.push('/home/contracts/pending-contract')
    },
    handleApproved () {
      this.activeTab = false
      this.finishTab = false
      this.rejectTab = false
      this.pendingTab = false
      this.approvedTab = true
      this.signTab = false
      this.$router.push('/home/contracts/approve-contract')
    },
    handleSigned () {
      this.activeTab = false
      this.finishTab = false
      this.rejectTab = false
      this.pendingTab = false
      this.approvedTab = false
      this.signTab = true
      this.$router.push('/home/contracts/sign-contract')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.tab {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  .tab__item {
    width: 150px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: gainsboro;
    margin: 0.5em;
  }
}
.active {
  background-image: linear-gradient(to right, #64e8de, #8a64e8);
  color: white;
}
.router-pointer {
  cursor: pointer;
}
</style>
