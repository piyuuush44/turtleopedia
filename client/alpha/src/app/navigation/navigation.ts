import {FuseNavigation} from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'dashboards',
                title: 'Dashboards',
                type: 'collapsable',
                icon: 'dashboard',
                children: [
                    {
                        id: 'analytics',
                        title: 'Analytics',
                        type: 'item',
                        url: '/apps/dashboards/analytics'
                    },
                    {
                        id: 'project',
                        title: 'Project',
                        type: 'item',
                        url: '/apps/dashboards/project'
                    }
                ]
            },
            {
                id: 'blogs',
                title: 'Blog',
                type: 'collapsable',
                icon: 'blog',
                url: '/apps/blog/all'
            },
            {
                id: 'authentication',
                title: 'Authentication',
                type: 'collapsable',
                icon: 'authentication',
                children: [
                    {
                        id: 'login',
                        title: 'Login',
                        type: 'item',
                        url: '/apps/auth/login'
                    },
                    {
                        id: 'register',
                        title: 'Registration',
                        type: 'item',
                        url: '/apps/auth/register'
                    },
                    {
                        id: 'forgot-password',
                        title: 'Forgot Password',
                        type: 'item',
                        url: '/apps/auth/forgot-password'
                    },
                    {
                        id: 'lock',
                        title: 'Lock',
                        type: 'item',
                        url: '/apps/auth/lock'
                    },
                    {
                        id: 'reset-password',
                        title: 'Reset Password',
                        type: 'item',
                        url: '/apps/auth/reset-password'
                    },
                    {
                        id: 'mail-confirm',
                        title: 'Mail Confirm',
                        type: 'item',
                        url: '/apps/auth/mail-confirm'
                    },
                ]
            },
        ]
    },
];
