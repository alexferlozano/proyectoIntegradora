/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.group(() => {
  Route.resource('sensors', 'SensorController')
    .apiOnly()
    .validator(new Map(
      [[]]
    ))
})
  .middleware(['auth:jwt'])
  .prefix('api/v1')
  .namespace('Read')

// Route.group(() => {
//   Route.get('show', 'SensorController.index')
//   Route.get(':id', 'SensorController.show')
//   Route.post('create', 'SensorController.store')
//   Route.put(':id/edit', 'SensorController.update')
//   Route.delete(':id/delete', 'SensorController.destroy')
// })
  // .namespace('Read')
  // .prefix('v1/api/sensores/')
  // .middleware(['auth:jwt'])

Route.group(() => {
  Route.get('show', 'ValorController.index')
  Route.get(':id2', 'ValorController.show')
  Route.post('create', 'ValorController.store')
})
  .namespace('Read')
  .prefix('v1/api/sensor/:id/')
  .middleware(['auth:jwt'])
