const routers=[
    {
        path:'/settings',
        name:"settings",
        component:()=>import("../views/settings.vue")
    },
    {
        path:'/article',
        name:"article",
        component:()=>import("../views/article.vue")
    },
    {
        path:'/home',
        name:"home",
        component:()=>import("../views/home/home.vue")
    },
    {
        path:'/about',
        name:"about",
        component:()=>import("../views/about/about.vue")
    },
    {
        path:'/share',
        name:"share",
        component:()=>import("../views/share/share.vue")
    },
    {
    path: "/",
    redirect: "/settings",
  },
]
export default routers