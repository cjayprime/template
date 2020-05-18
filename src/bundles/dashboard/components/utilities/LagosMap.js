import React from 'react';

import HighchartsReact from 'highcharts-react-official';
import mapData from './LagosMapData';
import Highcharts from 'highcharts/highstock';
require('highcharts/modules/map')(Highcharts);

const MapChart = ({ options, highcharts, ...props }) => (
  <HighchartsReact
    highcharts={highcharts}
    constructorType={'mapChart'}
    options={options}
    {...props}
  />
);

export default props => {
  const { data, OnLGAClick, title, ...highchartProps } = props;
  const mapOptions = {
    title: {
      text: title || 'Lagos'
    },
    credits: {
      enabled: false // Important to hide the highchart watermark
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'middle'
    },
    colorAxis: {
      min: 1,
      minColor: 'rgb(171, 212, 107)',
      maxColor: 'rgb(70, 104, 24)'
    },
    plotOptions: {
      map: {
        states: {
          hover: {
            color: '#a4edba'
          }
        }
      }
    },
    tooltip: {
      backgroundColor: '#ffffff',
      borderWidth: 0,
      shadow: false,
      useHTML: true,
      padding: 0,
      pointFormat:
        '<span style="font-size:13px"> {point.properties.lganame} LGA : {point.value}</span>'
    },
    series: [
      {
        mapData,
        data,
        name: 'Lagos',
        keys: ['lganame', 'value'],
        joinBy: ['lganame'],
        dataLabels: {
          enabled: true,
          format: '{point.properties.lganame}'
        },
        point: {
          events: {
            click: function() {
              if (OnLGAClick && typeof OnLGAClick === 'function') {
                OnLGAClick(this.LGA_UID);
              }
            }
          }
        }
      }
    ]
  };

  return (
    <MapChart
      options={mapOptions}
      highcharts={Highcharts}
      {...highchartProps}
    />
  );
};
