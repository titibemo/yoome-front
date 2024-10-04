<template>

    <div class="">
        <div class="">
            <h2 class="">Création de votre profil</h2>
            <progress class="" :value="QuestionIndex" :max="max" />
        </div>

        <form @submit.prevent="fetchProfil" enctype="multipart/form-data" class=" ">
   
            <div v-if="QuestionIndex === 0">
                <h3>Photo</h3>

                <img v-if="imageUrl" :src="imageUrl" alt="Aperçu de votre photo"
                    style="max-width: 200px; max-height: 200px; margin-top: 10px;">
                <br><br>

                <input type="file" id="image" name="image" accept="image/*" @change="onFileChange" />

            </div>


            <div v-if="QuestionIndex === 1">
                <p>vous etes un : </p>
                <select name="sexe" id="">
                    <option value="">Homme</option>
                    <option value="">Femme</option>
                  </select>
                  <p>et vous rechercher : </p>
                <select name="sexe" id="">
                    <option value="">Homme</option>
                    <option value="">Femme</option>
                  </select>
            </div>

            <div v-if="QuestionIndex === 2">
                <p>une description pour votre profil </p>
                <textarea name="" id="" rows="10" cols="50"></textarea>
            </div>

            <div v-if="QuestionIndex === 3">
                <p>Votre ville :</p>
                <input 
                    type="text" 
                    v-model="ville" 
                    @input="filterCities" 
                    placeholder="Tapez le nom de votre ville" 
                />
                <div class="suggestions" v-if="filteredCities">
                    <div 
                        class="suggestion-item" 
                        v-for="(city, index) in filteredCities" 
                        :key="index" 
                        @click="selectCity(city)"
                    >
                        {{ city }}
                    </div>
                </div>
            </div>

            <div v-if="QuestionIndex === 4">
                <p>Félicitations, votre profil est maintenant complet !</p>
                <button class="" @click.prevent="Continuer">Continuer</button>
            </div>

            <div class="">
                <button class="" @click.prevent="precedent" v-if="QuestionIndex > 0 && QuestionIndex<max">Précédent</button>
                <button class="" @click.prevent="suivant" v-if="QuestionIndex<max">Suivant</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import router from '@/router';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();


const QuestionIndex = ref(0);
const max = ref(4);
const imageUrl = ref('');  
const user = ref(computed(() => store.state.user)); 
const imageName = ref('')
const ville = ref('');
const filteredCities = ref([]);

const cities = [
    'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 
    'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 
    'Reims', 'Saint-Étienne', 'Le Havre', 'Grenoble', 'Dijon', 
    'Nîmes', 'Aix-en-Provence', 'Angers', 'Villeurbanne', 'Saint-Denis',
    // Ajoutez d'autres villes si nécessaire
];
const filterCities = () => {
    const searchQuery = ville.value.toLowerCase();
    filteredCities.value = cities.filter(city => 
        city.toLowerCase().includes(searchQuery)
    );
};

const selectCity = (city) => {
    ville.value = city; // Met à jour le champ avec la ville sélectionnée
    filteredCities.value = []; // Vide les suggestions
};

const suivant = () => {
    if (QuestionIndex.value < max.value) {
        QuestionIndex.value++;
         fetchProfil()
    }
};

const precedent = () => {
    if (QuestionIndex.value > 0) {
        QuestionIndex.value--;
    }
};
const Continuer = () => {
    router.push('')
};


// Fonction pour gérer le changement d'image
const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {

        imageName.value = file.name;  // Stocke le nom de l'image
        const reader = new FileReader();

        reader.onload = (e) => {
            imageUrl.value = e.target.result; // Contient les données de l'image en base64

        };
        
        reader.readAsDataURL(file); // Convertit le fichier en Base64
    }
};

// Fonction pour envoyer les données au serveur
const fetchProfil = async () => {

    const fileInput = document.getElementById('image');

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    formData.append('description', "t"); // Ajoute d'autres données
    formData.append('localisation', "t");
    formData.append('gender', "t");
    formData.append('sexual_preference', "t");
    formData.append('id_user', 10);

    const data = {
        description: "t",
        localisation: "t",
        gender: "t",// Assurez-vous que l'image est en base64
        sexual_preference: "t",
        id_user: 10
    };
        
    try {
        const response = await fetch('http://localhost:3000/api/profiles/createProfil', {
            method: 'POST',
            body: formData,
            //image: formData
        })

    } catch (error) {
        console.error('Erreur lors de l\'upload :', error);
    }

};


onMounted(() => {

});

</script>

<style scoped>
.green {
    background-color: rgb(171, 255, 163);
}

.red {
    background-color: rgb(255, 137, 137);
}

progress::-webkit-progress-bar {
    background-color: rgba(231, 231, 231, 0.822);
    height: 5px;
    border-radius: 20px;
}

progress::-webkit-progress-value {
    background-color: #0e7490;
    border-radius: 20px;
}

progress::-moz-progress-bar {
    border-radius: 20px;
}
</style>
