<template>
    <v-container>
       <v-layout row wrap>
           <v-flex xs12 sm8 offset-sm2>
               <v-card>
                    <v-card-title primary-title>
                        <div>
                            <h2 class="mb-0">
                                {{meetup.title}}
                                
                            </h2>
                            
                        </div>
                    </v-card-title>
                    <v-card-media :src="meetup.imgUrl" height="400px"></v-card-media>
                    <v-card-text>
                        <h3 class="ma-2"><v-icon class="mr-2" left>event</v-icon>{{meetup.date}}</h3> 
                        <h3 class="ma-2"><v-icon class="mr-2" left>access_time</v-icon> {{meetup.time}}</h3>
                        <h3 class="ma-2"><v-icon class="mr-2" left>account_circle</v-icon> {{meetup.creatorName}}</h3>
                        <p>{{meetup.description}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <app-edit-dialog class="ma-2" :meetup="meetup" :id="id" v-if=isCreator></app-edit-dialog>
                        <v-btn class="ma-2" color="primary" v-if="!notAllowedToRegister && user.id"  @click='onRegister'>REGISTER</v-btn>
                        <v-btn class="ma-2" color="warning" v-if="notAllowedToRegister && !isCreator && user.id"  @click='onUnRegister'>UNREGISTER</v-btn>
                    </v-card-actions>
                </v-card>
           </v-flex>
       </v-layout>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    props: ['id'],
    data () {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'user'
        ]),
        meetup () {
            return this.$store.getters.loadedMeetup(this.id)
        },
        isCreator() {
            return this.user.id === this.meetup.creatorId
        },
        notAllowedToRegister() {
            return this.user.registeredMeetups.findIndex( el => el.meetupId === this.meetup.mid) >= 0 ? true : false || this.isCreator
            // return this.user.registeredMeetups.findIndex( el => el.meetupId === this.meetup.mid)
            // return this.user.registeredMeetups.includes(this.meetup.mid) || this.isCreator
            // return this.meetup.mid

        }
    },
    methods: {
        ...mapActions([
            'registerToMeetup',
            'unRegisterToMeetup'
        ]),
        onRegister() {
            const payload = {
                id: this.user.id,
                meetupId: this.meetup.mid
            }
            this.registerToMeetup(payload)
        },
        onUnRegister() {
            const payload = {
                id: this.user.id,
                meetupId: this.meetup.mid
            }
            this.unRegisterToMeetup(payload)
        }
    }
}
</script>