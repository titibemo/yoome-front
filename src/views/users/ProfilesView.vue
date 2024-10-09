<template>
    <div class="bodyRegister">
        <div class="progressFull">
            <div :style="`width:${getPercentage()}%`" class="progress"></div>
        </div>

        <form @submit.prevent class="bodypage" v-if="QuestionIndex === 0">
            <div>
                <HeFilledUiUserProfile class="icon" />
                <input type="text" placeholder="NOM" v-model="lastname" required />
            </div>
            <div>
                <IcProfileCircle class="icon" />
                <input type="text" placeholder="PRENOM" v-model="firstname" required />
            </div>

            <p class="nomInput">GENRE</p>
            <div class="paddNone">
                <FlFilledPeopleCommunity class="icon" />
                <select name="sexe" id="" required>
                    <option value=""></option>
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                </select>
            </div>
            <p class="nomInput2">DATE DE NAISSANCE</p>
            <div class="paddNone">
                <McBirthday2Fill class="icon" />
                <input type="date" class="dateN" placeholder="Date de naissance" v-model="birthdate" max="2006-01-01"
                    required />
            </div>
            <div>
                <CoBrandMailRu class="email" />
                <input type="email" placeholder="EMAIL" v-model="email" required />
            </div>
            <div>
                <CgKeyhole class="icon" />
                <input type="password" placeholder="MOT DE PASS" v-model="password" required />
            </div>
            <div>
                <CgKeyhole class="icon" />
                <input type="password" placeholder="VALIDER MOT DE PASS" v-model="password2" required />
            </div>
            <button type="submit" @click="verify">SUIVANT</button>
        </form>

        <div @submit.prevent class="bodypage" v-if="QuestionIndex === 1">
            <p class="titreInfo">INFORMATION SUPPLEMENTAIRE</p>
            <p class="nomInput3">VOTRE VILLE</p>
            <div class="paddNone">
                <FlFilledPeopleCommunity class="icon" />
                <select name="ville" id="ville" required>
                    <option value=""></option>
                    <option value="lille">Lille</option>
                    <option value="tourcoing">Tourcoing</option>
                    <option value="roubaix">Roubaix</option>
                    <option value="paris">Paris</option>
                    <option value="marseille">Marseille</option>
                    <option value="lyon">Lyon</option>
                    <option value="toulouse">Toulouse</option>
                    <option value="nice">Nice</option>
                    <option value="nantes">Nantes</option>
                    <option value="strasbourg">Strasbourg</option>
                    <option value="montpellier">Montpellier</option>
                    <option value="bordeaux">Bordeaux</option>
                </select>
            </div>
            <p class="nomInput2">GENRE RECHERCHER</p>
            <div class="paddNone">
                <FlFilledPeopleCommunity class="icon" />
                <select name="sexe" id="" required>
                    <option value=""></option>
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                </select>
            </div>
            <div class="textarea">
                <MdDescription class="email" />
                <textarea placeholder="Décrivez-vous ainsi que la personne de vos rêves." name="" id=""></textarea>
            </div>
        </div>

        <div class="bodypage" v-if="QuestionIndex === 2">
            <p>1/5. Combien d’enfants avez-vous ? </p>
            <div class="suggestion-item" v-for="(question, index) in question1" :key="index"
                @click="add(question, index)" :class="{ selected: selectedQuestionIndex === index }">
                {{ question }}
            </div>
        </div>

        <div class="bodypage" v-if="QuestionIndex === 3">
            <p>2/5. Quelle est votre situation ? </p>
            <div class="suggestion-item" v-for="(question, index) in question2" :key="index"
                @click="add(question, index)" :class="{ selected: selectedQuestionIndex === index }">
                {{ question }}
            </div>
        </div>

        <div class="bodypage2" v-if="QuestionIndex === 4">
            <p>3/5. choisis des trucs </p>
            <div class="characterTraits-container">
                <div class="characterTraits-item" v-for="(question, index) in question3" :key="index"
                    @click="add(question, index)" :class="{ selected: selectedQuestionIndex === index }">
                    {{ question }}
                </div>
            </div>
        </div>

        <button type="submit" @click="suivant" :disabled="!disa" v-if="QuestionIndex >= 1">SUIVANT</button>
    </div>
</template>

<script setup>
import router from '@/router';
import { ref } from 'vue';
import { HeFilledUiUserProfile, IcProfileCircle, FlFilledPeopleCommunity, McBirthday2Fill, CoBrandMailRu, CgKeyhole, MdDescription } from '@kalimahapps/vue-icons';

const email = ref('');
const firstname = ref('');
const lastname = ref('');
const birthdate = ref('');
const password = ref('');
const password2 = ref('');

const nbenfant = ref('');
const question1 = [ "1", "2", "3", "4", "5 ET +"];
const question2 = [ "CÉlibataire","SÉPARÉ/ÉE","DIVORCÉ/ÉE","VEUF/VEUVE"];
const question3 = ["EMPATHIQUE", "CRÉATIF/VE", "INTROVERTI", "PATIENT/E", "AVENTURIER", "ATTENTIONNÉ/E", "CALME", "PASSIONNÉ/E", "RÉSERVÉ", "AMBITIEUX/IEUSE", "CURIEUX/EUSE", "ORGANISÉ/E", "EXTRAVERTI"]

const selectedQuestionIndex = ref(null);
const QuestionIndex = ref(4); // Démarre à 0 pour la première question
const max = ref(4);
const disa = ref(false)
const getPercentage = () => {
    return (QuestionIndex.value / max.value) * 100; // Modifiez pour correspondre à max
};

const verify = () => {
    if (password.value.length && password.value === password2.value) {
        register();
        suivant();
    } else {
        alert("Les mots de passe ne correspondent pas.");
    }
};

const add = (question, index) => {
    selectedQuestionIndex.value = index; // Mettez à jour l'index sélectionné
    nbenfant.value = question; // Mettez à jour le nombre d'enfants
    console.log(nbenfant.value);
    disa.value = !disa.value
};

const suivant = () => {
    
        QuestionIndex.value++;
        // fetchProfil() // Si vous avez une fonction pour récupérer le profil, décommentez ceci
    
};

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
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            alert("Erreur lors de l'inscription.");
            return;
        }

        await response.json();
        router.push('/connexion');
    } catch (err) {
        console.error('Error during register:', err);
    }
};
</script>

<style lang="scss" scoped>
@import "@/style/variablecouleur.scss";

.suggestion-item {
    padding: 10px;
    cursor: pointer;
    display: flex; // Ajouté pour permettre l'alignement flex
    justify-content: center; // Centrer le texte horizontalement
    align-items: center; // Centrer le texte verticalement
    text-align: center; // C
}

.selected {
    background-color: $primary;
    /* Change la couleur de fond à vert */
    color: white;
    /* Change la couleur du texte si nécessaire */
}

.bodyRegister {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: $white;

    .progressFull {
        height: 2vh;
        background-color: rgba(219, 228, 245, 1);
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: start;
        left: 0;
        width: 100%;
        top: 71px;
        z-index: 5;

        .progress {
            z-index: 6;
            height: 50%;
            transition: 0.5s;
            background-color: rgba(186, 203, 234, 1);
        }
    }

    .bodypage {
        display: flex;
        margin-top: 100px;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        select,
        .dateN {
            width: 80vw;
            height: 40px;
            margin-right: 15px;
            background-color: $white;
            border: 0;
            border-radius: 25px;
        }

        .titreInfo {
            margin-bottom: 50px;
        }

        .nomInput {
            padding-right: 250px;
            align-items: baseline;
            margin: 0;
            color: $primary;
        }

        .nomInput2 {
            padding-right: 140px;
            align-items: baseline;
            margin: 0;
            color: $primary;
        }

        .nomInput3 {
            padding-right: 210px;
            align-items: baseline;
            margin: 0;
            color: $primary;
        }

        .paddNone {
            margin-top: 5px;
        }

        div {
            display: flex;
            margin: 15px;
            align-items: center;
            width: 80vw;
            height: 50px;
            border: 1px solid;
            border-color: $primary;
            border-radius: 999px;
            text-align: center;

            .email {
                width: 15%;
                height: 60%;
                color: $primary;
            }

            .icon {
                width: 15%;
                height: 70%;
                color: $primary;
            }

            input {
                width: 80vw;
                height: 40px;
                background-color: $white;
                border: 0;
                margin-right: 15px;
            }

            textarea {
                width: 80vw;
                height: 150px;
                background-color: $white;
                border: 0;
                margin-right: 15px;
            }

            p {
                color: $primary;
                padding-left: 48%;
                padding-right: 50%;
            }
        }

       

        .textarea {
            display: flex;
            margin: 15px;
            align-items: center;
            width: 80vw;
            height: 200px;
            border: 1px solid;
            border-color: $primary;
            border-radius: 20px;
        }
    }
    .bodypage2 {
        margin-top: 100px;
        display:  flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        .characterTraits-container {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
           
            width: 65%;

            .characterTraits-item {
                display: flex;
                margin: 10px;
                flex-direction: row;
                align-items: center;
                height: 50px;
                border: 1px solid;
                border-color: $primary;
                border-radius: 999px;
                text-align: center;
                padding: 0 20px;
                cursor: pointer;
                input {
                    width: 80vw;
                    height: 40px;
                    background-color: $white;
                    border: 0;
                    margin-right: 15px;
                }
        
            
                p {
                    color: $primary;
                    padding-left: 48%;
                    padding-right: 50%;
                }
            }           
        }

        
    }
}
</style>