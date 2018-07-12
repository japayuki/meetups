<template>
  <v-app>
    <v-toolbar class='blue-grey lighten-5'>
      <v-toolbar-title> <router-link to="/" tag="span" style="cursor:pointer">Meetups</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down" >
        <v-btn flat v-for="menuItem in menuItems" :key="menuItem.title" router :to="menuItem.link"><v-icon small left >{{menuItem.icon}}</v-icon>{{menuItem.title}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>

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
        
      ]
    }
  },
  name: 'App'
}
</script>

<style>
  body, html, div {
    font-family: 'Montserrat', sans-serif;
  }
</style>

