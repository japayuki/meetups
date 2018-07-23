<template>
    <v-dialog max-width="500px" v-model="editDialog">
        <v-btn fab slot="activator">
            <v-icon dark>edit</v-icon>
        </v-btn>
        <v-card>
            <v-card-title class="headline grey lighten-2">
                Edit Meetup
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <form @submit.prevent="onSaveChanges" ref="EditDialogForm">
                                <v-text-field name="title" label="Title" prepend-icon="subtitles" v-model="title" clearable :rules="[rules.required]"></v-text-field>
                                <v-text-field name="location" label="Location" prepend-icon="place" v-model="location" clearable :rules="[rules.required]"></v-text-field>
                                <v-menu ref="menu2" :close-on-content-click="false" v-model="menu2" :nudge-right="40" :return-value.sync="date" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                    <v-text-field slot="activator" v-model="date" label="Date" prepend-icon="event" readonly></v-text-field>
                                    <v-date-picker v-model="date" @input="$refs.menu2.save(date)"></v-date-picker>
                                </v-menu>
                                <v-menu ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" :return-value.sync="time" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                    <v-text-field slot="activator" v-model="time" label="Time" prepend-icon="access_time" readonly></v-text-field>
                                    <v-time-picker v-model="time" @input="$refs.menu1.save(time)" :scrollable="true"></v-time-picker>
                                </v-menu>
                                <v-textarea name="description" label="Description" v-model="description" clearable :rules="[rules.required]"></v-textarea>
                                <h3>Image Preview</h3>
                                <img :src="imgUrl" style="width:100%" >
                                
                                <v-flex xs12 md6 class="text-xs-left">
                                    <!-- <v-btn class="primary"   type="submit" :loading="loading" :disabled="loading" >Create Meetup<span slot="loader" class="custom-loader"><v-icon light>cached</v-icon></span></v-btn> -->
                                    <v-btn class="primary" type="submit" :disabled="!formIsValid">Save Changes</v-btn>
                                </v-flex>
                            </form>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
import { mapActions } from 'vuex'

export default {
    props: ['meetup','id'],
    data () {
        return {
            title: this.meetup.title,
            location: this.meetup.location,
            date: this.meetup.date,
            time: this.meetup.time,
            description: this.meetup.description,
            imgUrl: this.meetup.imgUrl,
            menu1: false,
            menu2: false,
            picker: null,
            modal: false,
            editDialog: false,
            rules: {
                required: value => !!value || 'Required.',
                counter: value => value.length <= 20 || 'Max 20 characters',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                }
            }
        }
    },
    computed: {
        formIsValid() {
            return this.meetup.title !== '' && this.meetup.location !== '' && this.meetup.description !== ''
        }
    },
    methods: {
        ...mapActions([
            'updateMeetup',
            'fetchMeetups'
        ]),
        onSaveChanges() {
            const payload = {
                title: this.title,
                location: this.location,
                date: this.date,
                time: this.time,
                description: this.description,
                imgUrl: this.imgUrl,
                id: this.id            
            }
            console.log(payload)
            this.updateMeetup(payload)
            this.fetchMeetups()
            this.editDialog = false
        }
    }
}
</script>

