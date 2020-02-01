import React from 'react'
import {render} from 'react-dom'
import App from './App'
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import './index.less'
import {mainRouter} from './routers'
import {ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
render(
    <ConfigProvider locale={zhCN}>
    <Router>
        <Switch>
            <Route path='/admin' render={
                (routerProps)=>{
                    return <App {...routerProps}/>
                }
            } />
            {mainRouter.map((route)=>{
                return <Route key={route.pathname} path={route.pathname} component={route.component}></Route>
            })
            }
            <Redirect to='/admin' from='/' exact></Redirect>
            <Redirect to='/404'></Redirect>
        </Switch>
    </Router>
    </ConfigProvider>,
    document.querySelector('#root')
)
