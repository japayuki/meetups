<template>

    <v-container>
       <v-layout row justify-center>
           <v-flex xs12 md6 >
               <form @submit.prevent="create_Meetup" ref="createMeetupForm">
                <h2>Create a new Meetup</h2>
                <v-text-field name="title" label="Title" prepend-icon="subtitles" v-model="title" clearable :rules="[rules.required]"></v-text-field>
                <v-text-field name="location" label="Location" prepend-icon="place" v-model="location" clearable :rules="[rules.required]"></v-text-field>
                <!-- <v-text-field name="imgUrl" label="Image URL" prepend-icon="image" v-model="imgUrl" clearable :rules="[rules.required]"></v-text-field> -->
                <v-btn @click="onFilePick">UPLOAD IMAGE</v-btn><input ref="fileInput" style="display:none" type="file" accept="image/*" @change="onFilePicked">
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
                    <v-btn class="primary" type="submit" :disabled="!formIsValid">Create Meetup</v-btn>
                </v-flex>
               </form>
           </v-flex>
       </v-layout>
    </v-container>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
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
            picker: null,
            image: null
        }
    },
    computed: {
        ...mapGetters([
        'loading',
        'user'
        ]),
        formIsValid () {
            return this.title !== "" && this.location !== "" && this.description !== ""
        }
        
    },
    methods: {
        ...mapActions([
            'createMeetup'
        ]),
        create_Meetup: function() {
            if (!this.formIsValid || !this.image) {
                return
            }
            const payload = {
                title: this.title,
                location: this.location,
                image: this.image,
                // imgUrl: this.imgUrl,
                description: this.description,
                date: this.date,
                time: this.time,
                creatorId: this.user.id,
                creatorName: this.user.username
            }
            this.createMeetup(payload)
            this.$router.push("/meetups")
        },
        onFilePick() {
            this.$refs.fileInput.click()
        },
        onFilePicked(event) {
            const files = event.target.files
            console.log(files[0])
            let filename = files[0].name
            if (filename.lastIndexOf('.') <= 0){
                return alert('Please upload a valid file')
            }
            const fileReader = new FileReader()
            fileReader.addEventListener('load',() => {
                this.imgUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        }
    }
}
</script>
