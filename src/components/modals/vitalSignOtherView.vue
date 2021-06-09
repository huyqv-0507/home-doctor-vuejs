<template>
  <el-dialog :visible="isVitalSignOtherView" @close="setVitalSignOtherView" center>
    <template slot="title">Chi tiết</template>
    <div>
        <div v-if="isVitalSign === 2"><strong>Huyết áp</strong></div>
        <div v-if="isVitalSign === 3"><strong>Cholesterol</strong></div>
        <div v-if="isVitalSign === 4"><strong>Nhiệt độ</strong></div>
      <div style="margin-top: 1em;" v-for="(vs, index) in vitalSignValue.vitalSignValues" :key="index">
        <div v-if="vs.vitalSignTypeId === isVitalSign">
          {{vs}}
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('modals', ['isVitalSignOtherView']),
    ...mapState('vitalSign', ['vitalSignValue', 'isVitalSign'])
  },
  methods: {
    setVitalSignOtherView () {
      this.$store.commit('modals/setVitalSignOtherView', false, { root: true })
    }
  }
}
</script>

<style>

</style>
