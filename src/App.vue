<template>
  <v-app>
    <v-toolbar class='blue-grey lighten-5'>
      <v-toolbar-title> <router-link to="/" tag="span" style="cursor:pointer">Meetups</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down" >
        <v-btn flat v-for="menuItem in menuItems" :key="menuItem.title" router :to="menuItem.link"><v-icon small left >{{menuItem.icon}}</v-icon>{{menuItem.title}}</v-btn>
        <v-btn v-if="!userIsAuthenticated" flat @click.stop="signUpDialog = true" ><v-icon small left >fas fa-user-plus</v-icon>Sign Up</v-btn>
        <v-btn v-if="!userIsAuthenticated" flat @click.stop="signInDialog = true" ><v-icon small left >fas fa-sign-in-alt</v-icon>Sign In</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-dialog v-model="signUpDialog"  max-width="500px">
      <v-card>
        <v-form @submit.prevent="proceedSignUp">
          <v-card-title class="headline blue-grey lighten-5">Sign Up Now</v-card-title>
          <v-alert class="mb-4" :type="signUpStatus.type" :value="showAlert" >{{signUpStatus.msg}}</v-alert>
          <v-card-media src="https://images.pexels.com/photos/533444/pexels-photo-533444.jpeg" height="200px"></v-card-media>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field name="email" type="email" label="Email" v-model="email" :rules="[rules.required]" clearable></v-text-field>
                  <v-text-field name="password" type="password" label="Password" v-model="password" :rules="[rules.required]" clearable></v-text-field>
                  <v-text-field name="confirmPassword" type="password" label="Confirm Password" v-model="confirmPassword" :rules="[rules.required, rules.confirmPassword]" clearable></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary mb-4 mr-4"  type="submit" :loading="loading" :disabled="loading" >Proceed<span slot="loader" class="custom-loader"><v-icon light>cached</v-icon></span></v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog v-model="signInDialog"  max-width="500px">
      <v-card>
        <v-form @submit.prevent="proceedSignIn">
          <v-card-title class="headline blue-grey lighten-5">Please sign in</v-card-title>
          <v-alert class="ma-0" :type="signUpStatus.type" :value="showAlert" >{{signUpStatus.msg}}</v-alert>
          <!-- <v-card-media src="https://images.pexels.com/photos/841228/pexels-photo-841228.jpeg" height="200px"></v-card-media> -->
          <v-card-media src="../static/pexels-photo-841228.jpeg" height="200px"></v-card-media>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field name="email" type="email" label="Email" v-model="email" :rules="[rules.required]" clearable></v-text-field>
                  <v-text-field name="password" type="password" label="Password" v-model="password" :rules="[rules.required]" clearable></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary mb-4 mr-4"  type="submit" :loading="loading" :disabled="loading" >Proceed<span slot="loader" class="custom-loader"><v-icon light>cached</v-icon></span></v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
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
      signUpDialog: false,
      signInDialog: false,
      email: '',
      password: '',
      confirmPassword: '',
      showAlert: false,
      loader: null,
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
      'ProceedSignUp',
      'ProceedSignIn'
    ]),
    proceedSignUp () {
      this.ProceedSignUp({email: this.email, password: this.password })
    },
    proceedSignIn () {
      this.loader = true
      this.ProceedSignIn({email: this.email, password: this.password })
    }
  },
  computed: {
    ...mapGetters([
      'signUpStatus',
      'user',
      'loading'
    ]),
    formIsValid () {
      return this.email !== "" && this.password !== "" && this.confirmPassword !== "" && this.password === this.confirmPassword
    },
    menuItems () {
      let menuItems = [
        // { icon: 'fas fa-user-plus', title: 'Sign Up', link: '/signup' },
        // { icon: 'fas fa-sign-in-alt', title: 'Sign In', link: '/signin' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
        { icon: 'fas fa-users', title: 'View Meetups', link: '/meetups' },
        { icon: 'fas fa-adjust', title: 'Organize Meetup', link: '/meetup/new' },
        { icon: 'fas fa-user-circle', title: 'Profile', link: '/profile' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.user.id !== null && this.user.id !== undefined
    }
  },
  watch : {
    signUpStatus (value) {
      if (value !== null && value !== undefined) {
        this.showAlert = true
        setTimeout(()=> {
          this.showAlert = false
          if (value.hasError === false){
            this.signUpDialog = false
            this.signInDialog = false
            this.$router.push('/')
          }
        },1500)
      }
    }
  },
  name: 'App'
}
</script>

<style>
  body, html, div {
    font-family: 'Montserrat', sans-serif;
  }
    .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

