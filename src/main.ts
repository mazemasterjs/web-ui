import './plugins/vuetify';
import Logger, { LOG_LEVELS } from '@mazemasterjs/logger';
//import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader
import Vue from 'vue';
import Home from './Home.vue';
// import App from './App.vue';
// import Test from './Test.vue';
// import MazeList from './components/MazeList.vue';

const log = Logger.getInstance();
log.LogLevel = LOG_LEVELS.DEBUG;
log.ColorDisabled = true;

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(Home),
}).$mount('#app');
