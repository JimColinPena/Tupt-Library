const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
	article_title: {
		type: String,
		required: true,
		maxLength: [100, 'Article Title cannot exceed 100 characters']
	},
	authors: {
		type: String,
		required: true,
		maxLength: [100, 'Authors cannot exceed 100 characters']
	},
	periodical: {
		type: String,
		required: true,
		maxLength: [100, 'Periodical cannot exceed 100 characters']
	},
	volume: {
		type: String,
		required: true,
		maxLength: [100, 'Volume cannot exceed 100 characters']
	},
	issue_number: {
		type: String,
		required: true,
		maxLength: [100, 'Issue_Number cannot exceed 100 characters']
	},
	date: {
		type: String,
		required: true,
		maxLength: [100, 'Date cannot exceed 100 characters']
	},
	pages: {
		type: String,
		required: true,
		maxLength: [100, 'Pages cannot exceed 100 characters']
	},
	type: {
		type: String,
		required: true,
		maxLength: [100, 'Type cannot exceed 100 characters']
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
		maxLength: [100, 'Dae updated cannot exceed 100 characters']
	},
})
module.exports = mongoose.model('Article', articleSchema)