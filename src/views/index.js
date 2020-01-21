import {Loading} from '../components'
import Loadable from 'react-loadable'
// import Loadable from './loadable'
const Setting=Loadable({
    loader:()=>import('./Setting'),
    loading:Loading
})
const NotFound=Loadable({
    loader:()=>import('./NotFound'),
    loading:Loading
})
const Login=Loadable({
    loader:()=>import('./Login'),
    loading:Loading
})
const Dashboard=Loadable({
    loader:()=>import('./Dashboard'),
    loading:Loading
})
const Artical=Loadable({
    loader:()=>import('./Artical'),
    loading:Loading
})
const Edit=Loadable({
    loader:()=>import('./Artical/edit'),
    loading:Loading
})

export {
    Setting,
    NotFound,
    Login,
    Dashboard,
    Artical,
    Edit
}