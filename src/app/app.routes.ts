import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { PostComponent } from './components/post-component/post-component';
import { PostListComponent } from './components/post-list-component/post-list-component';
import { NotFoundComponent } from './components/not-found-component/not-found-component';
import { SettingsComponent } from './components/settings-component/settings-component';
import { Component } from '@angular/core';
import { SettingsProfileComponent } from './components/settings-profile-component/settings-profile-component';
import { pageResolver } from './data.resolver';

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
        path: '**',
        component: NotFoundComponent
    }
];
