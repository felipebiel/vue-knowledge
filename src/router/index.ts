import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/layout-base.vue'),
        children: [
            {
                path: '/',
                name: 'Home',
                component: () => import('@/views/home.vue'),
            },
            {
                path: '/component-examples',
                name: 'ComponentExamples',
                component: () => import('@/views/component-examples.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory('/vue-knowledge/'),
    routes,
});

export default router;
