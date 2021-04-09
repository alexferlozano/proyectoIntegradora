/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.get('show', 'CamaraController.index') /* admin */
  Route.get('mycamera', 'CamaraController.mycamera')
  Route.get(':id', 'CamaraController.show') /* middleware required */
  Route.post('create', 'CamaraController.store')
  Route.put(':id/edit', 'CamaraController.update') /* middleware required */
  Route.delete(':id/delete', 'CamaraController.destroy') /* middleware required¡ */
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
  .prefix('v1/api/camera/:id/images')
  .middleware(['auth:jwt'])

Route.get('myphotos', 'ImageController.myphotos')
  .prefix('v1/api/photos')
  .namespace('Image')
  .middleware('auth:jwt')
