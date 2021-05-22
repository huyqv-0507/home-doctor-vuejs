<template>
  <div class="mainContent">
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>Bệnh nhân</el-breadcrumb-item>
        <el-breadcrumb-item>Timeline</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-theme font-size-default">
      <el-row :gutter="20" class="verticalCenter">
        <el-col :span="4" :offset="0">Chọn ngày:</el-col>
        <el-col :span="20" :offset="0">
          <el-date-picker
            v-model="date"
            type="date"
            placeholder="Chọn"
            size="mini"
            :picker-options="pickerOptions"
            @change="handleChooseDate"
            format="dd/MM/yyyy"
          ></el-date-picker>
        </el-col>
      </el-row>
      <div v-if="storiesOfDay !== null">
        <el-row :gutter="20">
          <el-col :span="12" :offset="0" class="person">
            <h3>Bác sĩ</h3>
          </el-col>
          <el-col :span="12" :offset="0" class="person">
            <h3>Bệnh nhân</h3>
          </el-col>
        </el-row>
        <el-row
          :gutter="20"
          v-for="(story, index) in storiesOfDay.stories"
          :key="`story-${index}`"
          v-bind:class="{patientt: story.person === 'patient'}"
        >
          <el-col :span="12" :offset="0" v-if="story.person === 'patient'" class="patient">
            <el-row>
              <span
                class="patient__item__subtitle"
                style="color: gray; margin-bottom: .3em; font-size: 10px;"
              >
                <i>{{story.time}}</i>
              </span>
              <div class="patient__item">
                <p>{{story.description}}</p>
              </div>
            </el-row>
          </el-col>
          <el-col :span="12" :offset="0" v-if="story.person === 'doctor'" class="doctor">
            <el-row>
              <span
                class="doctor__item__subtitle"
                style="color: gray; margin-bottom: .3em; font-size: 10px;"
              >
                <i>{{story.time}}</i>
              </span>
              <div class="doctor__item">
                <p>{{story.description}}</p>
              </div>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div v-else style="display: flex; justify-content: center; margin: 3em;">
        <h4>Hôm nay chưa có hoạt động nào</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      date: new Date(this.$store.state.time.timeNow),
      pickerOptions: {
        disabledDate: this.handleDisabledDate
      }
    }
  },
  computed: {
    ...mapState('patientDetail', ['storiesOfDay', 'dateStories']),
    ...mapState('time', ['timeNow'])
  },
  methods: {
    ...mapActions('patientDetail', [
      'getStories',
      'navigateStory',
      'getDateStories',
      'handleChooseDate'
    ]),
    handleDisabledDate (time) {
      const tmpTime = new Date(time)
      let flag = ''
      this.dateStories.forEach(date => {
        const tmpDate = new Date(date)
        if (
          tmpTime.getFullYear() === tmpDate.getFullYear() &&
          tmpTime.getMonth() === tmpDate.getMonth() &&
          tmpTime.getDate() === tmpDate.getDate()
        ) {
          flag = tmpDate
        }
      })
      const date = new Date(flag)
      return !(
        tmpTime.getFullYear() === date.getFullYear() &&
        tmpTime.getMonth() === date.getMonth() &&
        tmpTime.getDate() === date.getDate()
      )
    },
    ...mapActions('time', ['getTimeSystem'])
  },
  mounted () {
    this.getTimeSystem()
    const now = new Date(this.timeNow.split('T')[0])
    this.getStories(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`)
    this.getDateStories()
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.font-size-default {
  font-size: 13px;
}
.person {
  display: flex;
  justify-content: center;
  padding: 1em;
}
.patientt {
  display: flex;
  justify-content: flex-end;
}
.patient {
  color: white;
  margin: 0.5em;
  display: flex;
  justify-content: flex-end;
  .patient__item {
    padding: 0.8em 1.2em;
    background-color: #3ac5c9;
    border-radius: 30px;
    .patient__item__subtitle {
      margin-top: 0.5em;
      color: black;
    }
  }
}
.doctor {
  color: black;
  margin: 0.5em;
  display: flex;
  justify-content: flex-start;
  .doctor__item {
    padding: 0.8em 1.2em;
    background-color: #dcdcdc;
    border-radius: 30px;
    .doctor__item_subtitle {
      margin-top: 0.5em;
    }
  }
}
</style>
