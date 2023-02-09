import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const currentBreeds = localStorage.getItem("breeds")
  ? JSON.parse(localStorage.getItem("breeds"))
  : null;
const currentDogs = localStorage.getItem("dogs")
  ? JSON.parse(localStorage.getItem("dogs"))
  : null;
export default new Vuex.Store({
  state: {
    allBreeds: currentBreeds,
    dogs: currentDogs,
  },
  getters: {},
  mutations: {},
  actions: {
    async fetchRandomDog({}, breed) {
      return new Promise(async (resolve, reject) => {
        const data = await fetch(
          `https://dog.ceo/api/breed/${breed}/images/random`
        );
        const res = await data.json();
        resolve({ img: res.message, name: breed });
      });
    },
    async randomDogs({ dispatch, state }) {
      return new Promise(async (resolve, reject) => {
        try {
          if (state.allBreeds) {
            console.log("Here");
            resolve(state.dogs);
          } else {
            console.log("Not Here");
            const breeds = await fetch("https://dog.ceo/api/breeds/list/all");
            const breedsResponse = await breeds.json();
            const allBreeds = Object.keys(breedsResponse.message).map(
              (key) => key
            );
            localStorage.setItem("breeds", JSON.stringify(allBreeds));
            const data = await Promise.all(
              allBreeds.map((b) => dispatch("fetchRandomDog", b))
            );
            console.log(data);
            localStorage.setItem("dogs", JSON.stringify(data));
            resolve(data);
          }
        } catch (e) {
          console.log(e);
          reject(e);
        }
      });
    },
    async fetchBreedDogs({}, payload) {
      return new Promise(async (resolve, reject) => {
        const data = await fetch(`https://dog.ceo/api/breed/${payload}/images`);
        const res = await data.json();
        resolve(res.message);
      });
    },
  },
  modules: {},
});
