		if( typeof window === 'undefined' ) {
			
			self.addEventListener( 'install' , ( event )=> {
				self['skipWaiting']()
			} )

			self.addEventListener( 'activate' , ( event )=> {
				self['clients'].claim()
				console.info( '$mol_offline activated' )
			} )

			self.addEventListener( 'fetch' , ( event )=> {
				event.respondWith(

					fetch( event.request )
					.then( response => {

						caches.open( 'v1' )
						.then( cache => cache.put( event.request , response ) )
						

						return response.clone()

					} )
					.catch( error => {

						return caches.match( event.request )
						.catch( error2 => { throw error } )

					} )

				)
			})

		} else {
			if( navigator.serviceWorker ) navigator.serviceWorker.register( 'offline.js' )
			else if( location.protocol === 'http:' ) console.warn( 'HTTPS is required for service workers.' )
			else console.warn( 'Service Worker is not supported.' )
		}
