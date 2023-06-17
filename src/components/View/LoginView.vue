<template>
    <div class="flex justify-center items-center ">
        <div class="flex flex-col gap-5 bg-gray-800 w-full lg:w-1/4 mx-7 p-6 rounded-xl mt-[150px] text-white">
            <h1 class="text-2xl text-center">Connexion</h1>
            <div class="sm:col-span-4">
                <label for="email" class="block text-lg font-medium leading-6 ">Email</label>
                <div class="mt-2">
                    <input  v-model="email" id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div class="sm:col-span-4">
                <label for="password" class="block text-lg font-medium leading-6 ">Mot de passe</label>
                <div class="mt-2">
                    <input  v-model="password" id="password" name="password" type="password"  class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>

            <div class="flex flex-row justify-center items-center mt-4">
                <button class="bg-white  text-black w-fit p-3 rounded-xl" @click="login">Se connecter</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { BACK_URL } from '@/constants.js';
import { useUserStore } from '@/stores/user.js';

const email =  ref('');
const password = ref('');
const userStore = useUserStore();

function login() {
    console.log('login')
    axios.post(BACK_URL+'/api/login', {
        email: email.value,
        password: password.value
    })
    .then(res => {
        userStore.token = res.data.access_token;
    })
    .catch(err => console.log(err));
}
</script>