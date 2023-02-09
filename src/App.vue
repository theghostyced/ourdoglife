<template>
  <v-app>
    <v-app-bar app color="primary" elevation="0" dark>
      <v-container>
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <router-link to="/">
              <v-img
                alt="Vuetify Logo"
                class="shrink mr-2"
                contain
                src="https://dog.ceo/img/dog-api-logo.svg"
                transition="scale-transition"
                width="40"
              />
            </router-link>
          </div>
          <v-spacer></v-spacer>
          <v-btn elevation="0" to="/search">
            <span class="mr-2">Search</span>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
