import { createRouter, createWebHistory } from 'vue-router'

const routes = []

const modules = import.meta.glob('./page/**/*.vue')

Object.keys(modules).forEach((path)=> {
    const name = path.match(/\.\/page\/(.*)\.vue$/)[1];
    const component = modules[path];

    routes.push({
        path: `${name === 'index' ? '/' : '/' + name.toLowerCase()}`,
        name: name === 'index' ? 'Email editor': name,
        component: component.default || component
    });
})

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router