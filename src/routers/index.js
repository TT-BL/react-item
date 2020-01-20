import {
    Setting,
    NotFound,
    Login,
    Dashboard,
    Artical,
    Edit
} from '../views'
export const mainRouter=[
    {
        pathname: '/login',
        component: Login,
    },
    {
        pathname: '/404',
        component: NotFound
    },
] 
export const adminRouter=[
    {
        pathname: '/admin/artical',
        component: Artical,
        exact:true
    },
    {
        pathname: '/admin/setting',
        component: Setting,
    },
    {
        pathname: '/admin/artical/edit/:id',
        component: Edit,
    },
    {
        pathname: '/admin/dashboard',
        component: Dashboard,
    }
]