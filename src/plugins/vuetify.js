import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);
// src/plugins/vuetify.js
import colors from "vuetify/lib/util/colors";
export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#1AB394",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        white: "#fff",
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
});
