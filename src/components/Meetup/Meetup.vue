<template>
    <v-container>
       <v-layout row wrap>
           <v-flex xs12>
               <v-card>
                    <v-card-title primary-title>
                        <div>
                            <h2 class="mb-0">{{meetup.title}}</h2>
                        </div>
                    </v-card-title>
                    <v-card-media
                    :src="meetup.imgUrl"
                    height="400px"
                    ></v-card-media>


                    <v-card-text>
                        <p>{{meetup.date}}</p>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, unde, neque error quod expedita cum dolorem consequatur minus excepturi aperiam, earum quo quos veniam deserunt officiis. Architecto vel aliquid natus!</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-2" color="primary">REGISTER</v-btn>
                    </v-card-actions>
                </v-card>
           </v-flex>
       </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: ['id'],
    data () {
        return {
        }
    },
    computed: {
       meetup () {
           return this.$store.getters.loadedMeetup(this.id)
       }
    }
}
</script>