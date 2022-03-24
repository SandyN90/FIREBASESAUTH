import { createRouter, createWebHistory } from 'vue-router'

import registerPage from '../components/registerPage.vue'
import loginPage from '../components/loginPage.vue'
import userPage from '../components/userPage.vue'
import LoginPhone from '../components/LoginPhone.vue'
import HelloWorld from '../components/HelloWorld.vue'
const routes = [
    // {
    //     path: '/',
    //     name: 'home',
    //     component: HomePage
    // },
    {
        path: '/',
        name: 'login',
        component: loginPage
    },
    {
        path: '/register',
        name: 'register',
        component: registerPage
    },
    {
        path: '/helloworld',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/user',
        name: 'user',
        component: userPage
    },
    {
        path: '/loginphone',
        name: 'loginPage',
        component: LoginPhone
    }
]
const router = createRouter({ history: createWebHistory(), routes })
export default router

