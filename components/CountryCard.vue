<template>
  <div class="container mt-8">
      <div class="bg-white rounded-lg shadow shadow-gray-300 mx-auto md:w-3/5 w-11/12 md:py-10 py-6 px-0">
        <h2 class="md:text-3xl text-2xl text-dark font-bold font-spectral text-center mb-6">{{ myPropValue.name ? myPropValue.name : myPropValue }}</h2>
        
        <div class="flex flex-col md:flex-row justify-between items-center gap-2">
          <div class="total md:w-1/3 w-10/12">
            <h3 class="text-center font-semibold mb-4">Total de casos</h3>
            <p class="text-center font-spectral text-red-400 text-3xl font-bold">{{ !values.confirmed ? '--' : values.confirmed?.toLocaleString() }}</p>
          </div>
          <div class="mortes md:w-1/3 w-10/12 md:border-r md:border-l border-t border-b md:border-t-0 md:border-b-0 py-2">
            <h3 class="text-center font-semibold mb-4">Mortes</h3>
            <p class="text-center font-spectral text-red-400 text-3xl font-bold">{{ !values.deaths ? '--' : values.deaths?.toLocaleString() }}</p>
          </div>
          <div class="fatalidade md:w-1/3 w-10/12">
            <h3 class="text-center font-semibold mb-4">Fatalidade</h3>
            <p class="text-center font-spectral text-red-400 text-3xl font-bold">{{ !values.fatality_rate ? '--' : formatFatality(values.fatality_rate) }}%</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { getDatails } from "@/services/covid.service";

const props = defineProps({
  country: {
   type: String,
   required: true,
 },
});

const myPropValue = ref(props.country);
const values = ref([])

onMounted(async () => {
  getDatails(myPropValue.value.iso).then((res: any) => {
    if(res) {
      values.value = res.data.value.data
    }
  })
})

watch(() => props.country, (newValue, oldValue) => {
  
  if (newValue.region) {
    myPropValue.value = newValue.region.province;
    values.value = newValue;
  } else {
    getDatails(myPropValue.value.iso).then((res: any) => {
      if(res) {
        values.value = res.data.value.data;
        myPropValue.value = newValue;
      }
    })
    useFetch(`https://covid-api.com/api/reports/total?iso=${newValue.iso}`).then((res) => {
      values.value = res.data.value.data;
      myPropValue.value = newValue;
    })
  }
});

function formatFatality(value: number) {
  const newValue = value*100
  return newValue.toFixed(2).replace('.', ',')
}

</script>

<style lang="">
  
</style>