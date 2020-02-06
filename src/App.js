import React, { Component } from 'react'
import { adminRouter } from './routers'
import { Route, Switch, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'

import {Frame} from './components'
const route=adminRouter.filter(route=>route.isNaN===true)
const mapState=(state)=>{
    const {isLogin,role}=state.user
    return {isLogin,role}
}
@connect(mapState)
class App extends Component {
    render() {
        return (
            this.props.isLogin?
            <Frame route={route} >
                <Switch>
                    {adminRouter.map(route => {
                        // console.log(route.roles.includes(this.props.role))
                        return (
                        <Route key={route.pathname} path={route.pathname} render={(routeProps)=>{
                            return  route.roles.includes(this.props.role)?<route.component {...routeProps}/> :<Redirect to='/admin/unauth'></Redirect>
                        }}exact={route.exact}></Route>
                        )
                    })}
                    <Redirect to='/admin/dashboard' from='/admin'></Redirect>
                    <Redirect to='/404'></Redirect>
                </Switch>
            </Frame>
            :
            <Redirect to='/login'></Redirect>
        )
    }
}
export default App
