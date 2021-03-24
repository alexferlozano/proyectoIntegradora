/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.get('show', 'SensorController.index')
  Route.get(':id', 'SensorController.show')
  Route.post('create', 'SensorController.store')
  Route.put(':id/edit', 'SensorController.update')
  Route.delete(':id/delete', 'SensorController.destroy')
})
  .namespace('Read')
  .prefix('v1/api/sensores/')
  .middleware(['auth:jwt'])
