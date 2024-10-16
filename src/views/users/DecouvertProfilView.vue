<template>
    <div class="container">
        <h2>Découvrez des profils</h2>
        <label class="file-upload" v-if="!sansUser">

            <div :style="`background-image:url('${url}${urlImage}')`" class="file-upload"></div>
            <h1 class="textImage">{{ nameImage }}, {{ age }} ans </h1>



        </label>
        <div v-else>
            <div class="file-upload2">
                <img src="./../../assets/pictures/home/logo.png" alt="">
                <h1 class="match">Tous les profils ont été matchés ou il n’y a plus de profils à découvrir ! </h1>
            </div>
        </div>

        <div class="buttonRound" v-if="!sansUser">
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
const sansUser = ref(false)
const user = computed(() => store.state.user || {});
const age = ref(null)
const nameImage = ref('')
const idUser = ref(0)
const idLiked = ref([])
const urlImage = ref('')
const url = "http://10.0.1.87:3000/uploads/";
const nbId = ref(0)
const suivantYes = () => {
    if (!idLiked.value.includes(idUser.value)) {

        fetchLikedID()
        fetchLikedShowID()
    }
    fetchDecouverteProfil();
    fetchLike();
};
const suivantNo = () => {
    fetchDecouverteProfil()
}
onMounted(() => {
    fetchLikedShowID()
    fetchDecouverteProfil()
});
const profilsNonLiques = ref([]);
const fetchDecouverteProfil = async () => {
    try {
        const response = await fetch('http://10.0.1.87:3000/api/profiles/showProfil', {
            method: 'GET',
        });

        if (!response.ok) {
            console.error("Erreur lors de la récupération des données.");
            return;
        }
        const result = await response.json();

        // Filtre les profils pour n'afficher que ceux qui ne sont pas likés
        profilsNonLiques.value = result.filter(profil => !idLiked.value.includes(profil.id_user));


        if (profilsNonLiques.value.length === 0) {
            console.log("Tous les profils ont été likés !");
            sansUser.value = true
            return;
        }

        // Affiche le profil suivant parmi les non-likés
        const profil = profilsNonLiques.value[nbId.value % profilsNonLiques.value.length];
        urlImage.value = profil.selfie;
        idUser.value = profil.id_user;

        nbId.value = (nbId.value + 1) % profilsNonLiques.value.length;


        console.log(result);

        fetchUser();

    } catch (error) {
        console.error('Erreur lors du fetch showprofil :', error);
    }
};

const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Ajuste l'âge si l'anniversaire n'est pas encore passé cette année
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};

const fetchUser = async () => {


    try {
        const response = await fetch(`http://10.0.1.87:3000/api/users/listUser/${idUser.value}`, {
            method: 'post',

        })

        if (!response.ok) {

            console.log(error);

            return;
        }
        const result = await response.json();



        age.value = calculateAge(result[0].birthdate);
        nameImage.value = result[0].firstname

    } catch (error) {
        console.error('Erreur lors du fetch user profilview :', error);
    }
}

const fetchLike = async () => {
    const data = {
        id_user_liker: user.value.id,
        id_user_liked: idUser.value
    };

    try {
        const response = await fetch('http://10.0.1.87:3000/api/likes/addLikes', {
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

const fetchLikedID = async () => {
    const data = {
        id_user: user.value.id,
        id_liked: idUser.value
    };

    try {
        const response = await fetch('http://10.0.1.87:3000/api/profiles/modifyProfil', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });

        // Vérifie si le statut de la réponse indique une erreur
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Profil modifié avec succès:', result); // Traiter le retour si nécessaire

    } catch (err) {
        console.error('Error during fetch like id:', err);
    }
};

const fetchLikedShowID = async () => {
    try {
        const response = await fetch(`http://10.0.1.87:3000/api/users/listUser/${user.value.id}`, {
            method: 'post',

        })

        if (!response.ok) {

            console.log(error);

            return;
        }
        const result = await response.json();

        console.log('fetchid', result[0].id_liked);


        idLiked.value = result[0].id_liked
        console.log('iii', idLiked.value);



    } catch (error) {
        console.error('Erreur lors du fetch user profilview :', error);
    }
};

</script>

<style lang="scss" scoped>
@import "@/style/variablecouleur.scss";

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;

}

.match {
    text-align: center;
    color: whitesmoke;
    padding: 0;
}

h1 {
    font-weight: 300;
    padding: 10px;
    padding-left: 40px;
    font-size: medium;
    text-align: left
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

.textImage {
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

.file-upload2 {
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
    padding-top: 70px;
    margin-bottom: 80px;

    img {
        background-color: rgb(0, 0, 0, 0.2);
        padding-bottom: 20px;
        margin-bottom: 20px;
    }

}

.file-upload input[type="file"] {
    display: none;
}

.uploadPicture {
    width: 60px;  height: 60px;
}
</style>