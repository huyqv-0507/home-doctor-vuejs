export class HeartRateLineChart {
  constructor (title, xAxisName, yAxisName, xData, yData, min, max) {
    this.initOptions = {
      width: '600px',
      height: '600px'
    }
    this.option = {
      title: {
        text: title
      },
      xAxis: {
        name: xAxisName,
        type: 'category',
        boundaryGap: false,
        data: xData
      },
      yAxis: {
        name: yAxisName,
        type: 'value'
      },
      visualMap: {
        padding: 20,
        top: '0px',
        right: '100px',
        pieces: [{
          gt: 0,
          lte: min,
          color: 'grey',
          label: 'Dưới mức an toàn'
        }, {
          gt: min,
          lte: max,
          color: '#3ac5c9',
          label: 'Khoảng an toàn'
        }, {
          gt: max,
          lte: 150,
          color: '#FD0100',
          label: 'Vượt mức an toàn'
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
