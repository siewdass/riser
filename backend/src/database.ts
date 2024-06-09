import { createConnection } from 'mongoose'

export class Database {
	db
	async connect( url ) {
		this.db = createConnection( url )
	}
	async find( collection ) {
		await this.db.collection( collection ).find().toArray()
	}
}
