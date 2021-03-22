<template>
  <div class="rightContent">
    <el-card class="wrapper" shadow="never">
      <div class="wrapper__item">
        <div class="wrapper__item_title">Tái khám</div>
        <div class="wrapper__item_content">
          <div>Ngày tái khám: 20/03/2021</div>
          <div>Lý do: Có triệu chứng bất thường</div>
          <el-button type="primary">Tạo</el-button>
        </div>
      </div>
    </el-card>
    <el-card class="wrapper" shadow="never">
      <el-collapse>
        <el-collapse-item v-if="patientDetailUsing.conditionHealing.isConnectedBand === false" title="Thiết bị theo dõi (0/1)" name="1">
         <el-link @click="sendRequireBand()" type="danger">Gửi đề nghị kết nối thiết bị</el-link>
        </el-collapse-item>
        <el-collapse-item v-else>
          <div style="margin-left: 1em;" title="Thiết bị theo dõi (1/1)" >{{patientDetailUsing.conditionHealing.isConnectedBand}}</div></el-collapse-item>
      </el-collapse>
    </el-card>
    <el-card class="wrapper" shadow="never">
      <div class="wrapper__item">
        <div class="wrapper__item_title">Hợp đồng</div>
        <div class="wrapper__item_content">
          <div>Ngày bắt đầu: 20/03/2021</div>
          <div>Ngày kết thúc: 27/03/2021</div>
          <el-link type="primary">
            Chi tiết
            <i class="el-icon-view el-icon--right"></i>
          </el-link>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('patients', ['patientDetailUsing'])
  },
  methods: {
    ...mapActions('notifications', ['sendRequireBand'])
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.wrapper {
  margin: 1em 0;
}
</style>
