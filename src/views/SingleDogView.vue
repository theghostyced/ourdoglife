<template>
  <div class="page-wrapper">
    <v-container>
      <v-row v-if="!loading">
        <v-col cols="12">
          <h1 class="text-center">
            {{ $route.params.id }}
          </h1>
          <p class="mb-10 text-center">Check the dogs of {{ $route.params.id }} breed</p>
        </v-col>
        <v-col
          v-for="(dog, i) in dogs"
          :key="i"
          class="d-flex child-flex"
          cols="12"
          md="4"
          sm="6"
          
        >
          <v-img
            :src="`${dog}`"
            :lazy-src="`${dog}`"
            aspect-ratio="1"
            class="grey lighten-2"
          >
            <template v-slot:placeholder>
              <Loader />
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-overlay :value="overlay">
      <v-progress-circular
        :size="100"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import Loader from '@/components/shared/Loader.vue';
import { mapActions } from 'vuex';
export default {
  name: 'Single Dog View',

  components: { Loader },
  mounted() {
    this.fetchDogs();
  },
  methods: {
    ...mapActions(['fetchBreedDogs']),
    async fetchDogs() {
      try {
        this.loading = true;
        this.overlay = true;
        const data = await this.fetchBreedDogs(this.$route.params.id);
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
      overlay: true,
      loading: false,
    };
  },
};
</script>
