<template>
  <div>
    <div>
      <el-popover
        placement="bottom"
        title="Tải khoản"
        width="200"
        trigger="click">
        <el-button slot="reference">Avatar</el-button>
        <router-link to="/account-manage">
          <el-button>Cài đặt</el-button>
        </router-link>
        <el-button>Đăng xuất</el-button>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
