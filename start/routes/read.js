/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.group(() => {
  Route.get('show', 'ValorController.index')
  Route.get(':id2', 'ValorController.show')
  Route.post('create', 'ValorController.store')
})
  .namespace('Read')
  .prefix('v1/api/sensor/:id/')
  .middleware(['auth:jwt'])
