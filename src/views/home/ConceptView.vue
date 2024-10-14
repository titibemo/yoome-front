<template>

    <header class="">
        <div>
            <p>Une second chance en amour,</p>
            <p>pour vous et votre famille</p>
        </div>
        <div class="separator"></div>
    </header>
  
  
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  import { HeFilledUiUserProfile, IcProfileCircle, FlFilledPeopleCommunity, McBirthday2Fill, CoBrandMailRu, CgKeyhole, MdDescription } from '@kalimahapps/vue-icons';
  
  const router = useRouter();
  const store = useStore();
  const email = ref('');
  const password = ref('');
  
  
  const setTokenStore = (token) => {
    const user = JSON.parse(atob(token.split('.')[1]));
    store.commit('setUser', user);
    store.commit('setToken', token);
    store.commit('createToken', token);
  
    router.push('/profiles');
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
  
  <style scoped lang="scss">
  @import './../../style/variablecouleur.scss';
  
  header{
    background: rgba(0, 0, 0, 0.5) url("./../../assets/pictures/home/family.jpg");
    background-size: cover;
    background-blend-mode: darken;
    background-repeat: no-repeat;
    background-position: top;
    height: 45vh;
  
    display: flex;
    flex-direction: column;

    div{
        height: 80%;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: end;
    }
    .separator{
        height: 5px;
        width: 50px;
        background-color: $primary;
        margin: auto;
    }
}
  
  
  
  

  </style>