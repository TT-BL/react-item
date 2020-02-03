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
        exact:true,
        title:'文章管理',
        isNaN:true,
        icon:"copy"
    },
    {
        pathname: '/admin/setting',
        component: Setting,
        title:'设置',
        isNaN:true,
        icon:"setting"
    },
    {
        pathname: '/admin/artical/edit/:id',
        component: Edit,
        title:'文章编辑'
    },
    {
        pathname: '/admin/dashboard',
        component: Dashboard,
        title:'Dashboard',
        icon:"dashboard",
        isNaN:true
    }
]