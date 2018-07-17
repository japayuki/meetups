<template>

    <v-container>
       <v-layout row justify-center>
           <v-flex xs12 sm8 offset-sm2 >
               <form @submit.prevent="create_Meetup">
                <h2>Create a new Meetup</h2>
                <v-text-field name="title" label="Title" prepend-icon="subtitles" v-model="title" clearable :rules="[rules.required]"></v-text-field>
                <v-text-field name="location" label="Location" prepend-icon="place" v-model="location" clearable :rules="[rules.required]"></v-text-field>
                <v-text-field name="imgUrl" label="Image URL" prepend-icon="image" v-model="imgUrl" clearable :rules="[rules.required]"></v-text-field>
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
                <v-btn class="primary" type="submit" :disabled="!formIsValid">Create Meetup</v-btn>
               </form>
           </v-flex>
       </v-layout>
       <!-- <v-layout row>
           <v-flex xs12 sm8 offset-sm2 >
               <form>
                   <v-text-field name="title" label="Title" required></v-text-field>
               </form>
           </v-flex>
       </v-layout> -->
    </v-container>
</template>
<script>
import { mapMutations, mapActions } from 'vuex';
export default {
    
    data () {
        return {
            title: '',
            location: '',
            imgUrl: '',
            description: '',
            rules: {
                required: value => !!value || 'Required.',
                counter: value => value.length <= 20 || 'Max 20 characters',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                }
            },
            date: null,
            time: null,
            menu: false,
            modal: false,
            menu1: false,
            menu2: false,
            picker: null
        }
    },
    computed: {
        formIsValid () {
            return this.title !== "" && this.location !== "" && this.imgUrl !== "" && this.description !== ""
        }
    },
    methods: {
        ...mapActions([
            'createMeetup'
        ]),
        create_Meetup: function() {
            if (!this.formIsValid) {
                return
            }
            const payload = {
                title: this.title,
                location: this.location,
                imgUrl: this.imgUrl,
                description: this.description,
                date: this.date,
                time: this.time,
                mid: '3432f32f34252'
            }
            this.createMeetup(payload)
            this.$router.push("/meetups")
        }
    }
}
</script>
