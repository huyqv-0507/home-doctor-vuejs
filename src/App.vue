<template>
  <div id="app">
    <router-view />
    <add-medicine-form />
    <prescription />
    <vitalSign />
    <update-appointment-show />
    <add-vital-sign />
    <image-show />
    <chart />
    <request-medical-instruction />
    <request-medical-instruction-list />
    <finish-appointment />
    <medical-instruction-image-show-detail />
    <add-more-diagnose-prescription />
    <patient-select-diaglog />
    <choosing-vital-sign-type />
    <view-heart-rate-share />
  </div>
</template>
<script>
import AddMedicineForm from '../src/components/home/dialog/AddMedicineForm.vue'
import AddVitalSign from '../src/components/home/dialog/AddVitalSign.vue'
import Prescription from '../src/components/modals/prescription.vue'
import VitalSign from '../src/components/modals/vitalSign.vue'
import UpdateAppointmentShow from '../src/components/modals/appointmentUpdate'
import ImageShow from '../src/components/home/components/ImageShow.vue'
import Chart from '../src/components/modals/chart.vue'
import RequestMedicalInstruction from '../src/components/modals/requestMedicalInstruction.vue'
import RequestMedicalInstructionList from '../src/components/modals/requestMedicalInstructionLList.vue'
import FinishAppointment from '../src/components/modals/finishAppointment.vue'
import MedicalInstructionImageShowDetail from '../src/components/modals/medicalInstructionImageShowDetail'
import AddMoreDiagnosePrescription from '../src/components/modals/addMoreDiagnosePrescription'
import PatientSelectDialog from '../src/components/home/appointment/patient-select-dialog'
import ChoosingVitalSignType from '../src/components/modals/choosingVitalSingType'
import ViewHeartRateShare from '../src/components/modals/viewHeartRateShare'
export default {
  data () {
    return {
      layout: 'div'
    }
  },
  components: {
    'add-medicine-form': AddMedicineForm,
    prescription: Prescription,
    vitalSign: VitalSign,
    'update-appointment-show': UpdateAppointmentShow,
    'add-vital-sign': AddVitalSign,
    'image-show': ImageShow,
    Chart,
    'request-medical-instruction': RequestMedicalInstruction,
    'request-medical-instruction-list': RequestMedicalInstructionList,
    'finish-appointment': FinishAppointment,
    'medical-instruction-image-show-detail': MedicalInstructionImageShowDetail,
    'add-more-diagnose-prescription': AddMoreDiagnosePrescription,
    'patient-select-diaglog': PatientSelectDialog,
    'choosing-vital-sign-type': ChoosingVitalSignType,
    'view-heart-rate-share': ViewHeartRateShare
  }
}
</script>
<style lang="scss">
@import "../src/style/index.scss";
</style>
