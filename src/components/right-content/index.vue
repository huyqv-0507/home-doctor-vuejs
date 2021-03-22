<template>
  <div class="rightContent">
    <h4 class="titleColor">Danh sách theo dõi</h4>
    <div class="wrapper_shortcut-items">
      <el-row
        v-for="(approvedPatient, index) in approvedPatients"
        :key="index"
        :gutter="20"
        class="wrapper_shortcut-items_item pointer"
        style="margin-left: -15px; margin-right: 5px; margin-top: .7em;"
        v-on:click.native="goToPatientDetail({
                                       patientId: approvedPatient.patientId,
                                       healthRecordId: approvedPatient.healthRecordId,
                                       contractId: approvedPatient.contractId,
                                       accountPatientId: approvedPatient.accountPatientId})"
      >
        <el-col :span="4">
          <img style="border-radius: 30px;" src="../../assets/icons/avatar-default.jpg" />
        </el-col>
        <el-col :span="20">
          <el-row>
            <span class="wrapper_shortcut-items_item-title">{{approvedPatient.patientName}}</span>
          </el-row>
          <el-row>
            <p
              v-for="(item, index) in approvedPatient.diseaseContract"
              :key="index"
              class="wrapper_shortcut-items_item-description"
            >{{item}}</p>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('patients', ['approvedPatients'])
  },
  mounted () {
    this.getPatientApproved()
  },
  methods: {
    ...mapActions('patients', ['getPatientApproved', 'goToPatientDetail'])
  }
}
</script>

<style lang="scss">
@import "../../style/index.scss";
.wrapper_shortcut-items {
  margin-left: 2em;
  .wrapper_shortcut-items_item {
    background-image: linear-gradient(45deg, #f8f8fa, #eeeff3);
    border-radius: 15px;
    height: 60px;
    margin-right: 0;
    @include center() img {
      width: 2em;
    }
    .wrapper_shortcut-items_item-title {
      font-size: 0.8em;
    }
    .wrapper_shortcut-items_item-description {
      font-size: 0.4em;
      color: $color-button-sub-bg;
    }
  }
}
</style>
