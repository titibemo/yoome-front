<template>

    <h1>connexion</h1>
    <form @submit.prevent class="login"> 
        <input type="text" placeholder="email" v-model="email" />
        <input type="password" placeholder="password" v-model="password" />
        <p>Vous avez pas de compte <router-link to="/inscription">inscriver-vous</router-link></p>
        <button type="submit" @click="login">valider</button> 
      </form>

</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();
const email = ref('a');
const password = ref('a');


const setTokenStore = (token) => {
  const user = JSON.parse(atob(token.split('.')[1]));
  store.commit('setUser', user);
  store.commit('setToken', token);
  store.commit('createToken', token);

  router.push('/');
};

const login = async () => {
  const data = {
    email: email.value,
    password: password.value,
  };

  try {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
        console.log('coucou');
      console.log("ERREUR");
      alert("utilisateur inconnu ou mot de passe incorrect");
      return;
    }

    const result = await response.json();
    console.log(result);
    
    setTokenStore(result.token);
  } catch (err) {
    console.error('Error during login:', err);
  }
};
</script>

<style>

</style>