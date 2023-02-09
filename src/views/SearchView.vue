<template>
  <div class="search-page">
    <v-container class="my-5">
      <div class="search-wrapper mx-auto">
        <div class="mx-md-10">
          <v-row>
            <v-col cols="12">
              <v-text-field
                placeholder="Search for a doctor"
                variant="outlined"
                color="primary"
                class="right-input"
                v-model="input"
                v-on:keyup.enter="searchDog"
              >
                <template v-slot:prepend-inner>
                  <img src="@/assets/search.svg" alt="" />
                </template>
              </v-text-field>
              <div class="d-flex justify-center">
                <v-btn
                  outlined
                  color="primary"
                  class="elevation-0 text-capitalize"
                  @click="searchDog()"
                  >Search Dog</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </div>
        <div
          v-if="loading"
          class="searhing-wrapper d-flex flex-column justify-center align-center my-12 py-12"
        >
          <div v-if="!noResults" class="d-flex flex-column justify-center align-center">
            <img src="@/assets/searching.svg" :class="{ loading: loading }" alt="" />
            <p class="my-4">Start Searching your Dog ..</p>
          </div>
        </div>
        <div v-else-if="result" class="cards-wrapper py-6 mx-auto">
          <v-row class="justify-center">
            <v-col cols="12" class="mt-10">
              <div class="result-title text-center">
                <h3>Search Result</h3>
              </div>
            </v-col>
            <v-col style="cursor: pointer" cols="4">
              <router-link :to="`/single-dog/${input}`">
                <v-img
                  :src="`${result}`"
                  :lazy-src="`${result}`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <Loader />
                  </template>
                </v-img>
              </router-link>
            </v-col>
          </v-row>
        </div>
        <p v-if="noResults" style="color: red" class="my-8 text-center">
          No Dog Found...
        </p>
      </div>
    </v-container>
  </div>
</template>

<script>
import Loader from '@/components/shared/Loader.vue';
export default {
  data() {
    return {
      input: '',
      result: null,
      loading: false,
      noResults: false,
    };
  },
  methods: {
    async searchDog() {
      try {

        this.loading = true;
        this.result = null;
        this.noResults = false;
        const res = await fetch(`https://dog.ceo/api/breed/${this.input}/images/random`);
        const data = await res.json();
        if (data.message) {
          this.result = data.message;
        } else {
          this.noResults = true;
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
  components: {
    Loader,
  },
};
</script>

<style>
.right-input input {
  /* text-align: center; */
  padding-left: 20px !important;
}
.search-wrapper {
  max-width: 922px;
  width: 100%;
}
.result-title h3 {
  font-weight: 500;
  font-size: 20px;
  line-height: 27px;
  color: #000000;
}
.result-title span {
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
}
.cards-wrapper {
  max-width: 622px;
  width: 100%;
}
.dog-card {
  border: 1px solid #e6e6e6;
  border-radius: 15.687px;
  width: 100%;
  height: 125px;
}
.dog-card .details {
  flex: 1;
}
.dog-card .img-container {
  width: 125px;
  height: 124px;
}
.dog-card .img-container img {
  border-radius: 13px 0px 0px 13px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.dog-card .name {
  font-weight: 700;
  font-size: 20.9159px;
  line-height: 28px;
  color: #000000;
}
.dog-card .education {
  font-weight: 400;
  font-size: 14.3797px;
  line-height: 19px;

  color: #4d4d4d;
}
.dog-card .calender {
  background: #e9fcf8;
  border: 1.30725px solid #d2f9f1;
  border-radius: 9.15072px;
  height: 41.83px;
  max-width: 109px;
  width: 100%;
  cursor: pointer;
}
@media (max-width: 960px) {
  .dog-card .calender {
    max-width: 41.83px;
  }
}
.calender span {
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #1ab394;
  text-transform: capitalize;
}
.dog-card .field {
  font-weight: 400;
  font-size: 15.687px;
  line-height: 21px;

  color: #1ab394;
  text-decoration: none;
}
.dog-card .location .text {
  font-weight: 400;
  font-size: 14.3797px;
  line-height: 19px;

  color: #000000;
  margin-left: 4px;
}
.loading {
  animation: open 1s ease infinite;
}
@keyframes open {
  from {
    scale: 0.2;
  }
  75% {
    scale: 0.7;
  }
  to {
    scale: 1;
  }
}
.v-pagination__item .v-btn__overlay,
.v-pagination__item .v-btn__underlay {
  display: none !important;
}
.v-pagination__item {
  border: 1px solid #e6e6e6;
}
.v-pagination__item--is-active {
  border-color: #1ab394;
}
.v-pagination__item--is-active button {
  color: #1ab394 !important;
}
</style>
