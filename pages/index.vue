<script setup>
import { storeToRefs } from 'pinia';
import { useStore } from "~/store/store"
const router = useRouter();


</script>

<template>
    <NuxtLayout name="home">
        <v-row>
            <v-col>
                <div class="heading-div mt-10">
                    <h3 class="heading heading1">Multi-wallet</h3>
                    <h3 class="heading heading2">Interchain Portfolio</h3>
                    <p class="mt-5 subheading">Monitor all your stake’s temperature in one place</p>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <div class="image-div">
                    <img class="illustration" src="../Illustration.png"/>
                </div>
            </v-col>
        </v-row>
        <div class="myButtons">
            <v-btn @click="router.push('/login')" size="x-large" class="myButton">
                Trak Now
            </v-btn>
        </div>
    </NuxtLayout>   
</template>

<style scoped>
@font-face {
  font-family: "Brandon Grotesque";
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local("Brandon Grotesque"), url("/font/brandon-grotesque-black-58a8a3e824392.otf") format("otf");
}

  .heading {
    font-family: 'Brandon Grotesque';
    font-style: normal;
    font-weight: 500;
    color: #EB928C;
    text-transform: uppercase;
  }

  .heading1 {
    font-size: 64px;
    line-height: 62px;
  }

  .heading2 {
    font-size: 96px;
    line-height: 100px;
  }

  .subheading {
    font-family: 'Fira Code';
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    line-height: 44px;
    text-transform: uppercase;
    color: #FFFFFF;
  }

  .illustration {
    height: 35vh;
  }

  .image-div {
    padding-top: 100px !important;
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
  }

 .myButton {
        background: #070C38!important;
        border: 1px solid #76EFD3!important;
        border-radius: 6px;
        color: #76EFD3;
    }

</style>