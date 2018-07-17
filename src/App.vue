<template>
  <v-app>
    <v-toolbar class='blue-grey lighten-5'>
      <v-toolbar-title> <router-link to="/" tag="span" style="cursor:pointer">Meetups</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down" >
        <v-btn flat v-for="menuItem in menuItems" :key="menuItem.title" router :to="menuItem.link"><v-icon small left >{{menuItem.icon}}</v-icon>{{menuItem.title}}</v-btn>
        <v-btn flat @click.stop="showDialog" ><v-icon small left >fas fa-user-plus</v-icon>Modal</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Sign Up Now</v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-alert class="mb-4" :type="signUpStatus.type" :value="signUpStatus.showAlert" >{{signUpStatus.msg}}</v-alert>
                <v-text-field name="email" type="email" label="Email" v-model="email" :rules="[rules.required]" clearable></v-text-field>
                <v-text-field name="password" type="password" label="Password" v-model="password" :rules="[rules.required]" clearable></v-text-field>
                <v-text-field name="confirmPassword" type="password" label="Confirm Password" v-model="confirmPassword" :rules="[rules.required, rules.confirmPassword]" clearable></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="primary mb-4 mr-4" flat="flat" @click="proceedSignUp">Proceed</v-btn>
        </v-card-actions>
      </v-card>
      <p>hasError: {{signUpStatus.hasError}}</p>
    </v-dialog>

    <v-navigation-drawer absolute temporary v-model="sideNav">
      <v-list>
        <v-list-tile v-for="menuItem in menuItems" :key="menuItem.title" router :to="menuItem.link">
          <v-list-tile-action><v-icon small>{{menuItem.icon}}</v-icon></v-list-tile-action>
          <v-list-tile-content>{{menuItem.title}}</v-list-tile-content>
        </v-list-tile>
        
      </v-list>
    </v-navigation-drawer>
    
    <main>
      <router-view></router-view>
    </main>
  
  
  </v-app>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      sideNav: null,
      menuItems: [
        { icon: 'fas fa-users', title: 'View Meetups', link: '/meetups' },
        { icon: 'fas fa-adjust', title: 'Organize Meetup', link: '/meetup/new' },
        { icon: 'fas fa-user-circle', title: 'Profile', link: '/profile' },
        { icon: 'fas fa-user-plus', title: 'Sign Up', link: '/signup' },
        { icon: 'fas fa-sign-in-alt', title: 'Sign In', link: '/signin' }
      ],
      dialog: false,
      email: '',
      password: '',
      confirmPassword: '',
      showAlert: false,
      rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length <= 20 || 'Max 20 characters',
          email: value => {
              const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              return pattern.test(value) || 'Invalid e-mail.'
          },
          confirmPassword: value => value === this.password || 'Password does not match'
      },
    }
  },
  methods:
  {
    ...mapActions([
      'ProceedSignUp'
    ]),
    ...mapMutations([
      'SHOW_DIALOG'
    ]),
    proceedSignUp () {
      this.ProceedSignUp({email: this.email, password: this.password })
      // this.showAlert = true
      // if (this.signUpStatus.hasError == true) {
      //   console.log('have errors')
      //   setTimeout(()=> {
      //     this.email = ''
      //     this.password = ''
      //     this.confirmPassword = ''
      //   }, 3000)
      // } else if (this.signUpStatus.hasError == false) {
      //   console.log('has no errors')
      //   setTimeout(()=> {
          

      //     this.dialog = false
      //   },3000)
      // } else {
      //   console.log('else error')
      // }
    },
    showDialog () {
      this.SHOW_DIALOG()
      this.dialog = this.signUpStatus.showDialog
    }

  },
  computed: {
    ...mapGetters([
      'signUpStatus'
    ])
  },
  name: 'App'
}
</script>

<style>
  body, html, div {
    font-family: 'Montserrat', sans-serif;
  }
</style>

