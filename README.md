# WanderLust

WanderLust is a full-stack web application for listing, searching, reviewing, and managing vacation rentals and properties. Users can sign up, log in, create new listings, upload images, leave reviews, and more. The project uses Node.js, Express, MongoDB, Passport.js for authentication, Cloudinary for image uploads, and Bootstrap for styling.

**Live Demo:**  
 https://wanderlusts-9llg.onrender.com/listings

---

## Features

- User authentication (register, login, logout)
- Create, edit, and delete property listings
- Upload listing images (stored on Cloudinary)
- Leave reviews on listings
- Responsive design for mobile and desktop
- Flash messages for user feedback
- Secure session management with MongoDB store

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** Passport.js (Local Strategy)
- **Image Uploads:** Cloudinary, multer-storage-cloudinary
- **Frontend:** EJS, Bootstrap 5
- **Session Store:** connect-mongo
- **Validation:** Joi

```
WanderLust/
│
├── models/           # Mongoose schemas (Listing, Review, User)
├── routes/           # Express route handlers
├── controllers/      # Controller logic for routes
├── views/            # EJS templates
├── public/           # Static assets (CSS, JS, images)
├── utils/            # Utility functions (ExpressError, wrapAsync)
├── cloudConfig.js    # Cloudinary configuration
├── schema.js         # Joi validation schemas
├── app.js            # Main Express app
└── .env              # Environment variables (not committed)
```

---

## Deployment

This project is deployed on [Render](https://render.com/).

**Live URL:**  
[https://wanderlusts-9llg.onrender.com/listings](https://wanderlusts-9llg.onrender.com/listings)

---

## License

MIT

---


