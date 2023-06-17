<template>
    <div class="flex justify-center items-center ">
        <div class="flex flex-col gap-5 bg-gray-800 w-full lg:w-[40%] mx-7 p-6 rounded-xl mt-[150px] text-white">
            <h1 class="text-2xl text-center">Créer un compte</h1>
            <div class="sm:col-span-4">
                <label for="nom" class="block text-lg font-medium leading-6 ">Prénom</label>
                <div class="mt-2">
                    <input  v-model="name" id="nom" name="nom" type="text" autocomplete="nom" class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
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
             <div class="sm:col-span-4">
                <label for="confirm_password" class="block text-lg font-medium leading-6 ">Confirmation mot de passe</label>
                <div class="mt-2">
                    <input  v-model="confirm_password" id="confirm_password" name="confirm_password" type="password"  class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div v-if="error !== ''" class="text-red-500 text-sm">
                {{ error }}
            </div>

            <div class="flex flex-row justify-center items-center mt-4">
                <button class="bg-white  text-black w-fit p-3 rounded-xl" @click="register">S'inscrire</button>
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
const confirm_password = ref('');
const name = ref('');
const userStore = useUserStore();
const error = ref('');

function validate(){
    if (name.value === '' || email.value === '' || password.value === '' || confirm_password.value === '') {
        error.value = 'Veuillez remplir tous les champs';
        return false;
    }
    if (password.value !== confirm_password.value) {
        error.value = 'Les mots de passe ne correspondent pas';
        return false;
    }
    return true;
}

function register() {
    if (!validate()) {
        return;
    }

    error.value = ''
    console.log('login')
    axios.post(BACK_URL+'/api/register', {
        name: name.value,
        email: email.value,
        password: password.value,
        confirm_password: confirm_password.value
    })
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        if (err.response && err.response.data && err.response.data.message) {
            error.value = err.response.data.message;
        } else {
            error.value = 'Une erreur est survenue';
        }
        console.log(err);
    });
}
</script>