import React, { Component } from 'react'
import { adminRouter } from './routers'
import { Route, Switch, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'

import {Frame} from './components'
const route=adminRouter.filter(route=>route.isNaN===true)
const mapState=(state)=>{
    const {isLogin}=state.user
    return {isLogin}
}
@connect(mapState)
class App extends Component {
    render() {
        return (
            this.props.isLogin?
            <Frame route={route} >
                <Switch>
                    {adminRouter.map(route => {
                        return <Route key={route.pathname} path={route.pathname} render={(routeProps)=>{
                            return <route.component {...routeProps}/>
                        }}exact={route.exact}></Route>
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
