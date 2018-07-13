<template>
    <v-container>
       <v-layout row>
           <v-flex xs12 sm8 offset-sm2 >
               <h2>Create a new Meetup</h2>
               <v-text-field name="title" label="Title" v-model="title" clearable :rules="[rules.required]"></v-text-field>
               <v-text-field name="location" label="Location" v-model="location" required></v-text-field>
               <v-text-field name="imageUrl" label="Image URL" v-model="imageUrl" required></v-text-field>
               <v-textarea name="description" label="Description" v-model="description" required></v-textarea>
               <h3>Image Preview</h3>
               <img :src="imageUrl" style="width:100%" >
               <v-btn class="primary" :disabled="!formIsValid">Create Meetup</v-btn>
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
export default {
    data () {
        return {
            title: '',
            location: '',
            imageUrl: '',
            description: '',
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
        formIsValid () {
            return this.title !== "" && this.location !== "" && this.imageUrl !== "" && this.description !== ""
        }
    }
}
</script>
