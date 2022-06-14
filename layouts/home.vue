<template>
  <v-app class="background" full-height>
    <AppBar/>
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
 .background {
    background-repeat: repeat;
    background: url(../darkness.webp), #070C38;
    background-blend-mode: lighten, normal;
  }

</style>
