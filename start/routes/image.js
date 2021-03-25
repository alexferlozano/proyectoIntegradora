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

Route.group(() => {
  Route.get('show', 'ImageController.index')
  Route.get(':id2', 'ImageController.show')
  Route.post('create', 'ImageController.store')
})
  .namespace('Image')
  .prefix('v1/api/cameras/:id/')
  .middleware(['auth:jwt'])
