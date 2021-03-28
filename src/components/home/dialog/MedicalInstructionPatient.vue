<template>
  <el-dialog :visible="isVisibleSelectMedicalInstruction" width="25%" title="Y lệnh" @close="closeSelectMedicalInstructionModal()" class="wrapper_shortcut-items">
        <h4>Danh sách y lệnh</h4>
        <div v-on:click="setMedicalSchedule()">
          <router-link to="/home/medical-schedule" class="router-items">
            <el-row
              :gutter="20"
              class="wrapper_shortcut-items_item"
              style="margin-left: 0; margin-right: 0;"
            >
              <el-col :span="4">
                <img src="../../../assets/icons/ic-medicine.png" class="imgbtn" />
              </el-col>
              <el-col :span="20">
                <el-row class="title">
                  <span class="wrapper_shortcut-items_item-title">Lịch uống thuốc</span>
                </el-row>
                <el-row>
                  <span
                    class="wrapper_shortcut-items_item-description"
                  >Bác sĩ ra y lệnh sử dụng thuốc cho bệnh nhân</span>
                </el-row>
              </el-col>
            </el-row>
          </router-link>
        </div>
        <div v-on:click="setVitalSign()">
          <router-link to="/home/vital-sign" class="router-items">
            <el-row
              :gutter="20"
              class="wrapper_shortcut-items_item"
              style="margin-left: 0; margin-right: 0;"
            >
              <el-col :span="4">
                <img src="../../../assets/icons/ic-blood-pressure.png" class="imgbtn" />
              </el-col>
              <el-col :span="20">
                <el-row class="title">
                  <span class="wrapper_shortcut-items_item-title">Lịch đo sinh hiệu</span>
                </el-row>
                <el-row>
                  <span
                    class="wrapper_shortcut-items_item-description"
                  >Bác sĩ ra y lệnh đo sinh hiệu cho bệnh nhân</span>
                </el-row>
              </el-col>
            </el-row>
          </router-link>
        </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('modals', ['isVisibleSelectMedicalInstruction'])
  },
  methods: {
    ...mapActions('modals', ['closeSelectMedicalInstructionModal']),
    ...mapActions('medicalInstruction', ['setMedicalSchedule', 'setVitalSign'])
  }

}
</script>

<style lang="scss" scoped>
@import '../../../style/index.scss';
.wrapper_shortcut-items {
  overflow: scroll;
  .wrapper_shortcut-items_item {
    background-image: linear-gradient(45deg, #f8f8fa, #eeeff3);
    border-radius: 4px;
    height: 4.6875em;
    margin: 0.8em 0;
    .title {
      margin-bottom: 0.5em;
      .wrapper_shortcut-items_item-title {
        font-size: 1em;
      }
    }
    .wrapper_shortcut-items_item-description {
      font-size: 0.7em;
      color: $color-button-sub-bg;
    }
  }
}
.imgbtn {
  width: 2em;
}
</style>
