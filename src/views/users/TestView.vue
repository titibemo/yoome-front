<template>

    <button @click="togglePicker">Choisir un émoji</button>
    <EmojiPicker :native="true" @select="onSelectEmoji" />

</template>

<script setup>
import EmojiPicker from 'vue3-emoji-picker'

// import css
import 'vue3-emoji-picker/css'
</script>

<style>
.emoji-output {
  margin-top: 20px;
  font-size: 2em;
}
</style>

