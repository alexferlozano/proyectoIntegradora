/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.put('edit', 'UserController.editProfile')
})
  .prefix('v1/api/profile/')
  .middleware(['auth:jwt'])
