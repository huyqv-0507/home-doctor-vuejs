<template>
  <base-layout>
    <template v-slot:left-content>
      <left-content />
    </template>
    <template v-slot:main-content>
      <router-view/>
      <add-appointment-form-patient-detail/>
        <image-show-request/>
    </template>
    <template v-slot:right-content>
      <right-content />
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from '../../layouts/BaseLayout.vue'
import PatientDetailLeft from '../../components/left-content/PatientDetail.vue'
import PatientDetailRight from '../../components/right-content/PatientDetail.vue'
import AddAppointmentFormPatientDetail from '../../components/home/appointment/patient-select-dialog/AddAppointmentFormPatientDetail.vue'
import ImageShowRequest from '../../components/home/components/ImageShowRequest.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    'base-layout': BaseLayout,
    'left-content': PatientDetailLeft,
    'right-content': PatientDetailRight,
    'image-show-request': ImageShowRequest,
    'add-appointment-form-patient-detail': AddAppointmentFormPatientDetail
  },
  methods: {
    ...mapActions('patients', ['getOverviews'])
  },
  mounted () {
    this.getOverviews()
  }
}
</script>

<style lang="scss" scoped>
</style>
