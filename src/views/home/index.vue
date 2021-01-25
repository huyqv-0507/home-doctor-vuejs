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
import LeftContent from '../../components/home/LeftContent.vue'
import RightContent from '../../components/home/RightContent.vue'
import MainContent from '../../components/home/MainContent.vue'
export default {
  name: 'Home',
  components: {
    'left-content': LeftContent,
    'right-content': RightContent,
    'main-content': MainContent
  }
}
</script>
