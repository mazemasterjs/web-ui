import './plugins/vuetify';
//import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader
import Vue from 'vue';
import App from './App.vue';
import Home from './Home.vue';
import Test from './Test.vue';

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(Test),
}).$mount('#app');
