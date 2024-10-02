<template>
<h1>page d'accueil</h1>

<div class="profile">
      
    <div> Votre email  :    {{ user?.email }}</div>
    <div>Votre name :     {{ user?.lastname }}</div>
    <div>Votre prenom :     {{ user?.firstname }}</div>
    <div>Votre role :     {{ user?.role }}</div>

   
    <button type="submit" @click="deco">deconnexion</button> 
</div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import {ref} from 'vue';
import router from '@/router';


onMounted(() => {
  store.dispatch('checkAuth');
  
});
const store = useStore();
const user = ref(computed(() => store.state.user)); // Récupère les infos de l'utilisateur depuis le store

const deco = () => {
    store.dispatch('logout')
    router.push('/connexion')
}
</script>
