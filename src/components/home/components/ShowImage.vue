<template>
  <el-dialog v-if="imgShow" :visible="isShowImage" @close="closeShowImage" center>
    <template slot="title">Hình ảnh</template>
    <div class="content">
      <img src="../../../assets/hsba/phieudientim.jpg" style="height: 500px;"/>
    </div>
    <div slot="footer">
      <span>abc</span>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('modals', ['isShowImage'])
  },
  methods: {
    ...mapActions('modals', ['closeShowImage'])
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
}
</style>
