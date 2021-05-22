<template>
  <el-dialog
    :visible="isShowAddMoreDiagnoseToPrescription"
    @close="closeShowAddMoreDiagnoseToPrescription"
    center
    :close-on-click-modal="false"
  >
    <template slot="title">Chuẩn đoán khác</template>
    <el-row>
      <i style="font-size: 13px; color: grey; word-break: keep-all;">
        Hiện tại ứng dụng chỉ hỗ trợ gợi ý chuẩn đoán về bệnh tim (Bệnh hệ tuần hoàn). Bác sĩ muốn xem những bệnh khác vui lòng tra cứu danh mục
        <el-link style="color: blue;" href="http://123.31.27.68/ICD/ICD10.htm" target="_blank">ICD10</el-link>.
      </i>
      <div style="height: 1em;"></div>
      <el-autocomplete
        size="mini"
        style="width: 100%;"
        v-model="diagnose"
        :fetch-suggestions="searchDiagnose"
        placeholder="Nhập chuẩn đoán..."
        @select="handleSelectDiagnose"
        :trigger-on-focus="false"
      >
        <template slot-scope="{ item }">
          <div>{{ item.description }}</div>
        </template>
      </el-autocomplete>
    </el-row>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      diagnoses: [],
      diagnose: ''
    }
  },
  computed: {
    ...mapState('modals', ['isShowAddMoreDiagnoseToPrescription'])
  },
  mounted () {
    this.getDiagnoses().then(() => {
      this.diagnoses = this.$store.state.suggestions.diagnoses.map(diagnose => {
        return {
          description: `(${diagnose.code}) ${diagnose.description}`,
          desSearch: `(${diagnose.code}) ${diagnose.description} ${diagnose.arrCode}`
        }
      })
      console.log(this.diagnoses)
    })
  },
  methods: {
    closeShowAddMoreDiagnoseToPrescription () {
      this.diagnose = ''
      this.$store.dispatch(
        'modals/closeShowAddMoreDiagnoseToPrescription',
        null,
        { root: true }
      )
    },
    ...mapActions('suggestions', ['getDiagnoses']),
    searchDiagnose (queryString, cb) {
      var diagnoses = this.diagnoses
      var results = queryString
        ? diagnoses.filter(this.filterDiagnose(queryString))
        : diagnoses
      // call callback function to return suggestion objects
      cb(results)
    },
    filterDiagnose (queryString) {
      return diagnose => {
        return (
          diagnose.desSearch
            .toString()
            .toLowerCase()
            .indexOf(queryString.toString().toLowerCase()) > -1
        )
      }
    },
    handleSelectDiagnose (diagnose) {
      this.$store
        .dispatch('prescription/addNewDiagnoseToPrescription', diagnose, {
          root: true
        })
        .then(() => {
          this.closeShowAddMoreDiagnoseToPrescription()
        })
    }
  }
}
</script>

<style>
</style>
