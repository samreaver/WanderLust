const Listing = require("../models/listing");


module.exports.index = async (req,res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs" , {allListings});
}
module.exports.renderNewForm = (req, res) => {
  
   res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
   let {id} = req.params;
   const listing = await Listing.findById(id)
     .populate({path: "reviews",
       populate: {
         path: "author"
      },
   })
   .populate("owner");
   
   if(!listing) {
      req.flash("error", "Listing does not exist!");
      return res.redirect("/listings");
   }

   res.render("listings/show.ejs", { 
   listing, 
   currentUser: req.user,
   success: req.flash("success"),
   error: req.flash("error")
});
   
   // res.render("listings/show.ejs", { 
   //   listing, 
   //   currentUser: req.user // Make sure to pass the current user
   // });
}

module.exports.createListing = async (req, res, next) => {
   let url = req.file.path;
   let filename = req.file.filename;
   //let {title,description,image,price,country,location} = req.body;
   const newListing = new Listing(req.body.listing);
   newListing.owner = req.user._id; // Set the owner to the current user
   newListing.image = { url, filename }; // Set the image field
   
   await newListing.save();
   req.flash("success", "New listing created successfully!");
   res.redirect("/listings");
}

module.exports.renderEditForm = async (req,res) => {
   let { id } = req.params;
   const listing = await Listing.findById(id);
   if (!listing) {
      req.flash("error", "Listing does not exist!");
      return res.redirect("/listings");
   } 
   let originalImageUrl = listing.image.url;
   originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250"); // Adjust the URL to change the image size
   res.render("listings/edit.ejs", { listing, originalImageUrl });

}


module.exports.updateListing = async (req,res) => {
   
    let { id } = req.params;
   let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
   if(typeof req.file !== "undefined"){
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = { url, filename }; // Update the image field
      await listing.save();

   }
   
   req.flash("success", "Listing has been updaated!");
   res.redirect("/listings");

};

module.exports.destroyListing =  async (req,res) => {
   let { id } = req.params;
   let deletedListing = await Listing.findByIdAndDelete(id);
   console.log(deletedListing);
   req.flash("success", "Successfully deleted the listing!");
   res.redirect("/listings");

}