import './plugins/vuetify';
import Logger, { LOG_LEVELS } from '@mazemasterjs/logger';
//import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader
import Vue from 'vue';
import Layout from './Layout.vue';
//import Home from './Home.vue';
// import App from './App.vue';
// import Test from './Test.vue';
// import MazeList from './components/MazeList.vue';

const log = Logger.getInstance();
log.LogLevel = LOG_LEVELS.DEBUG;
log.ColorDisabled = true;

Vue.config.productionTip = false;

Vue.component('home-page', () => import('./page/HomePage.vue'));
Vue.component('maze-list-page', () => import('./page/MazeListPage.vue'));
Vue.component('service-page', () => import('./page/ServicePage.vue'));
Vue.component('game-page', () => import('./page/GamePage.vue'));
Vue.component('debug-page', () => import('./page/DebugPage.vue'));
Vue.component('team-page', () => import('./page/TeamPage.vue'));
Vue.component('bot-editor-page', () => import('./page/BotEditorPage.vue'));
Vue.component('loader', () => import('./components/util/Loader.vue'));
Vue.component('split-panel', () => import('./components/util/SplitPanel.vue'));

new Vue({
    render: (h) => h(Layout),
    components: {
        Layout,
    },
}).$mount('#app');
