let firstRouterChange = true
export default function ({ app, store, error, redirect, route }) {
  if (firstRouterChange) {
    app.router.beforeResolve((to, from, next)=>{
      store.dispatch('USER_INIT').then(()=>{
        firstRouterChange = false
        next()
      })
    })
  }else{
    app.router.beforeEach((to, from, next) => {
      store.dispatch('USER_INIT').then(()=>{
        next()
      })
    })
  }
}
