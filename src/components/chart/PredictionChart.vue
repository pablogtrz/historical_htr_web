<template>
  <VueApexChart
    class="prediction-chart mx-auto"
    :options="options"
    :series="series"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    text: {
      type: String,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
  },
  computed: {
    options() {
      return {
        chart: {
          height: 350,
          type: 'bar',
          toolbar: {
            show: false,
          },
        },
        colors: ['#08a88b'],
        plotOptions: {
          bar: {
            borderRadius: 5,
            dataLabels: {
              position: 'center',
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter(val: number) {
            return val * 100 + '%'
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#023047'],
          },
        },
        xaxis: {
          categories: this.text.split(''),
          position: 'top',
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#08a88b',
                colorTo: '#08a88b',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
          },
        },
      }
    },
    series() {
      return [
        {
          name: 'Accuracy',
          data: this.values,
        },
      ]
    },
  },
})
</script>

<style lang="scss">
.prediction-chart {
  max-width: 600px;
}
</style>
