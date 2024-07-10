import * as mqtt from 'mqtt/dist/mqtt.min'

let mosquitto: mqtt.MqttClient

export function useSubscribe( path: String, callback: Function ): Function {
	const client = localStorage.getItem( 'mqtt' )
	if ( mosquitto.connected && !client ) return () => {}
	mosquitto.subscribe( `${path}-${client}` )
	mosquitto.on( 'message', ( topic: String, message: Buffer ) => topic == `${path}-${client}` ? callback( JSON.parse( message.toString( ) ) ) : null )
	return () => mosquitto.unsubscribe( `${path}-${client}` )
}

export function usePublish( path: string, message: any ): void {
	const client = localStorage.getItem( 'mqtt' )
	if ( mosquitto.connected && !client ) return
	mosquitto.publish( path, JSON.stringify( { client, message } ) ) 
}

export function clientId( id: string ): void {
	localStorage.setItem( 'mqtt', id )
}

export function Connect( url, data ): void {
	mosquitto = mqtt.connect( url, data )
}