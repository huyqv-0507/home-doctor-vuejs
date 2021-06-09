<template>
  <el-dialog
    :visible="isVisibleSelectMedicalInstructionSub"
    width="25%"
    title="Y lệnh"
    @close="closeSelectMedicalInstructionModalSub()"
    class="wrapper_shortcut-items"
  >
    <div>Số điện thoại: <strong style="font-size: 26px;">{{patientOverview.phoneNumber}}</strong></div>
    <div v-on:click="setMedicalSchedule('HOME')" class="pointer">
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
    </div>
    <div v-on:click="openNoteDanger()" class="pointer">
      <el-row
        :gutter="20"
        class="wrapper_shortcut-items_item"
        style="margin-left: 0; margin-right: 0;"
      >
        <el-col :span="4">
          <img src="../../../assets/icons/ic-health-selected.png" class="imgbtn" />
        </el-col>
        <el-col :span="20">
          <el-row class="title">
            <span class="wrapper_shortcut-items_item-title">Lời nhắn</span>
          </el-row>
          <el-row>
            <span
              class="wrapper_shortcut-items_item-description"
            >Bác sĩ tạo lời nhắn cho bệnh nhân khi bệnh nhân đang nguy hiểm.</span>
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
    ...mapState('modals', ['isVisibleSelectMedicalInstructionSub']),
    ...mapState('patients', ['patientOverview'])
  },
  methods: {
    ...mapActions('modals', ['closeSelectMedicalInstructionModalSub']),
    ...mapActions('medicalInstruction', [
      'setVitalSign',
      'setAppointment',
      'setMedicalSchedule'
    ]),
    openNoteDanger () {
      this.$prompt('Nhập lời nhắn', 'Y lệnh', {
        confirmButtonText: 'Gửi',
        cancelButtonText: 'Huỷ'
      })
        .then(({ value }) => {
          this.$store.dispatch('patients/sendNoteWhenDanger', value, { root: true })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Input canceled'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
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
