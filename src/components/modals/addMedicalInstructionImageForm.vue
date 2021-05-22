<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible="isAddMedicalInstructionForm"
    @close="handleCloseAddMedicalInstructionForm()"
    center
    width="30%"
  >
    <template slot="title">Thêm Y lệnh</template>
    <div>
      <el-row class="margin-default">
        <p class="margin-default">Chọn loại y lệnh</p>
        <el-select
          v-model="medicalInstructionTypeName"
          @change="medicalInstructionChange"
          size="mini"
          style="width: 100%;"
        >
          <el-option
            :value="type.medicalInstructionTypeName"
            v-for="(type, index) in medicalInstructionTypes"
            :key="`type-${index}`"
          >{{type.medicalInstructionTypeName}}</el-option>
        </el-select>
      </el-row>
      <el-row class="margin-default">
        <p class="margin-default">Chọn bệnh</p>
        <el-select v-model="disease" @change="diseaseChange" size="mini" style="width: 100%;">
          <el-option style="width: 400px;"
            :value="`(${disease.diseaseId}) ${disease.diseaseName}`"
            v-for="(disease, index) in patientSelected.diseaseContract"
            :key="`disease-${index}`"
          >({{disease.diseaseId}}) {{disease.diseaseName}}</el-option>
        </el-select>
      </el-row>
      <el-row class="margin-default">
        <p class="margin-default">Kết luận</p>
        <el-input v-model="medicalInstructionForm.conclusion" size="mini"></el-input>
      </el-row>
      <el-row>
        <p class="margin-default">Mô tả</p>
        <el-input v-model="medicalInstructionForm.description" size="mini"></el-input>
      </el-row>
      <el-row class="margin-default">
        <el-button size="mini" type="primary" @click="ref">Chọn hình</el-button>
        <input style="display: none;" ref="fileChoose" type="file" @change="onFileChange" class="margin-default" />
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
      url: null,
      percent: 0,
      isStartProgress: false,
      medicalInstructionTypeId: null,
      medicalInstructionTypeName: null,
      disease: null,
      medicalInstructionForm: {
        medicalInstructionTypeId: null,
        healthRecordId: null,
        patientId: null,
        description: null,
        conclusion: null,
        diseaseId: null,
        images: null
      },
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
    ...mapGetters('medicalInstruction', ['getMedicalInstructionTypeId'])
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
      this.closeAddMedicalInstructionForm()
    },
    ...mapActions('modals', ['closeAddMedicalInstructionForm']),
    ...mapActions('medicalInstruction', ['getMedicalInstructionTypes']),
    onFileChange (e) {
      this.isDoneProgress = false
      const file = e.target.files[0]
      this.medicalInstructionForm.images = file
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
      this.medicalInstructionForm.medicalInstructionTypeId = this.getMedicalInstructionTypeId(
        event
      ).medicalInstructionTypeId
      this.textCompare = nonAccentVietnamese(event)
      console.log(this.textCompare)
    },
    diseaseChange (event) {
      this.medicalInstructionForm.diseaseId = event
        .split(')')[0]
        .replace('(', '')
    },
    addMedicalInstruction () {
      this.medicalInstructionForm.healthRecordId = this.patientSelected.healthRecordId
      this.medicalInstructionForm.patientId = this.patientSelected.patientId
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
                this.medicalInstructionForm,
                { root: true }
              )
              .then(() => {
                this.medicalInstructionForm = {
                  medicalInstructionTypeId: null,
                  healthRecordId: null,
                  patientId: null,
                  description: null,
                  diagnose: null,
                  diseaseId: null,
                  images: null
                }
              })
          })
          .catch(() => {})
      } else {
        this.$store
          .dispatch(
            'medicalInstruction/insertMedicalInstructionImage',
            this.medicalInstructionForm,
            { root: true }
          )
          .then(() => {
            this.medicalInstructionForm = {
              medicalInstructionTypeId: null,
              healthRecordId: null,
              patientId: null,
              description: null,
              diagnose: null,
              diseaseId: null,
              images: null
            }
          })
      }
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
