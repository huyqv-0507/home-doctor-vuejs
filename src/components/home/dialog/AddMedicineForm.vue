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
            <el-input
              v-model="newMedicineForm.medicineName"
              placeholder="Nhập tên thuốc..."
              @input="searchMedicineName($event)"
              @change="leaveSearchMedicineName($event)"
            ></el-input>
            <div v-show="visibleTypeCreatePrescription" class="form__item_input-suggestion">
              <ul>
                <li
                  class="pointer"
                  v-for="item in medicineSuggestion"
                  :key="item.medicineId"
                  v-on:click="handleSelectMedicine({medicineId: item.medicineId, medicineDetail: item.medicineDetail})"
                >{{item.medicineDetail}}</li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item class="form__item">
        <el-row>
          <el-col :span="6">
            <span>Đơn vị:</span>
          </el-col>
          <el-col :span="18">
            <el-input v-model="medicine.unitType" disabled></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item class="form__item">
        <el-row>
          <el-col :span="6">
            <span>Hàm lượng:</span>
          </el-col>
          <el-col :span="18" class="form__item_suggestion">
            <el-input v-model="medicine.content" disabled></el-input>
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
                  <span>{{medicine.unitType}}.</span>
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
                  <span>{{medicine.unitType}}.</span>
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
                  <span>{{medicine.unitType}}.</span>
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
                  <span>{{medicine.unitType}}.</span>
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

            <span slot="footer"><el-row>
              <el-button
                type="primary"
                @click="addMedicineToPrescription({newMedicineForm: newMedicineForm, unit: medicine.unitType, content: medicine.content, medicineName: medicine.medicineName})"
              >Xác nhận</el-button>
            </el-row></span>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
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
    ...mapState('suggestions', [
      'medicineName',
      'medicineSuggestion',
      'visibleTypeCreatePrescription',
      'medicine',
      'medicines',
      'unitTypes',
      'contentSuggestion',
      'visibleTypeSearchContent'
    ]),
    ...mapState('modals', ['visibleAddMedicineForm'])
  },
  methods: {
    ...mapActions('modals', ['closeAddMedicine']),
    handleSelectMedicine (medicine) {
      this.newMedicineForm.medicineName = medicine.medicineDetail
      this.$store.dispatch(
        'suggestions/getMedicineByMedicineId',
        medicine.medicineId,
        { root: true }
      )
      this.$store.dispatch('suggestions/leaveSearchMedicineName', null, {
        root: true
      })
    },
    ...mapActions('suggestions', [
      'searchMedicineName',
      'leaveSearchMedicineName'
    ]),
    ...mapActions('medicalInstruction', ['addMedicineToPrescription'])
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.margin-bottom {
  margin-bottom: 0.3em;
}
</style>
