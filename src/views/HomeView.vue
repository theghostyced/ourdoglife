<template>
  <div class="page-wrapper">
    <v-container>
      <v-row v-if="!loading">
        <v-col
          @click="$router.push(`/single-dog/${dog.name}`)"
          v-for="(dog, i) in dogs"
          :key="i"
          class="d-flex child-flex"
          cols="12"
          md="4"
          sm="6"
          style="cursor: pointer"
        >
          <v-card>
            <v-img
              :src="`${dog.img}`"
              :lazy-src="`${dog.img}`"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <Loader />
              </template>
            </v-img>
            <v-card-title class="text-h6 text-capitalize"> {{ dog.name }} </v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-overlay :absolute="absolute" :value="overlay">
          <div class="text-center">
            <v-progress-circular
              :size="100"
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
        </v-overlay>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Loader from '@/components/shared/Loader.vue';
import { mapActions } from 'vuex';
export default {
  name: 'Home',

  components: { Loader },
  mounted() {
    this.fetchDogs();
  },
  methods: {
    ...mapActions(['randomDogs']),
    async fetchDogs() {
      try {
        this.loading = true;
        this.overlay = true;
        const data = await this.randomDogs();
        this.dogs = data;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
        this.overlay = false;
      }
    },
  },
  data() {
    return {
      dogs: [],
      absolute: true,
      overlay: false,
      loading: false,
    };
  },
};
</script>
