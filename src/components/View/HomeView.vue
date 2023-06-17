<template>
    <div class="flex flex-col justify-center items-center mt-10 mx-5">
        <h1 class="text-3xl text-center">Trouver une borne de recharge près de chez vous</h1>
        <br>
        <img :src="chargingImg" alt="" class=" w-[500px]">
        <p class="text-center">
            Application démo de Toni GARCIA pour l'entreprise Cyllène.
            <br> Le front-end est réalisé avec Vue.js et Tailwind CSS.
            <br> Le back-end est réalisé avec Laravel et utilise la librairie Nova pour l'administration.
        </p>

        <div class="flex flex-row mt-10">
            <div class="flex flex-col">
                <label for="zip" class="block text-lg font-medium leading-6 h-12 sm:h-fit">Recherche par code postal</label>
                <select v-model="zipSelected" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" id="zip" name="zip">
                    <option v-for="zipObj in zips" :key="zipObj.zip" :value="zipObj.zip">
                        {{ zipObj.zip }}
                    </option>
                </select>
            </div>
            <div class="flex flex-col ml-10">
                <label for="city" class="block text-lg font-medium leading-6 h-12 sm:h-fit">Recherche par ville</label>
                <select  v-model="citySelected" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" id="city" name="city">
                    <option v-for="cityObj in cities" :key="cityObj.city" :value="cityObj.city">
                        {{ cityObj.city }}
                    </option>
                </select>
            </div>
        </div>

        <div class="flex flex-row justify-center items-center mt-4">
            <button class="bg-gray-800  text-white w-fit p-3 rounded-xl" @click="search">Rechercher</button>
        </div>
    </div>
</template>
<script setup>
import chargingImg from '@/assets/charging-station.jpg'
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { BACK_URL } from '@/constants.js';
import { useStationsChargingStore } from '@/stores/stationsCharging.js';
import { useRouter } from 'vue-router';

const zips = ref([]);
const zipSelected = ref('');
const cities = ref([]);
const citySelected = ref('');
const stationsChargingStore = useStationsChargingStore();
const router = useRouter();

async function getZips(){
    const res = await axios.get(BACK_URL+'/api/address/all-zip')
    if(res.data){
        zips.value = res.data
        zips.value.unshift({zip: ''})
    }
}

async function getCities(){
    const res = await axios.get(BACK_URL+'/api/address/all-city')
    if(res.data){
        cities.value = res.data
        cities.value.unshift({city: ''})
    }
}

onMounted(() => {
    getZips()
    getCities()
});

function search(){
    if(zipSelected.value === '' && citySelected.value === ''){
        alert('Veuillez sélectionner un code postal ou une ville')
        return
    }
    let url = '/api/station-charging'
    if(zipSelected.value !== ''){
        url += '?zip='+zipSelected.value
    } else if(citySelected.value !== ''){
        url += '?city='+citySelected.value
    } else {
        url += '?zip='+zipSelected.value+'&city='+citySelected.value
    }

    axios.get(BACK_URL+url)
    .then(res => {
        stationsChargingStore.stationsCharging = res.data
        router.push('stations-charging');
    })
    .catch(err => {
        console.log(err);
    });
}

</script>
