<template>
    <v-container>
       <h2>{{user.username}}'s Registered Meetups</h2>
                  <!-- <p>{{myMeetups}}</p> -->
       <v-layout row wrap>

            <v-flex xs12 md3 class="pa-3" v-for="meetup in myMeetups" :key="meetup.mid">
                <v-card height="400px">
                    <v-card-media
                    :src="meetup.imgUrl"
                    height="200px"
                    ></v-card-media>
                    <v-card-title primary-title>
                        <div>
                            <h2 class="mb-0">{{meetup.title}}</h2>
                            <p>{{meetup.date}}</p>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn flat color="primary" v-bind:to="'/meetup/'+meetup.mid">View Meetup</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            // myMeetups: []
        }
    },
    computed: {
        ...mapGetters([
            'user',
            'myMeetups',
            'loadedMeetup'
        ])
    },
    created () {
        // this.user.registeredMeetups.forEach(element => {
        //     this.myMeetups.push(this.$store.getters.loadedMeetup(element.meetupId))    
        // });
        
    }
}
</script>
