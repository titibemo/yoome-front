<template>
    <div class="bodyRegister">


        <form @submit.prevent class="register">
            <div>
                <HeFilledUiUserProfile />
                <input type="email" placeholder="Email" v-model="email" />
            </div>
            <input type="text" placeholder="Prenom" v-model="firstname" />
            <input type="text" placeholder="nom" v-model="lastname" />
            <input type="date" placeholder="Date de naissance" v-model="birthdate" max="2006-01-01" />
            <input type="password" placeholder="mot de passe" v-model="password" />
            <input type="password" placeholder="valider le mot de passe" v-model="password2" />



            <button type="submit" @click="verify">valider</button>
        </form>

    </div>
</template>

<script setup>
import router from '@/router';
import { ref } from 'vue';
import { HeFilledUiUserProfile } from '@kalimahapps/vue-icons';
const email = ref('');
const firstname = ref('')
const lastname = ref('')
const birthdate = ref('')
const password = ref('')
const password2 = ref('')

const verify = () => {

    if (password.value == password2.value) {

        register();
    }
}
const register = async () => {

    const data = {
        email: email.value,
        firstname: firstname.value,
        lastname: lastname.value,
        birthdate: birthdate.value,
        password: password.value
    };


    try {
        const response = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, /',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.log("ERREUR")
            alert("erreur ")
        }

        const result = await response.json();


        router.push('/connexion')

    } catch (err) {
        console.error('Error during register:', err);
    }

};

</script>

<style lang="scss" scoped>
@import "@/style/variablecouleur.scss";

.bodyRegister {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: $white;

    .register {
        display: flex;
        margin: 40px;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        div {

            padding: 20px;
            margin: 20px;
            width: 80vw;
            border: 1px solid ;
            border-color: $primary;
            border-radius: 999px;
            
            input {
                width: 50vw;
                background-color: $white;
                border: 0;
                width:250px;
             
    
            }
        }

    }
}
</style>