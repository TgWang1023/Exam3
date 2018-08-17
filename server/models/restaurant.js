const ReviewSchema = new mongoose.Schema({
    name: {type: String, default: '', required: [true, 'Name cannot be blank!'], minlength: [3, 'Name must be at least 3 characters long!']},
    content: {type: String, default: '', required: [true, 'Review cannot be blank!'], minlength: [3, 'Review must be at least 3 characters long!']},
    rating: {type: Number, default: '', required: [true, 'Rating cannot be blank!']},
}, {timestamps: true});
mongoose.model('Review', ReviewSchema);
Review = mongoose.model('Review');

const RestaurantSchema = new mongoose.Schema({
    name: {type: String, default: '', required: [true, 'Restaurant name cannot be blank!'], minlength: [3, 'Restaurant name must be at least 3 characters long!'], unique: true },
    cuisine: {type: String, default: '', required: [true, 'Cuisine cannot be blank!'], minlength: [3, 'Cuisine must be at least 3 characters long!']},
    reviews: [ReviewSchema]
}, {timestamps: true});
mongoose.model('Restaurant', RestaurantSchema);
Restaurant = mongoose.model('Restaurant');
