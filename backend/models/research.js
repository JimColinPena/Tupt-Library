const mongoose = require('mongoose')

const researchSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		maxLength: [100, 'Title cannot exceed 100 characters']
	},
	authors: {
		type: String,
		required: true,
		maxLength: [100, 'Authors cannot exceed 100 characters']
	},
	institution: {
		type: String,
		required: true,
		maxLength: [100, 'Intitution cannot exceed 100 characters']
	},
	program: {
		type: String,
		required: true,
		maxLength: [100, 'Program cannot exceed 100 characters']
	},
	year: {
		type: String,
		required: true,
		maxLength: [100, 'Year cannot exceed 100 characters']
	},
	description: {
		type: String,
		required: true,
		maxLength: [100, 'Description cannot exceed 100 characters']
	},
	call_number: {
		type: String,
		required: true,
		maxLength: [100, 'Call number cannot exceed 100 characters']
	},
	accession: {
		type: String,
		required: true,
		maxLength: [100, 'Accession cannot exceed 100 characters']
	},
	languange: {
		type: String,
		required: true,
		maxLength: [100, 'Languange cannot exceed 100 characters']
	},
	location: {
		type: String,
		required: true,
		maxLength: [100, 'Location cannot exceed 100 characters']
	},
	type_of_research: {
		type: String,
		required: true,
		maxLength: [100, 'Type of research cannot exceed 100 characters']
	},
	e_access: {
		type: String,
		required: true,
		maxLength: [100, 'E-access cannot exceed 100 characters']
	},
	subject: {
		type: String,
		required: true,
		maxLength: [100, 'Subject cannot exceed 100 characters']
	},
	abstract: {
		type: String,
		required: true,
		maxLength: [100, 'Abstract cannot exceed 100 characters']
	},
	entered_by: {
		type: String,
		required: true,
		maxLength: [100, 'Entered by cannot exceed 100 characters']
	},
	update_by: {
		type: String,
		required: true,
		maxLength: [100, 'Update by cannot exceed 100 characters']
	},
	date_entered: {
		type: String,
		required: true,
		maxLength: [100, 'Date entered cannot exceed 100 characters']
	},
	date_updated: {
		type: String,
		required: true,
		maxLength: [100, 'Date updated cannot exceed 100 characters']
	},
	volume_copy: {
		type: String,
		required: true,
		maxLength: [100, 'Volume/Copy cannot exceed 100 characters']
	},
	on_shelf: {
		type: String,
		required: true,
		maxLength: [100, 'On shelf cannot exceed 100 characters']
	},
	out: {
		type: String,
		required: true,
		maxLength: [100, 'Out cannot exceed 100 characters']
	},
	times_out: {
		type: String,
		required: true,
		maxLength: [100, 'Times out cannot exceed 100 characters']
	},
})
module.exports = mongoose.model('Research', researchSchema)