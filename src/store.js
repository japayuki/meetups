import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loadedMeetups: [
            {imgUrl: 'https://c1.staticflickr.com/7/6075/6094164096_87fd1fa7d2_b.jpg', mid: 'fdfws43e34', title: 'Meetup in Paris', date: '2018-12-12'},
            {imgUrl: 'https://images.pexels.com/photos/450597/pexels-photo-450597.jpeg', mid: 'dfrsedf4353', title: 'Meetup in New York', date: '2018-07-12'},
            {imgUrl: 'https://c1.staticflickr.com/8/7610/16800139540_36cf1bde89_b.jpg', mid: 'd233324523r2f2', title: 'Meetup in Italy', date: '2018-08-04'},
            {imgUrl: 'https://c1.staticflickr.com/8/7324/9361871001_4764d84edb_b.jpg', mid: 'g45dsad3rf3', title: 'Meetup in Manila', date: '2018-01-04'},
            {imgUrl: 'https://c1.staticflickr.com/5/4589/25688225598_f996e79833_b.jpg', mid: 'kj432k42j3d3', title: 'Meetup in Kyoto', date: '2018-11-06'},
            
        ],
        users : {
            id: '3424532543f344',
            registeredMeetups: ['dfrsedf4353']
        }
    },
    getters: {
        sortedMeetups: state => {
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return meetupA.date < meetupB.date
            })
        },
        featuredMeetups: (state, getters) => {
            return getters.sortedMeetups.slice(0,3)
        },
        loadedMeetup (state) {
            return meetupId => {
                return state.loadedMeetups.find((meetup) => {
                    return meetup.mid === meetupId
                })
            }
        }
    },
    mutations: {

    }, 
    actions: {

    }
})