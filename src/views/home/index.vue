<template>
  <div class="wrapper">
    <base-layout>
      <template v-slot:left-content>
        <left-content />
      </template>
      <template v-slot:main-content>
        <router-view></router-view>
        <one-image-show/>
        <multiple-image-show/>
        <medical-instruction-dialog />
        <add-medicine-form />
        <edit-medicine-form />
        <patient-select-diaglog />
        <medical-instruction-patient/>
        <add-appointment-form/>
      </template>
      <template v-slot:right-content>
        <right-content />
      </template>
    </base-layout>
  </div>
</template>

<script>
import BaseLayout from '../../layouts/BaseLayout.vue'
import LeftContent from '../../components/left-content'
import RightContent from '../../components/right-content'
import { mapState, mapActions } from 'vuex'
import MedicalInstruction from '../../components/home/dialog/MedicalInstruction.vue'
import AddMedicineForm from '../../components/home/dialog/AddMedicineForm.vue'
import EditMedicineForm from '../../components/home/dialog/EditMedicineForm.vue'
import PatientSelectDialog from '../../components/home/appointment/patient-select-dialog'
import OneImageShow from '../../components/home/components/OneImageShow.vue'
import MultipleImageShow from '../../components/home/components/MultipleImageShow.vue'
import MedicalInstructionPatient from '../../components/home/dialog/MedicalInstructionPatient.vue'
import AddAppointmentForm from '../../components/home/appointment/patient-select-dialog/AddAppointmentForm.vue'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState('contracts', ['contractImgs', 'requestDetail'])
  },
  methods: {
    ...mapActions('modals', [
      'closeEditMedicine' // Đóng modal sửa thuốc
    ])
  },
  components: {
    'base-layout': BaseLayout,
    'left-content': LeftContent,
    'right-content': RightContent,
    'medical-instruction-dialog': MedicalInstruction,
    'add-medicine-form': AddMedicineForm,
    'edit-medicine-form': EditMedicineForm,
    'patient-select-diaglog': PatientSelectDialog,
    'one-image-show': OneImageShow,
    'multiple-image-show': MultipleImageShow,
    'medical-instruction-patient': MedicalInstructionPatient,
    'add-appointment-form': AddAppointmentForm
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.form {
  .form__item {
    margin-bottom: 10px;
    .form__item_use-time {
      margin-bottom: 0.5em;
    }
    .form__item_content-opt {
      margin-left: 0.5em;
    }
  }
}

.margin-all {
  margin-bottom: 2em;
  margin: 1em;
}
</style>
