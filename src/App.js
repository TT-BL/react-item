import React, { Component } from 'react'
import { adminRouter } from './routers'
import { Route, Switch, Redirect } from 'react-router-dom'

import {Frame} from './components'
const route=adminRouter.filter(route=>route.isNaN===true)
class App extends Component {
    render() {
        return (
            <Frame route={route} >
                <Switch>
                    {adminRouter.map(route => {
                        return <Route key={route.pathname} path={route.pathname} render={(routeProps)=>{
                            return <route.component {...routeProps}/>
                        }}exact={route.exact}></Route>
                    })}
                    <Redirect to='/admin/Dashboard' from='/admin'></Redirect>
                    <Redirect to='/404'></Redirect>
                </Switch>
            </Frame>
        )
    }
}
export default App
