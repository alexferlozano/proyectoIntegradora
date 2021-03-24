/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.get('show', 'CamaraController.index')
  Route.get('mycamera', 'CamaraController.mycamera')
  Route.get(':id', 'CamaraController.show')
  Route.post('create', 'CamaraController.store')
  Route.put(':id/edit', 'CamaraController.update')
  Route.delete(':id/delete', 'CamaraController.destroy')
})
  .namespace('Image')
  .prefix('v1/api/camera/')
  .middleware(['auth:jwt'])
