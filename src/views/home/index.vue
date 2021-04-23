<template>
  <div class="wrapper">
    <base-layout>
      <template v-slot:left-content>
        <left-content />
      </template>
      <template v-slot:main-content>
        <router-view></router-view>
        <multiple-image-show/>
        <medical-instruction-dialog />
        <edit-medicine-form />
        <patient-select-diaglog />
        <medical-instruction-patient/>
        <add-appointment-form/>
        <medical-instruction-patien/>
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
import { mapActions } from 'vuex'
import MedicalInstruction from '../../components/home/dialog/MedicalInstruction.vue'
import EditMedicineForm from '../../components/home/dialog/EditMedicineForm.vue'
import PatientSelectDialog from '../../components/home/appointment/patient-select-dialog'
import MultipleImageShow from '../../components/home/components/MultipleImageShow.vue'
import MedicalInstructionPatient from '../../components/home/dialog/MedicalInstructionPatient.vue'
import MedicalInstructionPatien from '../../components/home/dialog/MedicalInstructionPatien.vue'
import AddAppointmentForm from '../../components/home/appointment/patient-select-dialog/AddAppointmentForm.vue'
export default {
  mounted () {
    this.initState()
  },
  methods: {
    ...mapActions('systemHandler', ['initState'])
  },
  components: {
    'base-layout': BaseLayout,
    'left-content': LeftContent,
    'right-content': RightContent,
    'medical-instruction-dialog': MedicalInstruction,
    'edit-medicine-form': EditMedicineForm,
    'patient-select-diaglog': PatientSelectDialog,
    'multiple-image-show': MultipleImageShow,
    'medical-instruction-patient': MedicalInstructionPatient,
    'medical-instruction-patien': MedicalInstructionPatien,
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
