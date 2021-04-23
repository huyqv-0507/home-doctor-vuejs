<template>
  <el-dialog :visible="isVisibleSelectMedicalInstruction" width="25%" title="Y lệnh" @close="closeSelectMedicalInstructionModal()" class="wrapper_shortcut-items">
        <h4>Y lệnh đầu tiên</h4>
        <div v-on:click="setAppointment()" class="pointer">
            <el-row
              :gutter="20"
              class="wrapper_shortcut-items_item"
              style="margin-left: 0; margin-right: 0;"
            >
              <el-col :span="4">
                <img src="../../../assets/icons/ic-calendar.png" class="imgbtn" />
              </el-col>
              <el-col :span="20">
                <el-row class="title">
                  <span class="wrapper_shortcut-items_item-title">Lịch hẹn <span style="color: red;">(Bắt buộc*)</span></span>
                </el-row>
                <el-row>
                  <span
                    class="wrapper_shortcut-items_item-description"
                  >Bác sĩ tạo ngày hẹn cho bệnh nhân</span>
                </el-row>
              </el-col>
            </el-row>
        </div>
        <div v-on:click="setVitalSign('HOME')" class="pointer">
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
    ...mapActions('medicalInstruction', ['setVitalSign', 'setAppointment'])
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
