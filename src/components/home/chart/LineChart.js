import VueChartJs from 'vue-chartjs'
import Vue from 'vue'
Vue.component('line-chart', {
  extends: VueChartJs.Line,
  mounted () {
    this.renderChart({
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', ['10']],
      datasets: [
        {
          label: 'Nhịp tim trong 10 phút gần nhất',
          backgroundColor: '#FF4565',
          data: [80, 77, 80, 76, 75, 78, 79, 80, 83, 77]
        }
      ],
      options: {
        title: {
          display: true,
          text: 'Custom Chart Title'
        }
      }
    }, { responsive: true, maintainAspectRatio: false })
  }

})
