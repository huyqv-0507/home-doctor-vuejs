export class HeartRateLineChart {
  constructor (title, xAxisName, yAxisName, xData, yData, min, max) {
    this.initOptions = {
      width: '500px',
      height: '500px'
    }
    this.option = {
      title: {
        text: title
      },
      xAxis: {
        name: xAxisName,
        type: 'category',
        data: xData
      },
      yAxis: {
        name: yAxisName,
        type: 'value'
      },
      visualMap: {
        pieces: [{
          gt: 0,
          lte: min,
          color: '#FD0100'
        }, {
          gt: min,
          lte: max,
          color: '#3ac5c9'
        }, {
          gt: max,
          lte: 150,
          color: '#FD0100'
        }]
      },
      series: [
        {
          name: 'Nhịp tim',
          data: yData,
          type: 'line',
          markLine: {
            data: [
              {
                yAxis: min,
                lineStyle: {
                  color: '#FD0100'
                }
              },
              {
                yAxis: max,
                lineStyle: {
                  color: '#3ac5c9'
                }
              }
            ]
          }
        }
      ]
    }
  }
}
