import { connectMongo } from './utils'

//function publish( path, client, packet ) { Mosquitto.publish( `${path}-${client}`, Buffer.from( JSON.stringify( packet ) ) ) }
// enviar token por aqui

export async function Create( { project, table, index, value }, publish ) {
	try {
    //console.log( data )
    //+const project = await database.Project.findOne( { id: data.project } )

    //if ( !project ) throw 'Project not exist.'

		const connection = await connectMongo( project )
    const collection = connection.db.collection( table )
    await collection.insertOne( { ...index, ...value } )

    const data = await collection.find( index, { _id: 0 } ).toArray( )
    publish( `/read/${ project }/${ table }${ index ? `-${ JSON.stringify( index ) }` : '' }`, data )

	} catch ( error ) {
    console.error( error )
	}
}

export async function Read( { project, table, index }, publish ) {
  try {
		const connection = await connectMongo( project )
    const collection = connection.db.collection( table )
    const data = await collection.find( index, { _id: 0 } ).toArray( )
    publish( `/read/${ project }/${ table }${ index ? `-${ JSON.stringify( index ) }` : '' }`, data )

  } catch ( error ) {
    console.error( error )
  }
}

export async function Update( { project, table, index, value, newd }, publish ) {
	try {
    const connection = await connectMongo( project )
    const collection = connection.db.collection( table )
    await collection.updateOne( { ...index, ...value }, { $set: newd } )
  
    const data = await collection.find( index, { _id: 0 } ).toArray( )
    publish( `/read/${ project }/${ table }${ index ? `-${ JSON.stringify( index ) }` : '' }`, data )

	} catch ( error ) {
    console.error( error )
	}
}

export async function Delete( { project, table, index, value }, publish ) {
  try {
    const connection = await connectMongo( project )
    const collection = connection.db.collection( table )
    await collection.deleteOne( { ...index, ...value } )
  
    const data = await collection.find( index, { _id: 0 } ).toArray( )
    publish( `/read/${ project }/${ table }${ index ? `-${ JSON.stringify( index ) }` : '' }`, data )

  } catch ( error ) {
    console.error( error )
  }
}