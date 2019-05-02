import './plugins/vuetify';
import Logger from '@mazemasterjs/logger';
import axios from 'axios';
//import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader
import Vue from 'vue';

import App from './App.vue';
import Home from './Home.vue';
import Test from './Test.vue';
import MazeList from './components/MazeList.vue';

const log = Logger.getInstance();

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(MazeList),
}).$mount('#app');
