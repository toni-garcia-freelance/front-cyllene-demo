<template>
  {{ stationsCharging }}}
</template>

<script setup>
import { useStationsChargingStore } from '@/stores/stationsCharging.js';
import { onMounted, ref } from 'vue';

const stationsChargingStore = useStationsChargingStore();
const stationsCharging = ref([]);

onMounted(() => {
    stationsCharging.value=stationsChargingStore.stationsCharging
});

</script>