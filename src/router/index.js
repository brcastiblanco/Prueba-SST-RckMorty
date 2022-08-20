import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/characters'
    },
    {
        path: '/characters',
        name: 'Characters',
        component: () =>
            import ('../views/Characters.vue'),
    },
    {
        path: '/character/:id',
        name: 'Character Detail',
        component: () =>
            import ('../views/CharacterDetail.vue'),
    },
    {
        path: '/locations',
        name: 'Locations',
        component: () =>
            import ('../views/Location.vue')
    },
    {
        path: '/location/:id',
        name: 'Location Detail',
        component: () =>
            import ('../views/LocationDetail.vue')
    },
    {
        path: '/episodes',
        name: 'Episodes',
        component: () =>
            import ('../views/Episode.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router