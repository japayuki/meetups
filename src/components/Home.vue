<template>
    <v-container>
        <v-layout row >
            <v-flex xs12>
                <div class="text-xs-center ma-5">
                    <v-progress-circular :size="70" :width="7" color ="primary" v-if="loading" indeterminate></v-progress-circular>
                </div>
            </v-flex>
        </v-layout>
       <v-layout row wrap>
           <v-flex xs12 sm10 offset-sm1>
               
               <v-carousel hide-delimiters="" class='ma-4' v-if="!loading" contain>
                   <v-carousel-item v-for="item in featuredMeetups" :key="item.mid" :src="item.imgUrl" :to="'/meetup/'+item.mid">
                       <div class='title'>
                           {{item.title}}
                       </div>
                   </v-carousel-item>
               </v-carousel>
           </v-flex>
       </v-layout>
       <v-layout row wrap>
           <v-flex xs12 sm6 class="text-xs-center text-sm-right">
               
               <v-btn large class="primary" router to="/meetups">Explore Meetups</v-btn>
           </v-flex>
           <v-flex xs12 sm6 class="text-xs-center text-sm-left">
               <v-tooltip bottom :disabled="user.authenticated">
                <v-btn large class="primary" router to="/meetup/new" slot="activator" :disabled="!user.authenticated">Organize Meetups</v-btn>
                <span>You need to Sign In or Sign Up first</span>
               </v-tooltip>
           </v-flex>
       </v-layout>

    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {

    data () {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'sortedMeetups',
            'featuredMeetups',
            'loading',
            'user'
        ])
    }
}
</script>

<style scoped>
    div.v-carousel {
        border: 10px #05376875 solid;
        border-radius: 5px;
    }
    .title {
        position: absolute;
        top: 10px;
        width: 100%;
        background: rgba(0, 0, 0, 0.582);
        color: rgb(255, 255, 255);
        padding: 5px;
        font-size: 2em;
        text-align: center;
        font-family: 'Montserrat', sans-serif !important;
    }
</style>





