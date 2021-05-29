<template>
  <base-layout>
    <template v-slot:left-content>
      <left-content />
    </template>
    <template v-slot:main-content>
      <router-view/>
      <image-show-request/>
      <add-medical-instruction-image-form/>
      <add-more-diagnose-adding-mi />
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
import ImageShowRequest from '../../components/home/components/ImageShowRequest.vue'
import AddMedicalInstructionImageForm from '../../components/modals/addMedicalInstructionImageForm'
import AddMoreDiagnoseAddingMi from '../../components/modals/addMoreDiagnoseAddingMi'
import { mapActions } from 'vuex'
export default {
  components: {
    'base-layout': BaseLayout,
    'left-content': PatientDetailLeft,
    'right-content': PatientDetailRight,
    'image-show-request': ImageShowRequest,
    'add-medical-instruction-image-form': AddMedicalInstructionImageForm,
    'add-more-diagnose-adding-mi': AddMoreDiagnoseAddingMi
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
