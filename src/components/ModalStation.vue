<template>
    <div class="absolute left-0 top-0 bg-gray-800/50   w-full h-full" @click="$emit('close')">
        <div @click.stop.prevent class="flex flew-col h-[80%] w-[80%] max-w-[500px] bg-white rounded-lg p-5 mt-10 mx-auto overflow-y-scroll">
      
            <div class="flex flex-col">
                <h1 class="text-3xl">Détail de la station</h1> 
                <br>
                <div class="flex flew-row">
                <strong>Station active : </strong> <template v-if="stationCharging.active">Oui</template> <template v-else>Non</template>
                </div>
                <div class="flex flew-row">
                <strong>Nombre de borne : </strong> {{stationCharging.number_of_charging}} 
                </div>
                <div class="flex flew-row">
                <strong>Rue : </strong> {{stationCharging.address.street}}
                </div>
                <div class="flex flew-row">
                <strong>Code postal : </strong> {{stationCharging.address.zip}}
                </div>
                <div class="flex flew-row">
                <strong>Ville : </strong> {{stationCharging.address.city}}
                </div>

                <h3 class="text-xl mt-5 mb-1">Prix de rechargement</h3> 
                <div v-for="price in stationCharging.prices" :key="price.id" >
                    De {{price.hour_start}}H à {{price.hour_end}} :   <strong>{{price.price}}</strong>€
                </div>

                <h3 class="text-xl mt-5 mb-2">Commentaires des utilisateurs</h3> 
              
                <div v-for="comment in stationCharging.comments" :key="comment.id" class="mb-2">
                    {{comment.title}}
                </div>
            </div>

            
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    stationCharging: Object
})

console.log(props.stationCharging)
</script>