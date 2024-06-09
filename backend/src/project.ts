export async function Project( database, { body: { project, repository, branch } }, res ) {

	await database.Project.updateOne( { name: project }, { repository, branch }, { upsert: true } ) 

	res.json( {} )
}
