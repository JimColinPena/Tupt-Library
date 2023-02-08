const ErrorHandler = require('../utils/errorhand');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const Evaluation = require('../models/evaluation');

exports.getEvaluation = async (req,res,next) => {
	const evaluation = await Evaluation.find();
	res.status(200).json({
		success: true,
		evaluation
	})
}

exports.createEvaluation = async (req,res,next) => {
	const newEvaluationData ={
		ia: true,
		dv: req.body.dv,
		tr: req.body.tr,
		yl: req.body.yl,
		course: req.body.course,
		gender: req.body.gender,
		sra: req.body.sra,
		lav: req.body.lav,
		clean: req.body.clean,
		ho: req.body.ho,
		brb: req.body.brb,
		opac: req.body.opac,
		bc: req.body.bc,
		pc: req.body.pc,
		tps: req.body.tps,
		er: req.body.er,
		skaq: req.body.skaq,
		css: req.body.css,
	}

	const evaluation = await Evaluation.create(newEvaluationData);

	res.status(200).json({
		success:true,
		evaluation
	});
};