<template dark>
    <div>
    <br/>
    Post a team here!
        <input type="text" v-model="teamName" placeholder="name"/>
        <input type="text" v-model="teamLogo" placeholder="logo"/>
        <br/>
        <input type="button" @click="createTeam()" value="submit">
        <template v-for="team in teams">
            
            <v-list-tile :key="team.id + '-tile'" im>
                <v-list-tile-title v-html="team.name"></v-list-tile-title>
                BOTS:
                 <template v-for="bot in team.bots"> 
                     <v-list-tile :key="bot.id + '-tile'" im>
                         <v-list-tile-title v-html="bot.name"></v-list-tile-title>
                         <v-list-tile-title v-html="bot.coder"></v-list-tile-title>
                     </v-list-tile>
                 </template>
                    <div id=logo>
                        <img v-bind:src="team.logo"/>
                    </div>
                <button v-on:click="deleteTeam(team.id)">Delete</button>
               
            </v-list-tile>
            
        </template>
    <br/>
  
    </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import UUID from 'vue-uuid';
import { uuid } from 'vue-uuid' // Import uuid
Vue.use(UUID);

export default {
     data() {
            return {
                teamName: null,
                teamLogo: null,
                teams: null,
                error: null,
                id: null,
            };
        },
       mounted() {
        this.getTeams()
         },
        methods: {
            deleteTeam(teamId) {
            axios.delete('http://mazemasterjs.com/api/team/delete/' + teamId)
            .then(res => (this.getTeams()))
            .catch((err) => (console.log(err)))
        },
        getTeams() {
            axios.get('http://mazemasterjs.com/api/team/get')
            .then(res => (this.teams = res.data))
            .catch((err) => (console.log(err)))
        },
        async createTeam() {
                await axios.put('http://mazemasterjs.com/api/team/insert', {
                    id: uuid.v1(),
                    name: this.teamName,
                    logo: this.teamLogo,
                    bots: [],
                    trophies: [] 
                })
                .then((res) => {
                    console.log(res)
                    this.getTeams()
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        }
}
</script>

<style>

.v-list__tile {
    height: 250px;
    width: auto;
    display: flex;
    flex-direction: row;
}

input{
    border: 1.5px solid white;
}



</style>



