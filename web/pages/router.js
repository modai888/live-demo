'use strict'

module.exports = function (r) {
    return [
        {
            name: 'home',
            path: '/',
            chunkName: 'page_home',
            component: r(__dirname, './index.vue')
        },
        {
            name: 'competitions',
            path: '/competitions',
            chunkName: 'page_competitions',
            component: r(__dirname, './competitions.vue')
        },
        {
            name: 'experts',
            path: '/experts',
            chunkName: 'page_experts',
            component: r(__dirname, './experts.vue')
        },
        {
            name: 'ask-for-competition',
            path: '/ask-for-competition',
            chunkName: 'page_ask-for-competition',
            component: r(__dirname, './ask-for-competition.vue')
        },
        {
            name: 'profile',
            path: '/profile',
            chunkName: 'page_profile',
            component: r(__dirname, './profile.vue')
        },
        {
            name: 'help',
            path: '/help',
            chunkName: 'page_help',
            component: r(__dirname, './help.vue')
        },
        {
            path: '/course',
            chunkName: 'page_course',
            component: r(__dirname, './course.vue'),
            children: [
                {
                    name: 'course',
                    path: 'list',
                    chunkName: 'page_course_list',
                    component: r(__dirname, './course/list.vue')
                },
                {
                    name: 'course-id',
                    path: ':id',
                    chunkName: 'page_course_detail',
                    component: r(__dirname, './course/detail.vue')
                }
            ]
        }
    ]
}