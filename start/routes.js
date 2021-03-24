'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.group(() => {
  Route.post('login', 'AuthController.logIn').validator('Login')
  Route.post('signup', 'AuthController.signUp').validator('User/StoreUser')
  /* Route.post('refresh', 'AuthController.refreshToken').middleware('auth')
  Route.delete('logout', 'AuthController.logOut').middleware('auth')
  Route.put('changepassword', 'AuthController.changePassword').middleware(['auth']) */
})
  .prefix('v1/auth')

require('./routes/image')
require('./routes/read')
