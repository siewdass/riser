import { MqttClient, connect } from 'mqtt/dist/mqtt.min'

export class Database {
  private db: IDBDatabase;
  private conection: MqttClient

  constructor( name: string, tables ) {

    const request: IDBOpenDBRequest = indexedDB.open( name, 1 )

    request.onupgradeneeded = event => {
      const db = ( event.target as IDBOpenDBRequest ).result
      tables.map( item => db.createObjectStore( item, { keyPath: 'id' } ) ) 
    }

    request.onsuccess = event => this.db = ( event.target as IDBOpenDBRequest ).result
    request.onerror = event => console.error( 'Error opening database:', ( event.target as IDBOpenDBRequest ).error )

    this.conection = connect( `wss://${process.env.MOSQUITTO_HOST}:${process.env.MOSQUITTO_PORT}`, {
      username: process.env.MOSQUITTO_USERNAME,
      password: process.env.MOSQUITTO_PASSWORD
    } )

    this.conection.on( 'message', ( topic: String, message: Buffer ) => {
      //topic == `${path}-${client}` ? callback( JSON.parse( message.toString( ) ) ) : null 
    })
  }

  async create(table: string, data: any): Promise<any> {
    await this.waitForConnection();

    const transaction = this.db.transaction(table, 'readwrite');
    const store = transaction.objectStore(table);
    const req = store.add( { id: Math.random().toString(16).slice(2), data }  )

    return new Promise( ( resolve, reject ) => {
      req.onsuccess = event => {
        this.conection.publish( '/create', JSON.stringify( { project: 'x', table, data } ) ) 
        resolve( ( event.target as IDBRequest ).result )
      }
      req.onerror = event => reject( ( event.target as IDBRequest ).error )
    } )
  }

  read( table: string, setState: Function ) {
    this.conection.subscribe( `/read-${ 'project' }-${ 'user' }` )
  }



  private async waitForConnection(): Promise<void> {
    if (!this.db) {
      await new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          if (this.db) {
            clearInterval(interval);
            resolve();
          }
        }, 100); // Poll every 100ms
      });
    }
  }

}

function fix( x ) {
  let v = ''
  if ( x ) v = `-${JSON.stringify(x)}`
  return
}

export class DB {
  private conection: MqttClient
  private project: string = 'project'
  private subscriptions: any = { }

  constructor( ) {
    this.conection = connect( `${ process.env.MOSQUITTO_PROTOCOL }://${ process.env.MOSQUITTO_HOST }:${ process.env.MOSQUITTO_PORT }`, {
      username: process.env.MOSQUITTO_USERNAME,
      password: process.env.MOSQUITTO_PASSWORD
    } )

    this.conection.on( "connect", () => {
      //console.log('ss')
    } )

    this.conection.on( 'message', ( topic: string, message: Buffer ) => {
      if ( this.subscriptions[ topic ] ) this.subscriptions[ topic ]( JSON.parse( message.toString( ) ) )
    } )
  }

  create( { table, index, value }: any ) {
    this.conection.publish( '/create', JSON.stringify( { project: this.project, table, index, value } ) ) 
  }

  read( { table, index, state, page, sort }: any ) {
    const path = `/read/${ this.project }/${ table }${ index ? `-${JSON.stringify(index)}` : '' }`
    this.subscriptions[ path ] = state
    this.conection.subscribe( path )
    this.conection.publish( '/read', JSON.stringify( { project: this.project, table, index } ) ) 
  }

  update( { table, index, value, newd }: any ) {
    this.conection.publish( '/update', JSON.stringify( { project: this.project, table, index, value, newd } ) ) 
  }

  delete( { table, index, value }: any ) {
    this.conection.publish( '/delete', JSON.stringify( { project: this.project, table, index, value } ) ) 
  }

}