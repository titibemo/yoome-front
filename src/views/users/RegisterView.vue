<template>
    <div class="bodyRegister">

        <h1>S'inscrire</h1>
        <form @submit.prevent class="register">
            <input class="message" type="text" v-model="message" disabled>
            <input type="email" placeholder="Email" v-model="email" />
            <input type="text" placeholder="Prenom" v-model="firstname" />
            <input type="text" placeholder="nom" v-model="lastname" />
            <label for="">
                <p class="pdate">Entrer votre date de naissance</p>
                <input type="date" placeholder="Date de naissance" v-model="birthdate" max="2006-01-01" />
            </label>

            <input type="password" placeholder="mot de passe" v-model="password" />
            <input type="password" placeholder="valider le mot de passe" v-model="password2" />

            <button type="submit" @click="verify">valider</button>
        </form>

    </div>
</template>

<script setup>

import router from '@/router';
import { ref } from 'vue';
const message = ref('')
const email = ref('');
const firstname = ref('')
const lastname = ref('')
const birthdate = ref('')
const password = ref('')
const password2 = ref('')

const verify = () => {
    // verifier
    //Si c'est bon
    message.value = ''
    if (email.value.length <= 2) {
        message.value = message.value + 'email incorrect' + '  '

    }

    if (lastname.value.length <= 2) {
        message.value = message.value + 'nom trop court' + '  '

    }

    if (firstname.value.length <= 2) {
        message.value = (message.value + 'Prenom trop court')
        return
    }

    if (password.value == password2.value) {

        register();
    } else {
        message.value = ('mdp incorrect')
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

<style>
.bodyRegister {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.register {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    width: 25vw;
    gap: 20px;
    margin: 10px
}

.register input {
    padding: 5px;
    width: 20vw;
}

input.message {
    background-color: transparent;
    width: 1000px;
    text-align: center;
    font-size: large;
    color: red;
    text-transform: uppercase;
    opacity: 0.5;
    justify-content: center;
    align-items: center;
    border: 0;
}

.pdate {
    padding: 0;
    margin: 0;
    left: 10;
    right: 10;
}
</style>