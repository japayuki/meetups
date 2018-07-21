import store from '../store'

export default (to, from, next) => {
    console.log(store.getters.user.id)
    if (store.getters.user.id) {
        next()
    } else {
        alert('You need to Sign in or Sign Up first')
        next('/')
    }
}