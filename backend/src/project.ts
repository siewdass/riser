export async function Project( database, { body: { project, repository, branch } }, res ) {

	await database.Project.updateOne( { name: project }, { repository, branch }, { upsert: true } ) 

	res.json( {} )
}

export async function GetProject( database, { body: { project } }, res ) {
	res.json( await database.Function.find(
		{ name: project.name, type: 'frontend' },
		{ path: true, code: true, _id: false }
	) )
}
