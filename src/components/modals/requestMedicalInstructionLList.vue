<template>
  <el-dialog
    :visible="isRequestMedicalInstructionList"
    @close="closeRequestMedicalInstructionList"
    center
  >
    <template slot="title">Danh sách y lệnh</template>
    <div v-if="requestMedicalInstructions.length === 0">
      <i style="color: grey;">Bệnh nhân chưa cung cấp phiếu y lệnh mới nào</i>
    </div>
    <div v-else>
      <el-collapse accordion>
        <el-collapse-item
          v-for="(medicalInstruction, indexMi) in requestMedicalInstructions"
          :key="`medicalInstruction-${indexMi}`"
        >
          <template slot="title"><h3>{{medicalInstruction.medicalInstructionTypeName}}</h3></template>

          <div v-if="medicalInstruction.images === null">
            <div v-if="medicalInstruction.medicalInstructionTypeName === 'Đơn thuốc'">
              <img src="../../assets/icons/ic-medicine.png" style="width: 30px; margin: 0 1em;" />
              <div>
                <el-link
                  size="mini"
                  type="primary"
                  v-on:click="handleView({
                       medicalInstructionId: medicalInstruction.medicalInstructionId,
                       medicalInstructionTypeName: medicalInstruction.medicalInstructionTypeName})"
                >Đơn thuốc {{indexMi + 1}}</el-link>
              </div>
            </div>
            <div v-else-if="medicalInstruction.medicalInstructionTypeName === 'Sinh hiệu'">
              <img src="../../assets/icons/ic-medicine.png" style="width: 30px; margin: 0 1em;" />
              <div>
                <el-link
                  size="mini"
                  type="primary"
                  v-on:click="handleView({
                       medicalInstructionId: medicalInstruction.medicalInstructionId,
                       medicalInstructionTypeName: medicalInstruction.medicalInstructionTypeName})"
                >Đơn thuốc {{indexMi + 1}}</el-link>
              </div>
            </div>
          </div>
          <div v-else>
            <div v-for="(image, indexI) in medicalInstruction.images" :key="`image-${indexI}`">
              <img
                :src="image"
                style="width: 150px;"
                v-on:click="getMedicalInstructionImageInfo(medicalInstruction.medicalInstructionId)"
              />
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('modals', ['isRequestMedicalInstructionList']),
    ...mapState('patients', ['requestMedicalInstructions'])
  },
  mounted () {
    this.getRequestMedicalInstructions()
  },
  methods: {
    ...mapActions('modals', ['closeRequestMedicalInstructionList']),
    ...mapActions('patients', ['getRequestMedicalInstructions']),
    getMedicalInstructionImageInfo (medicalInstructionId) {
      this.$store.dispatch('slideshows/openImageRequestShow', null, {
        root: true
      })
      this.$store.dispatch(
        'slideshows/getMedicalInstructionImageInfo',
        medicalInstructionId,
        { root: true }
      )
    },
    handleView (mi) {
      const medicalInstruction = {
        medicalInstructionId: mi.medicalInstructionId,
        medicalInstructionTypeName: mi.medicalInstructionTypeName
      }
      this.$store.dispatch(
        'appointments/viewMedicalInstruction',
        medicalInstruction,
        { root: true }
      )
    }
  }
}
</script>

<style>
</style>
