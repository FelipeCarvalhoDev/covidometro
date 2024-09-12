// Stores
import { useLoadingStore } from "@/stores/loading.store";

export const getCountry = async () => {
  const loading = useLoadingStore();
  loading.setIsLoading();
  const { data } = await useFetch("https://covid-api.com/api/regions?per_page=10")
    if(data) {
      loading.clearLoading();
    }
    return { data }
};

export const orderByAsc = async () => {
  const loading = useLoadingStore();
  loading.setIsLoading();
  const { data } = await useFetch("https://covid-api.com/api/regions?per_page=10&order=name&sort=asc")
    if(data) {
      loading.clearLoading();
    }
    return { data }
};

export const orderByDesc = async () => {
  const loading = useLoadingStore();
  loading.setIsLoading();
  const { data } = await useFetch("https://covid-api.com/api/regions?per_page=10&order=name&sort=desc")
    if(data) {
      loading.clearLoading();
    }
    return { data }
};

export const resultSearch = async (value: any) => {
  const loading = useLoadingStore();
  loading.setIsLoading();
  
  const { data } = await useFetch(`https://covid-api.com/api/reports?region_name=${value}&per_page=10`)
    if(data) {
      loading.clearLoading();
    }
    return { data }
};

export const getDatails = async (myPropValue: any) => {
  const loading = useLoadingStore();
  loading.setIsLoading();
  
  const { data } = await useFetch(`https://covid-api.com/api/reports/total?iso=${myPropValue}`)
    if(data) {
      loading.clearLoading();
    }
    return { data }
};
