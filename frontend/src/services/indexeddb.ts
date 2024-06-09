export const Indexeddb = new class Indexeddb {
  database: IDBDatabase
  constructor( ) {
  	const request: IDBOpenDBRequest = indexedDB.open( 'MYPROJECT', 1 )
  	request.onsuccess = ( { target }: Event ) => this.database = ( target as IDBRequest ).result
  	request.onupgradeneeded = ( { target }: Event ) => {
  		const store = ( target as IDBRequest ).result.createObjectStore( 'User', { keyPath: 'id' } )
  		//store.createIndex( 'name', 'name', { unique: false } )
  	}
  	request.onerror = ( { target }: Event ) => console.error( ( target as IDBRequest ).error?.message )
  }
  private query( table, method, data ): Promise < string | object > {
  	return new Promise( ( resolve: Function, reject: Function ) => {
  		const tx: IDBTransaction = this.database.transaction( table, 'readwrite' )
  		const store: IDBObjectStore = tx.objectStore( table )	
  		const request: IDBRequest = method == 'put' ? store[ method ]( data.id, data ) : store[ method ]( data )
  		request.onsuccess = ( { target }: Event ) => resolve( method == 'get' ? ( target as IDBRequest ).result : ( target as IDBRequest ).readyState )
  		request.onerror = ( { target }: Event ) => reject( ( target as IDBRequest ).error?.message )
  	} )
  }
  create( table: string, data: any ): Promise < string | object > {
  	return this.query( table, 'add', data )
  }
  read( table: string, data: any ): Promise < string | object > {
  	return this.query( table, 'get', data.id )
  }
  update( table: string, data: any ): Promise < string | object > {
  	return this.query( table, 'put', data )
  }
  delete( table: string, data: any ): Promise < string | object > {
  	return this.query( table, 'delete', data.id )
  }
}

setTimeout( async ( ) => {
	//await Indexeddb.create( 'User', { id: 114, name: 'xD' } )
	//console.log( await Indexeddb.read( 'User', { id: 110 } ) )
}, 1000 )
