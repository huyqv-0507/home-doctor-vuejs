<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible="isAddMedicalInstructionForm"
    @close="handleCloseAddMedicalInstructionForm()"
    center
    width="40%"
  >
    <template slot="title">Thêm Y lệnh</template>
    <div>
      <el-form
        :model="addingMedicalInstructionForm"
        :rules="rules"
        ref="addingMedicalInstructionForm"
        label-width="120px"
      >
        <el-form-item label="Loại y lệnh" prop="medicalInstructionTypeName">
          <el-select
            v-model="addingMedicalInstructionForm.medicalInstructionTypeName"
            @change="medicalInstructionChange"
            size="mini"
            style="width: 100%;"
            placeholder="Chọn loại y lệnh"
          >
            <el-option
              :value="type.medicalInstructionTypeName"
              v-for="(type, index) in medicalInstructionTypes"
              :key="`type-${index}`"
            >{{type.medicalInstructionTypeName}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Chuẩn đoán" required prop="diagnoses">
          <el-checkbox-group v-model="addingMedicalInstructionForm.diagnoses">
            <el-checkbox
              v-for="(disease, index) in patientSelected.diseaseContract"
              :key="`disease-${index}`"
              :label="`${disease.diseaseId} - ${disease.diseaseName}`"
              name="type"
            ></el-checkbox>
          </el-checkbox-group>
          <el-link
            @click.native="openShowAddMoreDiagnoseAddingMi"
            type="primary"
            style="font-size: 10px;"
          >Chuẩn đoán khác</el-link>
          <div
            v-for="(diagnose, diagnosesAddingMiIndex) in diagnosesAddingMi"
            :key="diagnosesAddingMiIndex"
          >
            <p>{{diagnose}}</p>
            <el-button
              size="mini"
              type="danger"
              @click="removeDiagnosesToAddingMi(diagnosesAddingMiIndex)"
            >Xoá</el-button>
          </div>
        </el-form-item>
        <el-form-item label="Kết luận">
          <el-input v-model="addingMedicalInstructionForm.conclusion" type="textarea" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="Mô tả">
          <el-input v-model="addingMedicalInstructionForm.description" type="textarea" size="mini"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="margin-default">
        <el-button size="mini" type="primary" @click="ref">Chọn hình</el-button>
        <input
          style="display: none;"
          ref="fileChoose"
          type="file"
          @change="onFileChange"
          class="margin-default"
        />
        <el-progress
          v-if="isStartProgress"
          :text-inside="true"
          :stroke-width="20"
          :percentage="percent"
          class="margin-default"
        ></el-progress>
        <p class="margin-default" v-show="samePercent !== null">
          Tỉ lệ khớp:
          <strong>{{samePercent}} %</strong>
        </p>
        <div id="preview" class="margin-default">
          <img v-if="url" :src="url" style="width: 100px; height: 100px;" />
        </div>
      </el-row>
    </div>
    <div slot="footer">
      <el-button size="mini" type="primary" @click="addMedicalInstruction">Thêm</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { createWorker } from 'tesseract.js'
import nonAccentVietnamese from '../../utils/normalize.js'
export default {
  data () {
    return {
      addingMedicalInstructionForm: {
        medicalInstructionTypeName: '',
        diagnoses: [],
        conclusion: '',
        description: '',
        images: ''
      },
      rules: {
        medicalInstructionTypeName: [
          { required: true, message: 'Xin hãy chọn y lệnh', trigger: 'change' }
        ],
        diagnoses: [
          {
            type: 'array',
            required: true,
            message: 'Bác sĩ phải chọn ít nhất một bệnh',
            trigger: 'change'
          }
        ]
      },
      type: [],
      url: null,
      percent: 0,
      isStartProgress: false,
      textCompare: null,
      samePercent: null,
      isDoneProgress: false
    }
  },
  computed: {
    ...mapState('modals', ['isAddMedicalInstructionForm']),
    ...mapState('medicalInstruction', [
      'medicalInstructionTypes',
      'patientSelected'
    ]),
    ...mapGetters('medicalInstruction', ['getMedicalInstructionTypeId']),
    ...mapState('image', ['diagnosesAddingMi'])
  },
  mounted () {
    this.getMedicalInstructionTypes()
    console.log('this', this)
  },
  methods: {
    ref () {
      this.$refs.fileChoose.click()
    },
    handleCloseAddMedicalInstructionForm () {
      this.$refs.addingMedicalInstructionForm.resetFields()
      this.closeAddMedicalInstructionForm()
    },
    ...mapActions('modals', [
      'closeAddMedicalInstructionForm',
      'openShowAddMoreDiagnoseAddingMi'
    ]),
    ...mapActions('medicalInstruction', ['getMedicalInstructionTypes']),
    onFileChange (e) {
      this.isDoneProgress = false
      const file = e.target.files[0]
      this.addingMedicalInstructionForm.images = file
      this.url = URL.createObjectURL(file)

      const worker = createWorker({
        logger: m => {
          console.log(m)
          this.percent = Number.parseFloat(
            (Number.parseFloat(m.progress) * 100).toFixed(2)
          )
          this.isStartProgress = true
        }
      })

      var stringSimilarity = require('string-similarity');
      (async () => {
        await worker.load()
        await worker.loadLanguage('eng')
        await worker.initialize('eng')
        const {
          data: { text }
        } = await worker.recognize(this.url)
        var matches = stringSimilarity.findBestMatch(
          this.textCompare,
          nonAccentVietnamese(text).split('\n')
        )
        console.log('text', text)
        this.isDoneProgress = true
        this.samePercent = (
          Number.parseFloat(matches.bestMatch.rating) * 100
        ).toFixed(2)
        await worker.terminate()
      })()
    },
    medicalInstructionChange (event) {
      this.addingMedicalInstructionForm.medicalInstructionTypeId = this.getMedicalInstructionTypeId(
        event
      ).medicalInstructionTypeId
      this.textCompare = nonAccentVietnamese(event)
      console.log(this.textCompare)
    },
    diseaseChange (event) {
      this.addingMedicalInstructionForm.diseaseId = event
        .split(')')[0]
        .replace('(', '')
    },
    addMedicalInstruction () {
      console.log(this.addingMedicalInstructionForm.diagnoses, this.diagnosesAddingMi)
      const vm = this
      const diseases = this.addingMedicalInstructionForm.diagnoses.concat(this.diagnosesAddingMi)
      const params = {
        medicalInstructionTypeId: this.getMedicalInstructionTypeId(
          this.addingMedicalInstructionForm.medicalInstructionTypeName
        ).medicalInstructionTypeId,
        healthRecordId: this.patientSelected.healthRecordId,
        patientId: this.patientSelected.patientId,
        description: this.addingMedicalInstructionForm.description,
        diseaseIds: diseases.map(d => {
          return d.split('-')[0].trim()
        }),
        images: this.addingMedicalInstructionForm.images
      }
      if (this.samePercent < 70) {
        this.$confirm(
          'Bác sĩ có chắc đây là phiếu y lệnh. Xác nhận?',
          'Warning',
          {
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Huỷ',
            type: 'warning'
          }
        )
          .then(() => {
            this.$store
              .dispatch(
                'medicalInstruction/insertMedicalInstructionImage',
                params,
                { root: true }
              )
              .then(() => {
                vm.$refs.addingMedicalInstructionForm.resetFields()
              })
          })
          .catch(() => {})
      } else {
        this.$store
          .dispatch(
            'medicalInstruction/insertMedicalInstructionImage',
            params,
            { root: true }
          )
          .then(() => {
            vm.$refs.addingMedicalInstructionForm.resetFields()
          })
      }
    },
    removeDiagnosesToAddingMi (index) {
      this.$store.commit('image/removeDiagnosesToAddingMi', index, {
        root: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.margin-default {
  margin: 0.3em 0;
}
</style>
