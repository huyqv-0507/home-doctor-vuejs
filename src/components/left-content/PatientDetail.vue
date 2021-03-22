<template>
  <div class="wrapper leftContent">
    <div class="wrapper_intro">
      <p class="wrapper_intro-weekday">{{weekDay}}</p>
      <p class="wrapper_intro-date">{{date}}</p>
    </div>
    <div class="wrapper__items">
      <div
        class="wrapper__items_item pointer"
        v-bind:class="{active: tabStatus.overview}"
        v-on:click="handleOverview"
      >
        <div class="wrapper__items_item-title">Tổng quan</div>
        <div class="wrapper__items_item-square" v-bind:class="{activeSquare: tabStatus.overview}"></div>
      </div>
      <div
        class="wrapper__items_item pointer"
        v-bind:class="{active: tabStatus.timeline}"
        v-on:click="handleTimeline"
      >
        <div class="wrapper__items_item-title">Timeline</div>
        <div class="wrapper__items_item-square" v-bind:class="{activeSquare: tabStatus.timeline}"></div>
      </div>
      <div
        class="wrapper__items_item pointer"
        v-bind:class="{active: tabStatus.vitalSign}"
        v-on:click="handleVitalSign"
      >
        <div class="wrapper__items_item-title">Sinh hiệu</div>
        <div class="wrapper__items_item-square" v-bind:class="{activeSquare: tabStatus.vitalSign}"></div>
      </div>
      <div
        class="wrapper__items_item pointer"
        v-bind:class="{active: tabStatus.healthRecord}"
        v-on:click="handleHealthRecord"
      >
        <div class="wrapper__items_item-title">Hồ sơ bệnh án</div>
        <div
          class="wrapper__items_item-square"
          v-bind:class="{activeSquare: tabStatus.healthRecord}"
        ></div>
      </div>
      <div
        class="wrapper__items_item pointer"
        v-bind:class="{active: tabStatus.activity}"
        v-on:click="handleActivity"
      >
        <div class="wrapper__items_item-title">Hoạt động</div>
        <div class="wrapper__items_item-square" v-bind:class="{activeSquare: tabStatus.activity}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import router from '../../router'
export default {
  name: 'LeftContent',
  computed: {
    ...mapState('patients', ['patientDetail'])
  },
  data () {
    const now = new Date()
    var weekDay = ''
    if (now.getDay() === 0) {
      // weekDay [0-6]
      weekDay = 'Chủ nhật'
    } else if (now.getDay() === 1) {
      weekDay = 'Thứ hai'
    } else if (now.getDay() === 2) {
      weekDay = 'Thứ ba'
    } else if (now.getDay() === 3) {
      weekDay = 'Thứ tư'
    } else if (now.getDay() === 4) {
      weekDay = 'Thứ năm'
    } else if (now.getDay() === 5) {
      weekDay = 'Thứ sáu'
    } else if (now.getDay() === 6) {
      weekDay = 'Thứ bảy'
    }
    const day = now.getDate() // day [1-31]
    const month = now.getMonth() + 1 // month [0-11]
    const year = now.getFullYear() // year

    const date = `ngày ${day} tháng ${month} năm ${year}`
    return {
      weekDay,
      date,
      isShow: false,
      tabStatus: {
        overview: true,
        timeline: false,
        vitalSign: false,
        healthRecord: false,
        activity: false
      }
    }
  },
  methods: {
    handleOverview () {
      this.tabStatus.overview = true
      this.tabStatus.timeline = false
      this.tabStatus.vitalSign = false
      this.tabStatus.healthRecord = false
      this.tabStatus.activity = false
      router.push('/patient-detail-page/overview')
    },
    handleTimeline () {
      this.tabStatus.overview = false
      this.tabStatus.timeline = true
      this.tabStatus.vitalSign = false
      this.tabStatus.healthRecord = false
      this.tabStatus.activity = false
      router.push('/patient-detail-page/timeline')
    },
    handleVitalSign () {
      this.tabStatus.overview = false
      this.tabStatus.timeline = false
      this.tabStatus.vitalSign = true
      this.tabStatus.healthRecord = false
      this.tabStatus.activity = false
      router.push('/patient-detail-page/vital-sign')
    },
    handleHealthRecord () {
      this.tabStatus.overview = false
      this.tabStatus.timeline = false
      this.tabStatus.vitalSign = false
      this.tabStatus.healthRecord = true
      this.tabStatus.activity = false
      router.push('/patient-detail-page/health-record')
    },
    handleActivity () {
      this.tabStatus.overview = false
      this.tabStatus.timeline = false
      this.tabStatus.vitalSign = false
      this.tabStatus.healthRecord = false
      this.tabStatus.activity = true
      router.push('/patient-detail-page/activity')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";

.wrapper_intro {
  margin-bottom: 2em;
  .wrapper_intro-weekday {
    color: gray;
    font-weight: $font-semi-bold;
  }
  .wrapper_intro-date {
    font-size: 0.7em;
    color: gray;
    font-weight: $font-light;
  }
  .wrapper_intro-hello {
    margin: 1em 0;
    font-weight: $font-semi-bold;
  }
}
.active {
  color: #3ac5c9;
}
.wrapper__items {
  margin-top: 5em;
  .wrapper__items_item {
    display: flex;
    justify-content: flex-end;
    margin: 2em 0;
    .wrapper__items_item-title {
    }
    .wrapper__items_item-square {
      width: 5px;
      margin: 0 0.5em;
    }
  }
}
.activeSquare {
  background-color: #3ac5c9;
}
</style>
