<template>
  <div class="rightContent">
    <h4 class="titleColor">Danh sách theo dõi</h4>
    <div class="wrapper_shortcut-items">
       <el-row v-for="(activeContract, index) in activeContracts" :key="index" :gutter="20" class="wrapper_shortcut-items_item"  style="margin-left: -15px; margin-right: 5px; margin-top: .7em;">
          <el-col :span="4">
            <img style="border-radius: 30px;" src="../../assets/icons/avatar-default.jpg">
          </el-col>
          <el-col :span="20">
            <el-row><span class="wrapper_shortcut-items_item-title">{{activeContract.fullNamePatient}}</span></el-row>
            <el-row><span class="wrapper_shortcut-items_item-description">0961564432</span></el-row>
          </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('contracts', ['activeContracts'])
  },
  mounted () {
    this.getActiveContracts()
  },
  methods: {
    ...mapActions('contracts', ['getActiveContracts'])
  }
}
</script>

<style lang="scss">
@import "../../style/index.scss";
.wrapper_shortcut-items {
   margin-left: 2em;
  .wrapper_shortcut-items_item {
    background-image: linear-gradient(45deg, #F8F8FA, #EEEFF3);
    border-radius: 15px;
    height: 60px;
    margin-right: 0;
    @include center()
     img {
       width: 2em;
     }
     .wrapper_shortcut-items_item-title {
       font-size: .8em;
     }
     .wrapper_shortcut-items_item-description {
       font-size: .4em;
       color: $color-button-sub-bg;
     }
  }
}
</style>
