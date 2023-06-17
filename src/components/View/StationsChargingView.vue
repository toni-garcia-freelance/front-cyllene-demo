<template>
  <div class="flex flex-col justify-center items-center mt-10 mx-5">
    <h1 class="text-3xl text-center">Votre recherche de borne de recharche</h1>
    <template v-if="stationsChargingStore.searchCity !== ''">
      Ville : {{ stationsChargingStore.searchCity }}
      <br>
    </template>
    <template v-if="stationsChargingStore.searchZip !== ''">
      Code postal : {{ stationsChargingStore.searchZip }}
      <br>
    </template>

    <div  v-for="item in stationsCharging" :key="item.id" class="flex flex-row bg-gray-800 justify-center items-center p-5 rounded-xl text-white mt-3 cursor-pointer"
      @click="goToStation(item)"
    >
      <img v-if="item.active" :src="activecar" alt="" class="w-[100px] h-[100px] mr-4">
      <img v-else :src="inactivecar" alt="" class="w-[100px] h-[100px] mr-4">
      <div class="flex flex-col">
        <div class="flex flew-row">
          <strong>Station active : </strong> <template v-if="item.active">Oui</template> <template v-else>Non</template>
        </div>
        <div class="flex flew-row">
          <strong>Nombre de borne : </strong> {{item.number_of_charging}} 
        </div>
        <div class="flex flew-row">
          <strong>Rue : </strong> {{item.address.street}}
        </div>
        <div class="flex flew-row">
          <strong>Code postal : </strong> {{item.address.zip}}
        </div>
        <div class="flex flew-row">
          <strong>Ville : </strong> {{item.address.city}}
        </div>
      </div>
 
    </div>  

    <div v-if="stationsCharging.length == 0" class="mt-5 text-red-600">
      Pas de borne de recharge pour cette recherche
    </div> 
  </div>

  <ModalStation v-if="isDisplayModal" :stationCharging="currentStationCharging" @close="isDisplayModal=false"></ModalStation>
</template>

<script setup>
import { useStationsChargingStore } from '@/stores/stationsCharging.js';
import { onMounted, ref } from 'vue';
import ModalStation from '@/components/ModalStation.vue'
import activecar from '@/assets/activecar.png'
import inactivecar from '@/assets/inactivecar.png'
import { BACK_URL } from '@/constants.js';
import axios from 'axios';

const stationsChargingStore = useStationsChargingStore();
const stationsCharging = ref([]);
const isDisplayModal = ref(false);
const currentStationCharging = ref({})

onMounted(() => {
  stationsCharging.value=stationsChargingStore.stationsCharging
});

function goToStation(item){
  let url = '/api/station-charging/'+item.id
  axios.get(BACK_URL+url)
  .then(res => {
    currentStationCharging.value = res.data
    isDisplayModal.value = true
  })
  .catch(err => {
      console.log(err);
  });
}

</script>