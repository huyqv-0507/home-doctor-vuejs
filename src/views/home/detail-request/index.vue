<template>
<div>
    <el-row>
      <h3>HOMEDOCTOR</h3>
    </el-row>
    <el-row>
      <el-col :span="6" class="shortcuts"><left-content/></el-col>
      <el-col :span="12"><main-content/></el-col>
      <el-col :span="6" class="shortcuts"><right-content/></el-col>
    </el-row>
  </div>
</template>
<script>
import LeftContent from '../../../components/home/request-detail/LeftContent.vue'
import RightContent from '../../../components/home/request-detail/RightContent.vue'
import MainContent from '../../../components/home/request-detail/MainContent.vue'
export default {
  name: 'ContractRequest',
  components: {
    'left-content': LeftContent,
    'right-content': RightContent,
    'main-content': MainContent
  }
}
</script>

<style>

</style>
