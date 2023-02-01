const ErrorHandler = require('../utils/errorhand');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const Article = require('../models/article');


exports.getArticle = async (req,res,next) => {
	const article = await Article.find();
	res.status(200).json({
		success: true,
		article
	})
}

exports.createArticle = async (req, res, next) => {
	console.log(req.body);
    const newArticleData = {
        article_title: req.body.article_title,
        authors: req.body.authors,
        periodical: req.body.periodical,
        volume: req.body.volume,
        issue_number: req.body.issue_number,
        date: req.body.date,
        pages: req.body.pages,
        type: req.body.type,
        languange: req.body.languange,
        location: req.body.location,
        e_access: req.body.e_access,
        subject: req.body.subject,
        abstract: req.body.abstract,
        entered_by: req.body.entered_by,
        update_by: req.body.update_by,
        date_entered: req.body.date_entered,
        date_updated: req.body.date_updated,
    }
    const article = await Article.create(newArticleData);

    res.status(201).json({
        success:true,
        article
    });
}

exports.getSingleArticle = async(req,res,next) => {
	const article = await Article.findById(req.params.id);

	if(!article) {
		return next(new ErrorHandler('Article not found',404));
	}
	res.status(200).json({
		success: true,
		Article
	})
}

exports.updateArticle = async(req,res,next) => {
	let article = await Article.findById(req.params.id);
	const newArticleData = {
        article_title: req.body.article_title,
        authors: req.body.authors,
        periodical: req.body.periodical,
        volume: req.body.volume,
        issue_number: req.body.issue_number,
        date: req.body.date,
        pages: req.body.pages,
        type: req.body.type,
        languange: req.body.languange,
        location: req.body.location,
        e_access: req.body.e_access,
        subject: req.body.subject,
        abstract: req.body.abstract,
        entered_by: req.body.entered_by,
        update_by: req.body.update_by,
        date_entered: req.body.date_entered,
        date_updated: req.body.date_updated,
    }
	if(!article) {
	 	return next(new ErrorHandler('Article not found',404));
	}

	article = await Article.findByIdAndUpdate(req.params.id, newArticleData,{
	 	new: true,
	 	runValidators:true,
	})
	res.status(200).json({
	 	success:true,
	 	article
	})
}

exports.deleteArticle = async(req,res,next) =>{
	const article = await Article.findById(req.params.id);
	if(!article) {
	 		return next(new ErrorHandler('Article not found',404));
	 }
	 await article.remove();
	 res.status(200).json({
	 	success: true,
	 	message: 'Article deleted'
	 })
}