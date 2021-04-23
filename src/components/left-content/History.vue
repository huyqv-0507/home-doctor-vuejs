<template>
  <div class="leftContent">
    <div class="history">
        <router-link to="/home" class="router-items pointer" style="margin-bottom: .5em;margin-right: 1em; font-size: 13px; color: #3ac5c9">Trở về</router-link>
        <h3 style="margin: 1em 0">Nhật ký hoạt động</h3>
      <div
        v-for="(activity, index) in activities"
        :key="`activity-${index}`"
        class="main-history pointer"
      >
        <h4>{{activity.dateCreated}}</h4>
        <div v-for="(acti, index) in activity.activities" :key="`noti-${index}`" class="wrapper__history"
        v-on:click="handleRouteHistory(acti)">
          <div class="wrapper__history_icon">
            <img v-if="acti.title === 'Y LỆNH'" src="../../assets/icons/ic_medicalinstruction.png" />
            <img v-if="acti.title === 'HỢP ĐỒNG THEO DÕI'" src="../../assets/icons/ic_contract.png" />
            <img v-if="acti.title === 'YÊU CẦU TỪ BÁC SĨ'" src="../../assets/icons/ic-request.png" />
            <img v-if="acti.title === 'CUỘC HẸN'" src="../../assets/icons/ic-appointment.png" />
          </div>
          <div class="wrapper__history_content">
            <h4 class="wrapper__history_content-title">{{acti.title}}</h4>
            <div class="wrapper__history_content-description">{{acti.body}}</div>
            <div class="wrapper__history_content-time">{{acti.timeAgo}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('users', ['activities'])
  },
  mounted () {
    this.getActivities()
  },
  methods: {
    ...mapActions('users', ['getActivities']),
    ...mapActions('historyActivities', ['handleRouteHistory'])
    // Xem thông tin chi tiết khi click
    /* handleRouteHistory (history) {
      console.log('select activities:::', history)
      if (history.contractId !== null) {
        this.$store.
      } else if (history.medicalInstructionId !== null) {
        if (history.body.includes('đơn thuốc mới')) {
          this.$store.dispatch(
            'medicalInstruction/getPrescriptionDetailHistory',
            history.medicalInstructionId,
            { root: true }
          )
        } else {
          this.$store.dispatch(
            'medicalInstruction/getMedicalInstructionHistory',
            history.medicalInstructionId,
            { root: true }
          )
        }
      }
    } */
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.history {
  max-height: 700px;
  overflow: auto;
}
.main-history {
  font-size: 13px;
}
.wrapper__history {
  margin-top: 1em;
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  .wrapper__history_icon {
    img {
      width: 30px;
    }
    margin-right: .5em;
    width: 15%;
  }
  .wrapper__history_content {
    width: 85%;
    .wrapper__history_content-title {
      margin-bottom: .3em;
    }
    .wrapper__history_content-description {
      color: grey;
    }
    .wrapper__history_content-date {
      color: gray; margin: .3em; font-size: 10px;
    }
    .wrapper__history_content-time {
      color: gray; margin: .3em; font-size: 10px;
    }
  }
}
</style>
