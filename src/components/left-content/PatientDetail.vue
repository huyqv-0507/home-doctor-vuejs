<template>
  <div class="wrapper leftContent">
    <div class="wrapper_intro">
      <p class="wrapper_intro-weekday">{{timeObj.weekDay}}</p>
      <p class="wrapper_intro-date">{{timeObj.date}}</p>
    </div>
    <div class="wrapper__items">
      <div
        class="wrapper__items_item pointer"
        v-bind:class="{active: tabStatus.overview}"
        v-on:click="setTabActive({ name: 'overview'})"
      >
        <div class="wrapper__items_item-title">Tổng quan</div>
        <div class="wrapper__items_item-square" v-bind:class="{activeSquare: tabStatus.overview}"></div>
      </div>
      <div
        class="wrapper__items_item pointer"
        v-bind:class="{active: tabStatus.timeline}"
        v-on:click="setTabActive({ name: 'timeline'})"
      >
        <div class="wrapper__items_item-title">Timeline</div>
        <div class="wrapper__items_item-square" v-bind:class="{activeSquare: tabStatus.timeline}"></div>
      </div>
      <div
        class="wrapper__items_item pointer"
        v-bind:class="{active: tabStatus.vitalSign}"
        v-on:click="setTabActive({ name: 'vital-sign'})"
      >
        <div class="wrapper__items_item-title">Sinh hiệu</div>
        <div class="wrapper__items_item-square" v-bind:class="{activeSquare: tabStatus.vitalSign}"></div>
      </div>
      <div
        class="wrapper__items_item pointer"
        v-bind:class="{active: tabStatus.healthRecord}"
        v-on:click="setTabActive({ name: 'health-record'})"
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
        v-on:click="setTabActive({ name: 'activity'})"
      >
        <div class="wrapper__items_item-square" v-bind:class="{activeSquare: tabStatus.activity}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'LeftContent',
  computed: {
    ...mapState('patients', ['patientDetail']),
    ...mapState('tabs', ['tabStatus']),
    ...mapState('time', ['timeObj'])
  },
  data () {
    return {
      isShow: false
    }
  },
  mounted () {
    this.setDefaultTab()
    this.getTimeSystem()
  },
  methods: {
    ...mapActions('tabs', ['setDefaultTab', 'setTabActive']),
    ...mapActions('time', ['getTimeSystem'])
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
