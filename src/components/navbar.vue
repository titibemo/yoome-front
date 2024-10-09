<template>
    <div class="navbar">
        <div class="logo">
            <img src="./../../public/Fichier_3-8.png" alt="">
        </div>
        <div @click="toggleBurgerMenu" class="burgerButton">
            <svg width="64px" height="64px" viewBox="0 0 24 24"  fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
                    <path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
                    <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
                </g>
            </svg>
        </div>
     
        <div :class="isOpen ? 'menu closed' : 'menu open'">
            <router-link @click="toggleBurgerMenu" to="/">Home</router-link> 
            <router-link @click="toggleBurgerMenu" to="/inscription">S'inscrire</router-link>
            <router-link @click="toggleBurgerMenu" to="/connexion">Connexion</router-link>
            <router-link @click="toggleBurgerMenu" to="/profiles">profiles</router-link>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';


const isOpen = ref(true);

const toggleBurgerMenu = () => {
    isOpen.value = !isOpen.value;
    console.log(isOpen.value)
}




</script>


<style lang="scss" scoped>
@import "@/style/variablecouleur.scss";

.navbar {

    margin: 10px;
    display: flex;
    width: 100%;
    left: 0;
    top: 0;
    position: fixed;
    justify-content: space-between;
    margin: 0;
    padding: 10px;
    background-color: $primary ;
    align-items: center;
    z-index: 99;
    a{
        text-decoration: none;
        color:$white;
    }
    .logo {
        img {

            height: 5vh;
        }
    }
    .burgerButton{
        right: 0;
        top: 0;
        margin-right: 10px;
        position: absolute;
    }
    .burgerButton:hover {
        cursor: pointer;
    }
    .menu {
        display: flex;
        flex-direction: column;
        position: absolute;
        background: $primary;
        width: 100vw;
        margin: 0;
        left: 0;
        right: 0;
        top: 7vh;
        color:$second;
        gap: 20px;
        padding-bottom: 20px;
        transition: .5s;
        transform-origin: top;
    }
    .closed {
        transform: scaleY(0);
        transition: .2s;
    }
    .open {
        transform: scaleY(1);
    }
  
}
</style>