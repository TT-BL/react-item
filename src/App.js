import React, { Component } from 'react'
import { Button } from 'antd'
import { adminRouter } from './routers'
import { Route, Switch, Redirect } from 'react-router-dom'
// const testHOC=(WrappedComponent)=>{
//     return class HOCComponent extends Component{
//         render(){
//             return(
//                 <>
//                     <WrappedComponent></WrappedComponent>
//                     <div>这是一个高阶组件</div>
//                 </>
//             )
//         }
//     }
// }
// @testHOC
class App extends Component {
    render() {
        return (
            <div>
                <div>这是公共的部分</div>
                <Switch>
                    {adminRouter.map(route => {
                        return <Route key={route.pathname} path={route.pathname} component={route.component} exact={route.exact}></Route>
                    })}
                    <Redirect to='/admin/Dashboard' from='/admin'></Redirect>
                    <Redirect to='/404'></Redirect>
                </Switch>
            </div>
        )
    }
}
export default App
