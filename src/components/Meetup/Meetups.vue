<template>
    <v-container>
       <v-layout row wrap>
            <v-flex xs12 md3 class="pa-3" v-for="meetup in testMeetups" :key="meetup.mid">
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
                        <v-tooltip bottom>
                            <v-icon color="red" v-if="user.id && meetup.myMeetup" slot="activator">check</v-icon>
                            <span>You are registered to this meetup</span>
                        </v-tooltip>
                    </v-card-actions>
                </v-card>
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
            'user',
            'sortedMeetups',
            'testMeetups'
            
        ])
    }
}
</script>
