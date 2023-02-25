const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    book_image: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
            default: "https://res.cloudinary.com/dxcrzvpbz/image/upload/v1671458821/TUPT_Library/Resources/default-book_p70mge.png"
        }
    },
	title: {
        type: String,
        required: true,
        maxLength: [100, 'Title cannot exceed 100 characters']
    },
    responsibility: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    uniform_title: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    parallel_title: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    main_author: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    other_author: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    contributors: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    corp_author: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    placePub: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    publisher: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    yearPub: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    edition: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    pages: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    other_details: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    dimension: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    acc_materials: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    series: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    gen_notes: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    isbn: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    Fil: {
        type: Boolean,
        default: false
    },
    Ref: {
        type: Boolean,
        default: false
    },
    Bio: {
        type: Boolean,
        default: false
    },
    Fic: {
        type: Boolean,
        default: false
    },
    Res: {
        type: Boolean,
        default: false
    },
    call_number: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    accession_numbers: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Accession'
    }],
    languange: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    location: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    entered_by: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    updated_by: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    date_entered: {
        type: Date,
        trim: true,
    },
    date_updated: {
        type: Date,
        trim: true,
    },
    copy: {
        type: Number,
        default: 0,
        max: [100, 'Cannot exceed 100 copies']
    },
    on_shelf: {
        type: Number,
        default: 0,
        max: [100, 'Cannot exceed 100']
    },
    out: {
        type: Number,
        default: 0,
        max: [100, 'Cannot exceed 100']
    },
    times_out: {
        type: Number,
        default: 0,
        max: [100, 'Cannot exceed 100']
    },
    id: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    subjects: [{
        type: String,
        max: [100, 'Cannot exceed 100 characters']
    }],
    content_notes: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },
    abstract: {
        type: String,
    },
    borrow_count: {
        type: Number,
    },
    ratings: {
        type: Number,
    }
})
module.exports = mongoose.model('Book', bookSchema);