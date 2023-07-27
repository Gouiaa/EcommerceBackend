const express = require('express');
const router = express.Router();
const Article=require("../models/article")

// afficher la liste des articles.
router.get('/', async (req, res )=> {
    try {
        const articles = await Article.find({}, null, {sort: {'_id': - 1}}).populate("scategorieID").exec();

        res.status(200).json(articles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    
});

    router.get('/productpage', async (req, res )=> {
        const {page, limit } =req.query;
        /// calculez le nombre d'éléments à sauter (offest)
        const offest = (page - 1 ) * limit;
        try {
            ///Effectuez la requéte à votre source de données en utilisateur
        const articles = await Article.find()
        .skip(offest)
        .limit(limit);

        res.status(200).json(articles);
        } catch(error){
            res.status(404).json({ message : error.message});
        }
        try {
            const articles = await Article.find({}, null, {sort: {'_id': -1}}).populate("scategorieID").exec();
                    
            res.status(200).json(articles);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    });
    

// créer un nouvel article
router.post('/', async (req, res) =>  {
    
    const nouvarticle = new Article(req.body)
    const articles = await Article.findById(response._id).populate("scategorieID").exec();

    try {
        await nouvarticle.save();

        res.status(200).json(nouvarticle );
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


});
// chercher un article
router.get('/:articleId',async(req, res)=>{
    try {
        const art = await Article.findById(req.params.articleId);
        
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// modifier un article



router.put('/:articleId', async (req, res)=> {
    try {
    const art = await Article.findByIdAndUpdate(
    req.params.articleId,
    { $set: req.body },
    { new: true }
    );
    const articles = await
    Article.findById(art._id).populate("scategorieID").exec(); /// zedna hethy besh mat93edtich dour fil fer8
    res.status(200).json(articles);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });

// Supprimer un article
router.delete('/:articleId', async (req, res)=> {
    const  id  = req.params.articleId;
    await Article.findByIdAndDelete(id);

    res.json({ message: "article deleted successfully." });

});
module.exports = router;