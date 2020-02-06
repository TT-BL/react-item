import {
    Setting,
    NotFound,
    Login,
    Dashboard,
    Artical,
    Edit,
    Notifications,
    Unauth,
    Profile
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
        pathname: '/admin/dashboard',
        component: Dashboard,
        title:'仪表盘',
        icon:"dashboard",
        isNaN:true,
        roles:['001','002','003']
    },
    {
        
        pathname: '/admin/artical',
        component: Artical,
        exact:true,
        title:'文章管理',
        isNaN:true,
        icon:"copy",
        roles:['001','002','003']
    },
    {
        pathname: '/admin/setting',
        component: Setting,
        title:'设置',
        isNaN:true,
        icon:"setting",
        roles:['001']
    },
    {
        pathname: '/admin/artical/edit/:id',
        component: Edit,
        title:'文章编辑',
        roles:['001']
    },
    {
        pathname: '/admin/notifications',
        component: Notifications,
        roles:['001','002','003']
    },
    {
        pathname: '/admin/unauth',
        component: Unauth,
        roles:['001','002','003']
    },
    {
        pathname: '/admin/profile',
        component: Profile,
        roles:['001','002','003']
    }
    
]