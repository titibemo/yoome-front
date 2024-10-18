<template>

  <section class="matches">
    <div class="comeBack" @click="comeBack">
      <BsArrowLeftShort/>
    </div>
    <div v-for="user in match">
      <a href="">
        <div>
          <div>
            <img :src="`${url}${user.selfie}`" alt="selfie">
            <div class="otherData">
              <p>{{user.firstname}}</p>
              <p>{{user.age}} ans</p>
            </div>
          </div>
        </div>
      </a>

    </div>
  </section>

  <div class="chat-container">

      <div class="chat-window">
        <div class="messages-container" ref="article">
          
            <div v-for="(val, index) in messages" :key="index" :class="[val.user === idUser ? 'right-bubble' : 'left-bubble']">
               <p class="message">
                <span class="firstname">{{ val.user }}</span>
                {{ val.message }}
              </p>
              <p class="hour">{{val.hour}}</p>
            </div>

        </div>
        <div class="chat-input">
            <form @submit.prevent="sendMessage(username,text)">
            <input class="writing" type="text" v-model="text" placeholder="Ecrivez votre message" />
            <button type="submit"><BsArrowUpCircleFill/></button>
            </form>
        </div>
      </div>
    </div>

</template>

<script setup>

import { useRouter } from 'vue-router';

import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router'
import { BsArrowUpCircleFill, BsArrowLeftShort } from '@kalimahapps/vue-icons';
import store from '@/store';

import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const router = useRouter();
const user = computed(() => store.state.user || {});
const url = `${process.env.VUE_APP_IP_ADDRESS}/uploads/`;
const idUser = user.value.id;
const match = ref([]);
const route = useRoute()
const id = route.params.id

console.log("idUser", idUser);


//-----------------------Return to matches

const comeBack = () =>{
  router.push('/matchs')
}



//---------------------------------------------------- retreive message

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
    }
};

fetch(`${process.env.VUE_APP_IP_ADDRESS}/api/messages/listMessage/${id}`, options).then(handleFetch);

function handleFetch(response)
{

  if(response.ok)
    {
      response.json()
        .then(data=>{
            console.log("message", data);

            data.forEach(allMessage => {
              messages.value.push({
                message: allMessage.message,
                hour: format(parseISO(allMessage.created_at), 'HH:mm', { locale: fr }),
                user: allMessage.id_user
              })            
              
            });
    
        })
        .catch(error=>console.error(error));
    }
    else
    {
        console.error(response.statusText);
    }
  }

  //---------------------------------------------------- show the current match

  const optionsMatch = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        // body: id,
    }
};

fetch(`${process.env.VUE_APP_IP_ADDRESS}/api/matchs/match?idUser=${idUser}&id=${id}`, optionsMatch).then(handleFetch2);

function handleFetch2(response)
{

  if(response.ok)
    {
      response.json()
        .then(user=>{

            let ageOfperson;
            
            const calculateAge = (birthdate) => {
              
              const birthDate = new Date(birthdate);
              const today = new Date();
              let age = today.getFullYear() - birthDate.getFullYear();
              const monthDiff = today.getMonth() - birthDate.getMonth();
              if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
              }
              return ageOfperson = age
            };
            calculateAge(user[0].birthdate)


            
            match.value.push({
                    firstname: user[0].firstname,
                    selfie: user[0].selfie,
                    age: ageOfperson
                })      
                console.log(match.value);
                
        })
        .catch(error=>console.error(error));
    }
    else
    {
        console.error(response.statusText);
    }
  }




  //-------------------------------------- WEBSOCKET
  
  const username = ref(null)
  const text = ref(null)
  const messages = ref([])
  const socket = new WebSocket(`ws://${process.env.VUE_APP_WEB_SOCKET}`)

  //sendMessage
  const sendMessage = async () => {

    const date = new Date();
    let sendingTime = null;
    let sendingTimeChat = null;
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    const hour = String(date.getHours());
    const minute = String(date.getMinutes());
    const second = String(date.getSeconds());

    sendingTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`
    sendingTimeChat = `${minute}:${second}`;

    const data = {
    message: text.value,
    id_channel: id,
    id_user: idUser,
    hour: sendingTime
  };

  try {
    const response = await fetch(`${process.env.VUE_APP_IP_ADDRESS}/api/messages/addMessage`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });
    
    
    if (!response.ok) {
      console.log("ERREUR");
      alert("Impossible de sauvegarder le message");
      return;
    }

    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error('Message non sauvegarder:', err);
  }
    //TODO username et IDUSER
   
      const messageData = { user: idUser, message: text.value, hour: sendingTimeChat};
      // Send the message data to the server using WebSockets
      socket.send(JSON.stringify(messageData))
      // Add the message data to the messages array
      messages.value.push(messageData)
      // Clear the text input
      text.value = null;
}
  

  

  // Define a WebSocket 'onmessage' event handler to receive messages from the server
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    messages.value.push(message);
  }





  //------------------------------- SCROLL

  //------------------ go to the end + automatic scroll


const article = ref(null);

// onMounted(() => {
//       setTimeout(() => {
//         window.scrollTo(0, document.body.scrollHeight);
//       }, 300); 
//     });

// function goToTheEnd(){
//   setTimeout(() => {
//     window.scrollTo(0, document.body.scrollHeight);
//   }, 50);
// }

const scrollToEnd = () => {
  if (article.value) {
    setTimeout(() => {
      const { offsetTop, clientHeight } = article.value;
      const end = offsetTop + clientHeight *0.9;
      window.scrollTo({ top: end});
    }, 100); 
  }
};

const scrollEveryMessage = () => {
  if (article.value) {
    setTimeout(() => {
      const { offsetTop, clientHeight } = article.value;
      const end = offsetTop + clientHeight;
      window.scrollTo({ top: end, behavior: 'smooth'});
    }, 100); 
  }
};

// Utilisation de onMounted pour le défilement automatique
onMounted(() => {
  scrollToEnd();
});

watch(messages.value, async () => { 
  await scrollEveryMessage();
});
  


</script>

<style scoped lang="scss">
@import './../../style/variablecouleur.scss';

.matches{
    display: flex;
    height: 100px;
    background-color: #FCE2E2;
    justify-content: flex-start;
    align-items: center;
    .comeBack{
      cursor: pointer;
      height: 80%;
      font-size: 1.5em;
    }
    a{
      text-decoration: none;
      color: black;
      div{
        margin: 0 5px 0 5px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
          img{
              display: flex;
              justify-content: center;
              border: 1px solid $primary;
              width: 50px;
              height: 50px;
              border-radius: 50%;
          }
          p{
              margin-left: 10px;
              font-size: 1em;
              color: $primary;

          }
        }
        /*div:nth-of-type(1){
            display: flex;
            flex-direction: row;
            margin-left: 15px;
        }*/
        .otherData{
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          p:nth-of-type(2){
            font-size: 0.7em;
          }
        }
    }
}

.chat-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: auto;
  }
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-content {
    background-color: #3d2aac;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px #333;
    text-align: center;
    color: white;
  }
  .modal-content input{
    padding: 10px;
    border-radius: 5px;
    border: none;
    margin-bottom: 10px;
  }
  .modal-content button{
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #9b59b6;
    color: white;
  }
  .chat-window {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .chat-messages{
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }

  form{
    width: 100%;
    display: flex;
    align-items: center;
    height: 60px;
  }
  
  .chat-input {
    background-color: white;
    padding: 5px;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .writing{
    padding: 5px;
    border: none;
    border-radius: 10px;
    background-color: $primary;
    color: white;
    margin-left: 20px;
    width: 90%;
    height: 50%;
  }
  .chat-input button {
    background-color: white;
    color: rgb(249, 112, 104);
    padding: 5px;
    margin-left: 5px;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 2em;
  }
  .messages-container{
    background-color: white;
  }
  
  .right-bubble{
    background-color: #FCE2E2;
    border-radius: 15px;
    padding: 10px 15px;
    word-wrap: break-word;
    margin: 10px;
    float: right;
    color: black;
    width:60%;
    text-align: right;
  }
    
  .left-bubble{
    background-color: #DBE4F5;
    border-radius: 15px;
    padding: 5px 10px;
    word-wrap: break-word;
    margin: 10px;
    float: left;
    color: black;
    width:60%;
    text-align: left;
  }

  .firstname{
    display: none;
  }
  .hour{
    display: block;
    font-size: 0.7em;
    margin-top: 3px
  }
</style>