<template>
  <el-dialog
    :visible="visibleAddMedicineForm"
    title="Thêm thuốc"
    width="30%"
    center
    @close="closeAddMedicine()"
  >
    <el-form size="mini" class="form">
      <el-form-item class="form__item">
        <el-row>
          <el-col :span="6">
            <span>
              Tên thuốc
              <span class="red">*</span>:
            </span>
          </el-col>
          <el-col :span="18" class="form__item_suggestion">
            <el-autocomplete
              style="width: 100%;"
              v-model="medicineName"
              :fetch-suggestions="searchMedicine"
              placeholder="Nhập tên thuốc..."
              @select="handleSelectMedicine"
              :trigger-on-focus="false"
              @change="handleCheckEmpty($event)"
            >
              <template slot-scope="{ item }">
                <div>{{ item.description }}</div>
              </template>
            </el-autocomplete>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item class="form__item">
        <el-row>
          <el-col :span="6">
            <span>Đơn vị:</span>
          </el-col>
          <el-col :span="18">
            <el-input v-model="unitType" disabled></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item class="form__item">
        <el-row>
          <el-col :span="6">
            <span>Hàm lượng:</span>
          </el-col>
          <el-col :span="18" class="form__item_suggestion">
            <el-input v-model="content" disabled></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <label>
        <strong>
          Cách dùng
          <span class="red">*</span>:
        </strong>
      </label>
      <el-form-item class="form__item">
        <el-row>
          <el-row class="margin-bottom">
            <el-col :span="6">
              <el-checkbox v-model="morningCheck">Sáng</el-checkbox>
            </el-col>
            <el-col :span="18">
              <el-row :gutter="20" v-show="morningCheck">
                <el-col :span="7">
                  <el-input v-model="unitMorning"></el-input>
                </el-col>
                <el-col :span="17">
                  <span>{{unitType}}.</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="margin-bottom">
            <el-col :span="6">
              <el-checkbox v-model="noonCheck">Trưa</el-checkbox>
            </el-col>
            <el-col :span="18">
              <el-row :gutter="20" v-show="noonCheck">
                <el-col :span="7">
                  <el-input v-model="unitNoon"></el-input>
                </el-col>
                <el-col :span="17">
                  <span>{{unitType}}.</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="margin-bottom">
            <el-col :span="6">
              <el-checkbox v-model="afternoonCheck">Chiều</el-checkbox>
            </el-col>
            <el-col :span="18">
              <el-row :gutter="20" v-show="afternoonCheck">
                <el-col :span="7">
                  <el-input v-model="unitAfternoon"></el-input>
                </el-col>
                <el-col :span="17">
                  <span>{{unitType}}.</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="margin-bottom">
            <el-col :span="6">
              <el-checkbox v-model="nightCheck">Tối</el-checkbox>
            </el-col>
            <el-col :span="18">
              <el-row :gutter="20" v-show="nightCheck">
                <el-col :span="7">
                  <el-input v-model="unitNight"></el-input>
                </el-col>
                <el-col :span="17">
                  <span>{{unitType}}.</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-row>
      </el-form-item>
      <el-form-item class="form__item">
        <el-row>
          <el-col :span="6">
            <span>
              Ghi chú
              <span class="red">*</span>:
            </span>
          </el-col>
          <el-col :span="18">
            <el-select
              v-model="useTimeOpt"
              placeholder="Trước bữa ăn"
              class="form__item_use-time margin-bottom"
            >
              <el-option
                v-for="item in useTimeOptions"
                :key="item.useTimeOpt"
                :label="item.label"
                :value="item.useTimeOpt"
              ></el-option>
            </el-select>
            <el-input v-model="noteMore" class="margin-bottom"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-row v-if="medicineCreated.status === 'NEW-MEDICINE'">
        <el-button type="primary" @click="addMedicineToPrescription()">Xác nhận</el-button>
      </el-row>
      <el-row v-else>
        <el-button type="primary" @click="handleUpdateMedicineToPrescription()">Xác nhận</el-button>
      </el-row>
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
export default {
  data () {
    return {
      isValid: false,
      medicines: []
    }
  },
  computed: {
    ...mapFields('medicalInstruction', [
      'medicineCreated.medicine.unitType',
      'medicineCreated.medicine.content',
      'medicineCreated.medicine.medicineName',
      'medicineCreated.medicine.unitMorning',
      'medicineCreated.medicine.unitNoon',
      'medicineCreated.medicine.unitAfternoon',
      'medicineCreated.medicine.unitNight',
      'medicineCreated.medicine.morningCheck',
      'medicineCreated.medicine.noonCheck',
      'medicineCreated.medicine.afternoonCheck',
      'medicineCreated.medicine.nightCheck',
      'medicineCreated.medicine.useTimeOpt',
      'medicineCreated.medicine.useTimeOptions',
      'medicineCreated.medicine.noteMore'
    ]),
    ...mapState('suggestions', ['visibleTypeCreatePrescription']),
    ...mapState('modals', ['visibleAddMedicineForm']),
    ...mapState('medicalInstruction', ['medicineCreated'])
  },
  mounted () {
    this.medicines = this.$store.state.suggestions.medicines.map(medicine => {
      return {
        medicineName: medicine.medicineName,
        content: medicine.content,
        unitType: medicine.unitType,
        description: `${medicine.medicineName} - ${medicine.content} - ${medicine.unitType}`
      }
    })
  },
  methods: {
    ...mapActions('modals', ['closeAddMedicine']),
    handleSelectMedicine (medicine) {
      this.medicineName = medicine.medicineName
      this.unitType = medicine.unitType
      this.content = medicine.content
      this.morningCheck = false
      this.noonCheck = false
      this.nightCheck = false
      this.afternoonCheck = false
      this.unitMorning = ''
      this.unitNoon = ''
      this.unitAfternoon = ''
      this.unitMorning = ''
      this.noteMore = ''
    },
    ...mapActions('suggestions', ['getMedicines']),
    handleUpdateMedicineToPrescription () {
      this.$store
        .dispatch(
          'medicalInstruction/updateMedicineToPrescription',
          this.useTimeOpt,
          { root: true }
        )
        .then(() => {
          this.$store.dispatch('modals/closeAddMedicine', null, { root: true })
        })
    },
    addMedicineToPrescription () {
      this.$store.dispatch('medicalInstruction/addMedicineToPrescription', this.useTimeOpt, {
        root: true
      }).then(() => {
        this.$store.dispatch('modals/closeAddMedicine', null, { root: true })
      })
    },
    searchMedicine (queryString, cb) {
      var medicines = this.medicines
      var results = queryString
        ? medicines.filter(this.filterMedicines(queryString))
        : medicines
      // call callback function to return suggestion objects
      cb(results)
    },
    filterMedicines (queryString) {
      return medicine => {
        return (
          medicine.description
            .toString()
            .toLowerCase()
            .indexOf(queryString.toString().toLowerCase()) > -1
        )
      }
    },
    handleCheckEmpty (event) {
      if (event.length >= 1) {
        this.isValid = true
      } else {
        this.isValid = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.margin-bottom {
  margin-bottom: 0.3em;
}
</style>
