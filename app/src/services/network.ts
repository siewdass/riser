import { MqttClient, connect } from 'mqtt/dist/mqtt.min'
//import ip6 from 'https://cdn.jsdelivr.net/gh/elgs/ip6/ip6.js';

export class Network {
  private conection: MqttClient
  private project: string = 'project'
  private subscriptions: any = { }
  private reload: any = { }

  //generar un token para encriptar los datos al pedirlos en cada peticion?

  constructor( ) {
  	const username = localStorage.getItem( 'username' )
  	const password = localStorage.getItem( 'password' )

  	if ( username && password ) {
      
  		this.conection = connect( 'wss://riser.ddns.net:8083', { username, password } )

  		this.conection.on( 'connect', () => console.log( 'riser connected' ) )
  		this.conection.on( 'close', () => console.log( 'riser disconnected' ) )

  		this.conection.on( 'message', ( topic: string, message: Buffer ) => {
  			if ( this.subscriptions[ topic ] ) {
  				this.subscriptions[ topic ].state( JSON.parse( message.toString( ) ) )
  			} else if ( this.reload[ topic ] ) {
  				const { table, index, page, sort } = this.subscriptions[ this.reload[ topic ].replace( '-reload', '' ) ]
  				this.conection.publish( '/read', JSON.stringify( { project: this.project, table, index, page, sort } ) )
  			}
  		} )
  	} else {
  		console.error( 'riser disconnected' )
  	}
  }

  signin( { email, password, callback }: any ) {
  	fetch( 'https://riser.ddns.net:3000/api/signin', {
  		method: 'POST',
  		body: JSON.stringify( { email, password, project: this.project } ), 
  		headers: { 'Content-Type': 'application/json' }
  	} )
  		.then( res => res.json( ) )
  		.then( res => {
  			localStorage.setItem( 'username', res.data.username )
  			localStorage.setItem( 'password', res.data.password )
  			callback( )
  		} )
  		.catch( error => console.error( error ) )
  }

  signup( { email, password, callback }: any ) {
  	fetch( 'https://riser.ddns.net:3000/api/signup', {
  		method: 'POST',
  		body: JSON.stringify( { email, password, project: this.project } ), 
  		headers: { 'Content-Type': 'application/json' }
  	} )
  		.then( res => res.json( ) )
  		.then( res => {
  			callback( )
  		} )
  		.catch( error => console.error( error ) )
  }

  create( { table, index, value }: any ) {
  	if ( this.conection ) {
  		this.conection.publish( '/create', JSON.stringify( { project: this.project, table, index, value } ) )
  	}
  }

  read( { table, index, state, page, sort }: any ) {
  	if ( this.conection ) {
  		const path = `/read/${ this.project }/${ table }${ index ? `-${ JSON.stringify( index ) }` : '' }`
  		this.subscriptions[ path ] = { state, table, index, page, sort }
  		this.reload[ `${ path }-reload` ] = path
  		this.conection.subscribe( path )
  		this.conection.subscribe( `${ path }-reload` )
  		this.conection.publish( '/read', JSON.stringify( { project: this.project, table, index, page, sort } ) ) 
  	}
  }

  update( { table, index, value, renew }: any ) {
  	if ( this.conection ) {
  		this.conection.publish( '/update', JSON.stringify( { project: this.project, table, index, value, renew } ) )
  	}
  }

  delete( { table, index, value }: any ) {
  	if ( this.conection ) {
  		this.conection.publish( '/delete', JSON.stringify( { project: this.project, table, index, value } ) )
  	}
  }

}