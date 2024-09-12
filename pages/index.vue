<template>
  <div class="max-w-screen-xl mx-auto pt-16">
    <div class="container flex flex-col md:flex-row">
      <div class="md:w-7/12 w-11/12 mx-auto">
        <h1 class="text-5xl text-dark font-bold font-spectral md:pt-24 mb-4">Conheça o Covidômetro</h1>
        <p class="max-w-[40rem] leading-8">Fique atualizado com velocidade e transparência. O covidômetro é uma ferramenta que mostra pra você em tempo real o número de casos e óbitos relacionados a pandemia da COVID-19 ao redor do mundo.</p>
      </div>
      <img src="/public/imgs/doctors.png" alt="Doctors" class="md:w-5/12  w-11/12 mx-auto">
    </div>

    <div class="container -mt-32 z-10 relative">
      <div class="bg-white rounded-lg shadow shadow-gray-300 mx-auto md:w-3/5 w-11/12 p-10">
        <h2 class="md:text-2xl text-xl text-dark font-bold font-spectral text-center mb-6">Filtrar dados sobre um país</h2>
        <input
          placeholder="Digite o nome do país"
          type="text" 
          class="border-b border-red-400 md:w-4/5 w-full mx-auto block outline-none bg-search bg-no-repeat bg-left ps-7"
          v-model="model"
          @keyup="search"
        >
      </div>
    </div>

    <div class="md:w-3/5 w-11/12 mx-auto mt-8 flex gap-2 justify-between">
      <div class="flex gap-1">
        <span class="text-sm contents mr-4">Ordenar por:</span>
        <img src="/public/imgs/asc.svg" alt="Alfabética crescente" title="Alfabética crescente" @click="orderByA()" class="cursor-pointer ml-2">
        <img src="/public/imgs/desc.svg" alt="Alfabética decrescente" title="Alfabética decrescente" @click="orderByZ()" class="cursor-pointer">
      </div>
      <span class="text-sm font-semibold text-red-400 cursor-pointer" @click="initial()">Limpar tudo</span>
    </div>
    <CountryCard
      v-for="(item, index) in regions" :key="index"
      :country="item"
    />
  </div>
</template>

<script setup lang="ts">
import { getCountry, orderByAsc, orderByDesc, resultSearch } from "@/services/covid.service";
import { debounce } from 'vue-debounce'

const model = defineModel()
const regions = ref([])
// const text = ref('')

onMounted(async () => {
  getCountry().then((res: any) => {
    if(res) {
      regions.value = res.data.value.data
    }
  })
})

const initial = () => {
  model.value = ''
  getCountry().then((res: any) => {
    regions.value = res.data.value.data
  })
}

const orderByA = () => {
  orderByAsc().then((res: any) => {
    regions.value = res.data.value.data
  })
}

const orderByZ = () => {
  orderByDesc().then((res: any) => {
    regions.value = res.data.value.data
  }) 
}

const search = debounce((e) => 
  resultSearch(e.target.value).then((res) => {
    if(!res.data.value) {
      initial()
    } else {
      regions.value = res.data.value.data
    }
  }),
  500
);

</script>
