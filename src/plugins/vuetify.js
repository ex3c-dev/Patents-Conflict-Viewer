import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
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