<script setup>
const {$lightweightCharts} = useNuxtApp()
const chartComponent = ref(null);

const props = defineProps({
  data: {
    type: Object,
    default: {prices: [{time: "2022-01-01",value: 0}]}
  },
})

onMounted(()=>{
  const chartOptions = {rightPriceScale: {
    visible: false
    },leftPriceScale: {
      visible: false
    },timeScale: {
      visible: false
    }, handleScroll: false, handleScale: false,crosshair:{vertLine: {visible: false},horzLine: {visible: false}}, grid: {
      vertLines : {
        visible: false
      },
      horzLines : {
        visible: false
      }
    },localization: {
      priceFormatter: (value) => `$${value.toFixed(2)}`,
    }, layout: { textColor: '#070c38', fontFamily:"BrandonLight",  background: { type: 'solid', color: 'rgba(152,255,226,0)' } } };
  const chart = $lightweightCharts.createChart(chartComponent.value, chartOptions);
  const lineSeries = chart.addAreaSeries({ crosshairMarkerVisible:false,lineColor: '#76efd3', topColor: '#76efd3', bottomColor: 'rgba(152,255,226,0.59)' });
  lineSeries.setData(props.data.prices.slice(0,props.data.prices.length - 1).map(([time,value])=>({time: time/1000,value})));
  chart.timeScale().fitContent();
})

</script>

<template>
  <div ref="chartComponent" class="bg-opacity-50 bg-accent-500 flex flex-grow-0 w-full h-10rem mb-10"></div>
</template>
