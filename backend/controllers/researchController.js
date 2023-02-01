const ErrorHandler = require('../utils/errorhand');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const Research = require('../models/research');


exports.getResearch = async (req,res,next) => {
	const research = await Research.find();
	res.status(200).json({
		success: true,
		research
	})
}

exports.createResearch = async (req, res, next) => {
	console.log(req.body);
    const newResearchData = {
        title: req.body.title,
        authors: req.body.authors,
        institution: req.body.institution,
        program: req.body.program,
        year: req.body.year,
        description: req.body.description,
        call_number: req.body.call_number,
        accession: req.body.accession,
        languange: req.body.languange,
        location: req.body.location,
        type_of_research: req.body.type_of_research,
        e_access: req.body.e_access,
        subject: req.body.subject,
        abstract: req.body.abstract,
        entered_by: req.body.entered_by,
        update_by: req.body.update_by,
        date_entered: req.body.date_entered,
        date_updated: req.body.date_updated,
        volume_copy: req.body.volume_copy,
        on_shelf: req.body.on_shelf,
        out: req.body.out,
        times_out: req.body.times_out,
    }
    console.log(newResearchData)
    const research = await Research.create(newResearchData);

    res.status(201).json({
        success:true,
        research
    });
};

exports.getSingleResearch = async(req,res,next) => {
	const research = await Research.findById(req.params.id);

	if(!research) {
		return next(new ErrorHandler('Research not found',404));
	}
	res.status(200).json({
		success: true,
		research
	})
}

exports.updateResearch = async(req,res,next) => {
	let research = await Research.findById(req.params.id);
	const newResearchData = {
        title: req.body.title,
        authors: req.body.authors,
        institution: req.body.institution,
        program: req.body.program,
        year: req.body.year,
        description: req.body.description,
        call_number: req.body.call_number,
        accession: req.body.accession,
        languange: req.body.languange,
        location: req.body.location,
        type_of_research: req.body.type_of_research,
        e_access: req.body.e_access,
        subject: req.body.subject,
        abstract: req.body.abstract,
        entered_by: req.body.entered_by,
        update_by: req.body.update_by,
        date_entered: req.body.date_entered,
        date_updated: req.body.date_updated,
        volume_copy: req.body.volume_copy,
        on_shelf: req.body.on_shelf,
        out: req.body.out,
        times_out: req.body.times_out,
    }
	if(!research) {
	 	return next(new ErrorHandler('Research not found',404));
	}

	research = await Research.findByIdAndUpdate(req.params.id, newResearchData,{
	 	new: true,
	 	runValidators:true,
	 	// useFindandModify:false
	})
	res.status(200).json({
	 	success:true,
	 	research
	})
}

exports.deleteResearch = async(req,res,next) =>{
	const research = await Research.findById(req.params.id);
	if(!research) {
	 		return next(new ErrorHandler('Research not found',404));
	 }
	 await research.remove();
	 res.status(200).json({
	 	success: true,
	 	message: 'Research deleted'
	 })
}