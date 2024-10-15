<template>
    <label class="file-upload">
        <input type="file" id="image" name="image" accept="image/*" @change="onFileChange" />
        <img v-if="imageUrl" :src="imageUrl" alt="Aperçu de votre photo" class="file-upload">
        <MdOutlinedAddAPhoto class="uploadPicture"/>
    </label>
</template>

<script setup>
const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {

        imageName.value = file.name;  // Stocke le nom de l'image
        const reader = new FileReader();

        reader.onload = (e) => {
            imageUrl.value = e.target.result; // Contient les données de l'image en base64

        };
        if (imageName.value.length >= 1) {
            disa.value = true
        } else disa.value = false
        reader.readAsDataURL(file); // Convertit le fichier en Base64
    }
};
</script>

<style>

.file-upload {
    width: 300px; 
    height: 400px; 
    border: 1px solid rgba(249, 112, 104, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer; 
    border-radius: 35px;
    margin: auto;
}

.file-upload input[type="file"] {
    display: none;
}

.uploadPicture{
    width: 60px;
    height: 60px;
}
</style>