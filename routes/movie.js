const router = require('express').Router();
const fs = require('fs');

const verify = require('../middleware/verifytoken');
const {fileValidation} = require('../controllers/movieController');
const Movie = require('../models/Movie.js');

//UploadMovie
router.post('/upload', verify, async (req, res) => {
    //ImageValidation
    if(!req.files){
        return res.status(400).send("No files were uploaded");
    }
    //ImageDetails Validation
    const {error} = fileValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //imageUpload
        const image = req.files.image;
        const imageName = req.user._id+Date.now()+image.name;
        const imageDirectory = '/public/'+imageName;
        image.mv('.'+imageDirectory, (err) => {
            if(err) return res.status(500).send(err);

            console.log('Image Uploaded');
        });

        //StoreDetailsToDatabase
        const movie = new Movie({
            title : req.body.title,
            owner : req.user,
            img : imageDirectory,
            description: req.body.description,
        });

        try{
            const savedMovie = await movie.save();
            res.status(200).send("Movie added succesfully");
        }catch(err){
            res.status(400).send(err);
        }
    
});

router.get('/', verify, (req, res) => {
    
    Movie.find()
        .then(movie => {
            let userMovie=[];
            for( let i =0; i< movie.length; i++){
                if(movie[i].owner === req.user._id){
                   
                    userMovie.push(movie[i]);
                }
            }
            
            res.status(200).send(userMovie);
        })
        .catch(err => res.status(400).send(err));

})

router.get('/:id', verify, (req, res) =>{

    const id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send("invalid id");
}
    
    Movie.findById(id)
        .then( movie => res.status(200).send(movie))
        .catch( err => res.status(400).send("error is: "+err));

});

router.put('/update/:id', verify, async (req, res) => {
        try{    
            const id = req.params.id;
            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                    return res.status(400).send("invalid id");
            }
            let imageDirectory;
            if(req.files){
                const movie = await Movie.findById(id);
                if(movie.img !== ''){
                    const path = '.'+movie.img;
                    if(fs.existsSync(path)){fs.unlink(path, (err) => {
                        if (err) {
                        console.error(err)
                        return res.status(400).send(err);
                        }
                    })}
                        
                    Movie.findByIdAndUpdate(id, {img : ''})
                    .then( () => {
                        console.log("image directory reset");
                    })
                    .catch(() => {
                        console.log("Error is: "+err);
                    })
                }
                
               
                //image
                const image = req.files.image;
                const imageName = req.user._id+Date.now()+image.name;
                imageDirectory = '/public/'+imageName;
                image.mv('.'+imageDirectory, (err) => {
                    if(err) return res.status(500).send(err);
                    console.log('Image Uploaded');
                });
            }
            else {
              const movie = await Movie.findById(id)
              imageDirectory = movie.img;
            }

            const updates = Object.assign(req.body, {img: imageDirectory});
            const option = { new: true};
            const updatedMovie = await Movie.findByIdAndUpdate(id, updates, option);
            // res.status(200).send(updatedMovie);
            res.status(200).send("movie succesfully updated");
        } 
        catch(err){
            console.log(err);
        }
})

router.delete('/delete/:id', verify, async(req, res) => {
    const id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send("invalid id");
}
    try{
    const movie = await Movie.findById(id);
    const imageDirectory = movie.img;
    if(imageDirectory !== ''){
        if(fs.existsSync('.'+imageDirectory)){
        fs.unlinkSync('.'+imageDirectory);}
    }
    const deletedMovie = await Movie.findByIdAndDelete(id);
        console.log("Movie has been Deleted")
       return res.status(200).send("Movie Deleted")
    }catch(err){
        return res.status(400).send("error:"+err);
    }
})

module.exports = router;