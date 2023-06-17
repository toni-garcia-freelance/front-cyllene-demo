<template>
  <div class="flex justify-center items-center ">
        <div class="flex flex-col gap-1 bg-gray-800 w-full lg:w-1/4 mx-7 p-6 rounded-xl mt-[150px] text-white">
            <h1 class="text-2xl text-center">Vos informations</h1>
              <strong>Nom : </strong> {{userStore.user.name}}
              <strong>Email : </strong> {{userStore.user.email}}
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user.js';
import { ref,  onMounted } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
    if(!userStore.isLoggedIn()){
        router.push({name: 'login'})
    }
});


</script>