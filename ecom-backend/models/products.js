import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String, 
        required: true, 
        trim: true 
    },
    image: { 
        type: String, 
        trim: true 
    },
    addedBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
}, { 
    timestamps: true 
});

const Product = mongoose.model('products', productSchema);
export default Product;
