<template>
    <v-container>
       <v-layout row wrap>
           <v-flex xs12>
               <v-carousel hide-delimiters="" class='ma-4'>
                   <v-carousel-item v-for="item in meetups" :key="item.id" :src="item.imgUrl" >
                       <div class='title'>
                           {{item.title}}
                       </div>
                   </v-carousel-item>
               </v-carousel>
           </v-flex>
       </v-layout>
       <v-layout row wrap>
           <v-flex xs12 sm6 class="text-xs-center text-sm-right">
               <v-btn large class="primary" router to="/meetups">Explore Meetups</v-btn>
           </v-flex>
           <v-flex xs12 sm6 class="text-xs-center text-sm-left">
               <v-btn large class="primary" router to="/meetup/new">Organize Meetups</v-btn>
           </v-flex>
       </v-layout>

    </v-container>
</template>
<script>
export default {
    data () {
        return {
            meetups: [
                {imgUrl: 'https://images.pexels.com/photos/450597/pexels-photo-450597.jpeg?cs=srgb&dl=america-american-flag-architecture-450597.jpg&fm=jpg', id: 'dfrsedf4353', title: 'Meetup in New York'},
                {imgUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/12/f8/68/3d/big-bus-paris-hop-on.jpg', id: 'fdfws43e34', title: 'Meetup in Paris'},
            ]
        }
    }
}
</script>

<style scoped>
    div.v-carousel {
        border: 10px #05376875 solid;
        border-radius: 5px;
    }
    .title {
        position: absolute;
        top: 10px;
        width: 100%;
        background: rgba(0, 0, 0, 0.582);
        color: rgb(255, 255, 255);
        padding: 5px;
        font-size: 2em;
        text-align: center;
        font-family: 'Montserrat', sans-serif !important;
    }
</style>





