<template>
  <div class="mainContent">
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">Bệnh nhân</el-breadcrumb-item>
        <el-breadcrumb-item>Hồ sơ bệnh án</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="bg-theme">
        <div class="top-header">
          <h2>Danh mục hồ sơ</h2>
          <el-badge v-if="contractStatus !== 'FINISHED'" :value="requestMedicalInstructions.length" class="item">
            <el-button
              size="small"
              v-on:click.native="openRequestMedicalInstructionList()"
            >Y lệnh yêu cầu</el-button>
          </el-badge>
        </div>
        <el-tabs type="border-card">
          <el-tab-pane v-for="(mibt, index) in medicalInstructionsByType" :key="`mibt-${index}`">
            <span slot="label">
              <img
                v-if="mibt.medicalInstructionTypeName === 'Đơn thuốc'"
                src="../../../assets/icons/ic-medicine.png"
                style="width: 15px; margin-right: .3em;"
              />
              <img
                v-else-if="mibt.medicalInstructionTypeName === 'Sinh hiệu'"
                src="../../../assets/icons/ic-heart-rate.png"
                style="width: 15px; margin-right: .3em;"
              />
              <img
                v-else-if="mibt.medicalInstructionTypeName === 'Phiếu chụp X-Quang'"
                src="../../../assets/icons/x-ray.png"
                style="width: 15px; margin-right: .3em;"
              />
              <img
                v-else-if="mibt.medicalInstructionTypeName === 'Phiếu xét nghiệm sinh hoá máu'"
                src="../../../assets/icons/ic-oxy.png"
                style="width: 15px; margin-right: .3em;"
              />
              <img
                v-else
                src="../../../assets/icons/exam.png"
                style="width: 15px; margin-right: .3em;"
              />
              {{mibt.medicalInstructionTypeName}}
            </span>
            <el-table :data="mibt.medicalInstructions">
              <el-table-column label="STT" type="index" width="50"></el-table-column>
              <el-table-column label="Chuẩn đoán" prop="diagnose" width="350"></el-table-column>
              <el-table-column
                label="Ngày tạo"
                prop="dateCreate"
                width="200"
                :formatter="formatDate"
              ></el-table-column>
              <el-table-column label="Chi tiết" width="100">
                <template slot-scope="scope">
                  <el-button
                    type="danger"
                    size="mini"
                    @click="handleView(scope.$index, scope.row)"
                  >Xem</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('patients', [
      'requestMedicalInstructions',
      'medicalInstructionsByType', 'contractStatus'
    ])
  },
  mounted () {
    this.getRequestMedicalInstructions()
    this.getMedicalInstructionsByType()
  },
  methods: {
    ...mapActions('patients', [
      'getRequestMedicalInstructions',
      'getMedicalInstructionsByType'
    ]),
    ...mapActions('modals', ['openRequestMedicalInstructionList']),
    formatDate (row, column, cellValue, index) {
      return row.dateCreate
        .split('T')[0]
        .split('-')
        .reverse()
        .join('/')
    },
    handleView (index, row) {
      if (row.images === null) {
        const medicalInstruction = {
          medicalInstructionId: row.medicalInstructionId,
          medicalInstructionTypeName: row.medicalInstructionTypeName
        }
        this.$store.dispatch(
          'appointments/viewMedicalInstruction',
          medicalInstruction,
          { root: true }
        )
      } else {
        console.log('xem hình')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.top-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
}
.des-card {
  background-color: whitesmoke;
  border-radius: 8px;
  padding: 1em;
}
</style>