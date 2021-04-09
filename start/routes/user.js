/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.get('', 'UserController.getProfile')
  Route.put('edit', 'UserController.editProfile')
  Route.put('edit/email', 'UserController.editEmail').validator('User/UpdateUserEmail')
  Route.put('edit/username', 'UserController.editUsername').validator('User/UpdateUser')
})
  .prefix('v1/api/profile/')
  .middleware(['auth:jwt'])
