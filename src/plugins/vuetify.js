import Vue from 'vue';
// Vuetify library used to make the site look pretty. Basically a material design implementation for vue
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    // Our color theme we used for the vuetify components. Color inspiration taken from adobe color project
    theme: {
        themes: {
            dark: {
                primary: '#164659',
                primaryDark: '#142126',
                secondary: '#346173',
                accent: '#e91e63',
                error: '#f44336',
                warning: '#ff5722',
                info: '#607d8b',
                success: '#4caf50'
            },
        },
        dark: true },
});