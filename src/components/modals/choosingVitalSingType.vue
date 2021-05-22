<template>
  <el-dialog :visible="isOpenChoosingVitalSignType" @close="closeChoosingVitalSignType" width="30%">
    <template slot="title">Danh sách sinh hiệu</template>
    <div>
      <p style="color: gray; font-size: 12px; word-break: keep-all; margin-bottom: 1em;">
        <i>Hiện tại hệ thống của chúng thôi chỉ hỗ trợ đo nhịp tim tự động thông qua đồng hồ thông minh. Những sinh hiệu khác cần sự hỗ trợ của bệnh nhân hoặc người nhà bệnh nhân.</i>
      </p>
      <div>
        <el-checkbox-group v-model="types">
          <el-checkbox
            v-for="(type, index) in vitalSignTypes"
            :key="index"
            :label="type.vitalSignName"
            name="types"
          ></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
      <template slot="footer">
        <el-button type="primary" size="mini" @click="confirmChoosing">Xác nhận</el-button>
      </template>
  </el-dialog>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      types: []
    }
  },
  computed: {
    ...mapState('modals', ['isOpenChoosingVitalSignType']),
    ...mapState('vitalSign', ['vitalSignTypes']),
    ...mapGetters('vitalSign', ['findTypeByName'])
  },
  methods: {
    ...mapActions('modals', ['closeChoosingVitalSignType']),
    ...mapActions('vitalSign', ['getVitalSignTypes']),
    confirmChoosing () {
      const tmp = this.types.map(t => {
        return this.findTypeByName(t)
      })
      this.$store.commit('vitalSign/setChoosingType', tmp, { root: true })
      this.closeChoosingVitalSignType()
    }
  },
  mounted () {
    this.getVitalSignTypes()
  }
}
</script>

<style>
</style>
