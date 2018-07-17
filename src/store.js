import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loadedMeetups: [
            {imgUrl: 'https://c1.staticflickr.com/7/6075/6094164096_87fd1fa7d2_b.jpg', mid: 'fdfws43e34', title: 'Meetup in Paris', date: '2018-12-12', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, unde, neque error quod expedita cum dolorem consequatur minus excepturi aperiam, earum quo quos veniam deserunt officiis. Architecto vel aliquid natus!'},
            {imgUrl: 'https://images.pexels.com/photos/450597/pexels-photo-450597.jpeg', mid: 'dfrsedf4353', title: 'Meetup in New York', date: '2018-07-12', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, unde, neque error quod expedita cum dolorem consequatur minus excepturi aperiam, earum quo quos veniam deserunt officiis. Architecto vel aliquid natus!'},
            {imgUrl: 'https://c1.staticflickr.com/8/7610/16800139540_36cf1bde89_b.jpg', mid: 'd233324523r2f2', title: 'Meetup in Italy', date: '2018-08-04', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, unde, neque error quod expedita cum dolorem consequatur minus excepturi aperiam, earum quo quos veniam deserunt officiis. Architecto vel aliquid natus!'},
            {imgUrl: 'https://c1.staticflickr.com/8/7324/9361871001_4764d84edb_b.jpg', mid: 'g45dsad3rf3', title: 'Meetup in Manila', date: '2018-01-04', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, unde, neque error quod expedita cum dolorem consequatur minus excepturi aperiam, earum quo quos veniam deserunt officiis. Architecto vel aliquid natus!'},
            {imgUrl: 'https://c1.staticflickr.com/5/4589/25688225598_f996e79833_b.jpg', mid: 'kj432k42j3d3', title: 'Meetup in Kyoto', date: '2018-11-06', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, unde, neque error quod expedita cum dolorem consequatur minus excepturi aperiam, earum quo quos veniam deserunt officiis. Architecto vel aliquid natus!'},
            
        ],
        users : {
            id: '3424532543f344',
            registeredMeetups: ['dfrsedf4353']
        },
        signUpStatus: {
            hasError: null,
            msg: '',
            type: 'info',
            showAlert: false,
            showDialog: false
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
        loadedMeetup: (state) => (id) => {
            return state.loadedMeetups.find( meetup => meetup.mid === id)
        },
        signUpStatus: (state) => {
            return state.signUpStatus
        }
    },
    mutations: {
        CREATE_MEETUP: (state, payload) => {
            state.loadedMeetups.push(payload)
        },
        SET_USER: (state, payload) => {
            console.log('runnning SET_USER')
            state.users = payload
        },
        UPDATE_SIGNUPSTATUS: (state, payload) => {
            console.log('runnning UPDATE_SIGNUPSTATUS')
            state.signUpStatus = payload
        },
        SHOW_DIALOG: (state) => {
            state.signUpStatus.showDialog = true
        },
        HIDE_DIALOG: (state) => {
            console.log('hiding dialogue')
            state.signUpStatus.showDialog = false
        }
    }, 
    actions: {
        createMeetup: (context, payload) => {
            context.commit("CREATE_MEETUP", payload)
        },
        ProceedSignUp: (context, payload) => {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    const newUser = {
                        id: user.user.uid,
                        registeredMeetups: [],
                        hasError: false,
                        msg:'Sign-up Createtion Successful',
                        type: 'success'
                    }
                    context.commit("SET_USER", newUser)
                    context.commit("UPDATE_SIGNUPSTATUS", {hasError: false, msg: 'Sign Up Creation Successful', type:'success', showAlert: true})
                    context.commit("HIDE_DIALOG")

                })
                .catch(error => {
                    context.commit("UPDATE_SIGNUPSTATUS", {hasError: true, msg: error.message, type: 'error', showAlert: true})
                    context.commit("HIDE_DIALOG")
                })
        }
    }
})