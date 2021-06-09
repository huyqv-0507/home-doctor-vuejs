<template>
  <el-dialog
    :visible="isRequestMedicalInstruction"
    center
    @close="closeRequestMedicalInstruction"
    width="40%"
  >
    <template slot="title">Yêu cầu cung cấp thêm Y lệnh</template>
    <div>
      <h4 style="margin-bottom: .5em;">Chọn loại Y lệnh mà bác sĩ cần bệnh nhân cung cấp</h4>
      <el-select v-model="mitSelected" size="mini">
        <el-option
          v-for="(mit, index) in medicalInstructionTypes"
          :key="`mit-${index}`"
          :value="mit.medicalInstructionTypeId"
          :label="mit.medicalInstructionTypeName"
        >{{mit.medicalInstructionTypeName}}</el-option>
      </el-select>
      <p style="margin-top: 1em; margin-bottom: .5em;">Ghi chú thêm</p>
      <el-input v-model="note" size="mini"></el-input>
    </div>
    <template slot="footer">
      <el-button
        size="mini"
        type="primary"
        @click="sendRequestMedicalInstruction({medicalInstructionTypeId: mitSelected, note: note})"
      >Gửi yêu cầu</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      mitSelected: '',
      note: ''
    }
  },
  computed: {
    ...mapState('modals', ['isRequestMedicalInstruction']),
    ...mapState('medicalInstruction', ['medicalInstructionTypes'])
  },
  methods: {
    ...mapActions('modals', ['closeRequestMedicalInstruction']),
    ...mapActions('medicalInstruction', ['getMedicalInstructionTypes']),
    sendRequestMedicalInstruction (medication) {
      this.$store
        .dispatch('patients/sendRequestMedicalInstruction', medication)
        .then(() => {
          this.note = ''
          this.mitSelected = ''
        })
    }
  },
  mounted () {
    this.getMedicalInstructionTypes()
  }
}
</script>

<style>
</style>
