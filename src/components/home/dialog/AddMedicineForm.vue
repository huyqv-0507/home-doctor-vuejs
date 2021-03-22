<template>
  <el-dialog
    :visible="visibleAddMedicineForm"
    title="Thêm thuốc"
    width="30%"
    center
    @close="closeAddMedicine()"
  >
    <el-form ref="newMedicineForm" :model="newMedicineForm" size="mini" class="form">
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
              v-model="medicineDescription"
              :fetch-suggestions="searchMedicine"
              placeholder="Nhập tên thuốc..."
              @select="handleSelectMedicine"
              :trigger-on-focus="false" @change="handleCheckEmpty($event)"
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
              <el-checkbox v-model="newMedicineForm.morningCheck">Sáng</el-checkbox>
            </el-col>
            <el-col :span="18">
              <el-row :gutter="20" v-show="newMedicineForm.morningCheck">
                <el-col :span="7">
                  <el-input v-model="newMedicineForm.unitMorning"></el-input>
                </el-col>
                <el-col :span="17">
                  <span>{{unitType}}.</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="margin-bottom">
            <el-col :span="6">
              <el-checkbox v-model="newMedicineForm.noonCheck">Trưa</el-checkbox>
            </el-col>
            <el-col :span="18">
              <el-row :gutter="20" v-show="newMedicineForm.noonCheck">
                <el-col :span="7">
                  <el-input v-model="newMedicineForm.unitNoon"></el-input>
                </el-col>
                <el-col :span="17">
                  <span>{{unitType}}.</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="margin-bottom">
            <el-col :span="6">
              <el-checkbox v-model="newMedicineForm.afternoonCheck">Chiều</el-checkbox>
            </el-col>
            <el-col :span="18">
              <el-row :gutter="20" v-show="newMedicineForm.afternoonCheck">
                <el-col :span="7">
                  <el-input v-model="newMedicineForm.unitAfternoon"></el-input>
                </el-col>
                <el-col :span="17">
                  <span>{{unitType}}.</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="margin-bottom">
            <el-col :span="6">
              <el-checkbox v-model="newMedicineForm.nightCheck">Tối</el-checkbox>
            </el-col>
            <el-col :span="18">
              <el-row :gutter="20" v-show="newMedicineForm.nightCheck">
                <el-col :span="7">
                  <el-input v-model="newMedicineForm.unitNight"></el-input>
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
              v-model="newMedicineForm.useTimeOpt"
              placeholder="Trước bữa ăn"
              class="form__item_use-time margin-bottom"
            >
              <el-option
                v-for="item in newMedicineForm.useTimeOptions"
                :key="item.useTimeOpt"
                :label="item.label"
                :value="item.useTimeOpt"
              ></el-option>
            </el-select>
            <el-input v-model="newMedicineForm.noteMore" class="margin-bottom"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-row v-if="isValid">
        <el-button type="primary" @click="addMedicineToPrescription()">Xác nhận</el-button>
      </el-row>
      <el-row v-else>
        <el-button type="primary" disabled>Xác nhận</el-button>
      </el-row>
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      isValid: false,
      medicines: [],
      medicineDescription: '',
      unitType: '',
      content: '',
      newMedicineForm: {
        medicineName: '',
        unitMorning: '', // Số thuốc sử dụng cho sáng
        unitNoon: '', // Số thuốc sử dụng cho trưa
        unitAfternoon: '', // Số thuốc sử dụng cho chiều
        unitNight: '', // Số thuốc sử dụng cho tối
        morningCheck: false,
        noonCheck: false,
        afternoonCheck: false,
        nightCheck: false,
        useTimeOpt: '', // Thời gian sử dụng thuốc vào buổi sáng
        useTimeOptions: [
          {
            useTimeOpt: 'Trước bữa ăn',
            label: 'Trước bữa ăn'
          },
          {
            useTimeOpt: 'Sau bữa ăn',
            label: 'Sau bữa ăn'
          }
        ],
        noteMore: '' // Ghi chú thêm
      }
    }
  },
  computed: {
    ...mapState('suggestions', ['visibleTypeCreatePrescription']),
    ...mapState('modals', ['visibleAddMedicineForm'])
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
      this.medicineDescription = medicine.description
      this.newMedicineForm.medicineName = medicine.medicineName
      this.unitType = medicine.unitType
      this.content = medicine.content
    },
    ...mapActions('suggestions', ['getMedicines']),
    ...mapActions('medicalInstruction'),
    addMedicineToPrescription () {
      this.$store.dispatch(
        'medicalInstruction/addMedicineToPrescription',
        {
          newMedicineForm: this.newMedicineForm,
          unit: this.unitType,
          content: this.content,
          medicineName: this.newMedicineForm.medicineName
        },
        { root: true })
      // làm mới lại form
      this.newMedicineForm = {
        medicineName: '',
        unitMorning: '', // Số thuốc sử dụng cho sáng
        unitNoon: '', // Số thuốc sử dụng cho trưa
        unitAfternoon: '', // Số thuốc sử dụng cho chiều
        unitNight: '', // Số thuốc sử dụng cho tối
        morningCheck: false,
        noonCheck: false,
        afternoonCheck: false,
        nightCheck: false,
        useTimeOpt: '', // Thời gian sử dụng thuốc vào buổi sáng
        useTimeOptions: [
          {
            useTimeOpt: 'Trước bữa ăn',
            label: 'Trước bữa ăn'
          },
          {
            useTimeOpt: 'Sau bữa ăn',
            label: 'Sau bữa ăn'
          }
        ],
        noteMore: '' // Ghi chú thêm
      }
      this.medicineDescription = ''
      this.unitType = ''
      this.content = ''
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
