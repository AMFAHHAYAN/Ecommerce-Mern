import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'products', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
export default Order;


