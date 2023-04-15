import { NgModule } from '@angular/core';
import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo
} from '@angular/fire/auth-guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const redirectLoggedOut = () => redirectUnauthorizedTo(['']);
const redirectLoggedIn = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedIn },
    loadChildren: () =>
      import('@mp/app/splash/feature').then((m) => m.SplashModule),
  },
  // {
  //   path: 'response',
  //   loadChildren: () =>
  //     import('./response/response.module').then((m) => m.ResponsePageModule),
  // },
  // {
  //   path: 'responses',
  //   loadChildren: () =>
  //     import('./responses/responses.module').then((m) => m.ResponsesPageModule),
  // },
  {
    path: 'home',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedOut },
    loadChildren: () =>
      import('@mp/app/home/feature').then((m) => m.HomeModule),
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@mp/app/create/feature').then((m) => m.CreateModule),
  },
  {
    path: 'comment',
    loadChildren: () =>
      import('@mp/app/comment/feature').then((m) => m.CommentModule),
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('@mp/app/notifications/feature').then((m) => m.NotificationsModule),
  },
  {
    path: 'portfolio',
    loadChildren: () =>
      import('@mp/app/portfolio/feature').then((m) => m.PortfolioModule),
  },
  {
    path: 'post',
    loadChildren: () => import('@mp/app/postss/feature').then((m) => m.PostModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('@mp/app/search/feature').then((m) => m.SearchModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('@mp/app/settings/feature').then((m) => m.SettingsModule),
  },
  {
    path: 'splash',
    loadChildren: () =>
      import('@mp/app/splash/feature').then((m) => m.SplashModule),
  },
  {
    path: 'tos',
    loadChildren: () => import('@mp/app/tos/feature').then((m) => m.TosModule),
  },
  {
    path: 'privacy',
    loadChildren: () =>
      import('@mp/app/privacy/feature').then((m) => m.PrivacyModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('@mp/app/profile/feature').then((m) => m.ProfileModule),
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('@mp/app/welcome/feature').then((m) => m.WelcomeModule),
  },
  // {
  //   path: 'verify',
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard],
  //   data: { authGuardPipe: redirectLoggedIn },
  //   loadChildren: () =>
  //     import('./verify/verify.module').then((m) => m.VerifyPageModule),
  // },
  // {
  //   path: 'reset',
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard],
  //   data: { authGuardPipe: redirectLoggedIn },
  //   loadChildren: () =>
  //     import('./reset/reset.module').then((m) => m.ResetPageModule),
  // },
  // {
  //   path: 'forgot',
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard],
  //   data: { authGuardPipe: redirectLoggedIn },
  //   loadChildren: () =>
  //     import('./forgot/forgot.module').then((m) => m.ForgotPageModule),
  // },
  {
    path: 'register',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedIn },
    loadChildren: () =>
      import('@mp/app/register/feature').then((m) => m.RegisterModule),
  },
  {
    path: 'login',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedIn },
    loadChildren: () =>
      import('@mp/app/login/feature').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class CoreRouting { }
