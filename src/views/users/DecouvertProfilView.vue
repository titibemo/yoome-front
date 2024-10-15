<template>
    <div class="container">
        <h2>Découvrez des profils</h2>
        <label class="file-upload">
            <div :style="`background-image:url('${url}${urlImage}')`" class="file-upload"></div>
            <h1 class="textImage" >{{nameImage}}</h1>
        </label>
        <div class="buttonRound">
            <div class="round2 icon" @click="suivantNo">
                <AkXSmall class="icon" />
            </div>
            <div class="round" @click="suivantYes"> <img class="icon" src="./../../assets/pictures/home/logo-m.png"
                    alt=""></div>
        </div>
    </div>


</template>

<script setup>
import router from '@/router';
import { computed, onMounted, ref } from 'vue';
import { AkXSmall } from '@kalimahapps/vue-icons';
import store from '@/store';

const user = computed(() => store.state.user || {});

const nameImage = ref('')
const idUser = ref(0)
const urlImage = ref('')
const url = "http://localhost:3000/uploads/";
const nbId = ref(0)
const suivantYes = () => {
    fetchLike()
    fetchDecouverteProfil()
}
const suivantNo = () => {
    fetchDecouverteProfil()
}
onMounted(() => {
    fetchDecouverteProfil()
});

const fetchDecouverteProfil = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/profiles/showProfil', {
            method: 'get',

        })

        if (!response.ok) {

            console.log(error);

            return;
        }
        const result = await response.json();
        if (nbId.value === (result.length - 1)) {
            nbId.value = 0
        } else nbId.value++
        console.log(result);
        
        urlImage.value = result[nbId.value]?.selfie
        idUser.value =result[nbId.value]?.id_user
        fetchUser()

    } catch (error) {
        console.error('Erreur lors du fetch showprofil :', error);
    }
}

const fetchUser = async() => {
  console.log(idUser);
  
    try {
        const response = await fetch(`http://localhost:3000/api/users/listUser/${idUser.value}`, {
            method: 'post',

        })

        if (!response.ok) {

            console.log(error);

            return;
        }
        const result = await response.json();
       
        console.log(result);
        
        
        nameImage.value = result[0].firstname

    } catch (error) {
        console.error('Erreur lors du fetch user profilview :', error);
    }
} 

const fetchLike = async () =>{
    const data = {
        id_user_liker:user.value.id,
        id_user_liked:idUser.value
    };

    try {
        const response = await fetch('http://localhost:3000/api/likes/addLikes', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });

     

        await response.json();
    
    } catch (err) {
        console.error('Error during fetch like:', err);
    }
}
</script>

<style lang="scss">
@import "@/style/variablecouleur.scss";

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;

}


.buttonRound {
    margin: 20px;
    gap: 80px;
    display: flex;
    flex-direction: row;
}

.round {
    height: 90px;
    width: 90px;
    align-items: center;
    justify-content: center;
    text-align: center;
    align-content: center;
    border-radius: 99999%;
    background-color: $white;

    img {
        height: 40%;

    }
}

.round2 {
    height: 90px;
    width: 90px;
    align-items: center;
    align-content: center;
    border-radius: 99999%;
    background-color: rgb(202, 202, 202);

    .icon {
        opacity: 0.5;
        width: 85%;
        height: 80%;
    }
}

.textImage{
    color: whitesmoke;
    
}

h2 {
    margin: 30px;
}

.file-upload {
    width: 350px;
    height: 450px;
    border: 1px solid rgba(249, 112, 104, 1);
    display: flex;
    flex-direction: column;
    background-color: $primary;
    background-position: center;
    background-size: cover;
    align-items: left;
    justify-content: left;
    border-radius: 35px;
    margin: auto;
   
}

.file-upload input[type="file"] {
    display: none;
}

.uploadPicture {
    width: 60px;
    height: 60px;
}
</style>