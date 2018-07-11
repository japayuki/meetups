<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title>Meetups</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat><v-icon small left >fas fa-users</v-icon>View Meetups</v-btn>
        <v-btn flat>Link Two</v-btn>
        <v-btn flat>Link Three</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer absolute temporary v-model="sideNav">
      <v-list>
        <v-list-tile @click="">
          <v-list-tile-action><v-icon small>fas fa-users</v-icon></v-list-tile-action>
          <v-list-tile-content>View Meetups</v-list-tile-content>
        </v-list-tile>
        
      </v-list>
    </v-navigation-drawer>
    
    <main>
      
    </main>
  
  
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: null
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

