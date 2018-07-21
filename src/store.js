import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loadedMeetups: [
            // {imgUrl: 'https://c1.staticflickr.com/7/6075/6094164096_87fd1fa7d2_b.jpg', mid: 'fdfws43e34', title: 'Meetup in Paris', date: '2018-12-12', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, unde, neque error quod expedita cum dolorem consequatur minus excepturi aperiam, earum quo quos veniam deserunt officiis. Architecto vel aliquid natus!'},
            // {imgUrl: 'https://images.pexels.com/photos/450597/pexels-photo-450597.jpeg', mid: 'dfrsedf4353', title: 'Meetup in New York', date: '2018-07-12', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, unde, neque error quod expedita cum dolorem consequatur minus excepturi aperiam, earum quo quos veniam deserunt officiis. Architecto vel aliquid natus!'},
            // {imgUrl: 'https://c1.staticflickr.com/8/7610/16800139540_36cf1bde89_b.jpg', mid: 'd233324523r2f2', title: 'Meetup in Italy', date: '2018-08-04', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, unde, neque error quod expedita cum dolorem consequatur minus excepturi aperiam, earum quo quos veniam deserunt officiis. Architecto vel aliquid natus!'},
            // {imgUrl: 'https://c1.staticflickr.com/8/7324/9361871001_4764d84edb_b.jpg', mid: 'g45dsad3rf3', title: 'Meetup in Manila', date: '2018-01-04', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, unde, neque error quod expedita cum dolorem consequatur minus excepturi aperiam, earum quo quos veniam deserunt officiis. Architecto vel aliquid natus!'},
            // {imgUrl: 'https://c1.staticflickr.com/5/4589/25688225598_f996e79833_b.jpg', mid: 'kj432k42j3d3', title: 'Meetup in Kyoto', date: '2018-11-06', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, unde, neque error quod expedita cum dolorem consequatur minus excepturi aperiam, earum quo quos veniam deserunt officiis. Architecto vel aliquid natus!'},
            
        ],
        user : {
            id: null,
            registeredMeetups: [],
            authenticated: false
        },
        signUpStatus: {
            hasError: null,
            msg: '',
            type: 'info',
        },
        loading: false,
        error: null
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
        },
        user: (state) => {
            return state.user
        },
        loading: (state) => {
            return state.loading
        }
    },
    mutations: {
        CREATE_MEETUP: (state, payload) => {
            state.loadedMeetups.push(payload)
        },
        SET_USER: (state, payload) => {
            state.user = payload
        },
        UPDATE_SIGNUPSTATUS: (state, payload) => {
            state.signUpStatus = payload
        },
        SET_LOADING: (state, payload) => {
            state.loading = payload
        },
        SET_ERROR: (state, payload) => {
            state.error = payload
        },
        FETCHED_MEETUPS: (state, payload) => {
            state.loadedMeetups = payload
        }
    }, 
    actions: {
        fetchMeetups: (context) => {
            context.commit("SET_LOADING", true)
            firebase.database().ref('meetups').once('value')
                .then( data => {
                    context.commit("SET_LOADING", false)
                    const fetchedMeetups = []
                    const obj = data.val()
                    for ( let key in obj){
                        fetchedMeetups.push({
                            mid: key,
                            description: obj[key].description,
                            title: obj[key].title,
                            imgUrl: obj[key].imgUrl,
                            location: obj[key].location,
                            date: obj[key].date,
                            time: obj[key].time
                        })
                    }
                    context.commit('FETCHED_MEETUPS',fetchedMeetups)
                })
                .catch( error => {
                    context.commit("SET_LOADING", false)
                    console.log(error)
                })
        },
        createMeetup: (context, payload) => {
            firebase.database().ref('meetups').push(payload)
                .then( data => {
                    payload.mid = data.key
                    context.commit("CREATE_MEETUP", payload)
                })
                .catch( error => {
                    console.log(error)
                })
        },
        ProceedSignUp: (context, payload) => {
            context.commit("SET_LOADING", true)
            context.commit("SET_ERROR", null)
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    context.commit("SET_LOADING", false)
                    const newUser = {
                        id: user.user.uid,
                        registeredMeetups: [],
                        authenticated: true
                    }
                    context.commit("SET_USER", newUser)
                    context.commit("UPDATE_SIGNUPSTATUS", {hasError: false, msg: 'Sign Up Creation Successful', type:'success'})
                })
                .catch(error => {
                    context.commit("SET_LOADING", false)
                    context.commit("SET_ERROR", error)
                    context.commit("UPDATE_SIGNUPSTATUS", {hasError: true, msg: error.message, type: 'error'})
                })
        },
        ProceedSignIn: (context, payload) => {
            context.commit("SET_LOADING", true)
            context.commit("SET_ERROR", null)
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    context.commit("SET_LOADING", false)
                    const newUser = {
                        id: user.user.uid,
                        registeredMeetups: [],
                        authenticated: true
                    }
                    context.commit("SET_USER", newUser)
                    context.commit("UPDATE_SIGNUPSTATUS", {hasError: false, msg: 'Sign In Successful', type:'success'})
                })
                .catch(error => {
                    console.log(error)
                    context.commit("SET_LOADING", false)
                    context.commit("SET_ERROR", error)
                    context.commit("UPDATE_SIGNUPSTATUS", {hasError: true, msg: error.message, type: 'error'})
                })
        }
    }
})