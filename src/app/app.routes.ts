import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { PostComponent } from './components/post-component/post-component';
import { NotFoundComponent } from './components/not-found-component/not-found-component';
import { SettingsComponent } from './components/settings-component/settings-component';
import { LoginComponent } from './features/login/login-component/login-component';
import { SettingsProfileComponent } from './components/settings-profile-component/settings-profile-component';
import { pageResolver } from './data.resolver';
import { RegisterComponent } from './features/register/register-component/register-component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'posts',
        // component: PostListComponent,
        loadComponent: () => import('./components/post-list-component/post-list-component').then((c) => c.PostListComponent)
    },
    {
        path: 'settings',
        component: SettingsComponent,
        children: [
            {
                path: 'profile',
                component: SettingsProfileComponent
            }
        ]
    },
    {
        path: 'posts/:postId',
        component: PostComponent,
        resolve: {
            page: pageResolver
        }
    },
    {
        path: 'old-posts/:postId',
        redirectTo: route => {
            return `/posts/${route.params['postId']}`
        }
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
