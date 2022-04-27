const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true,},
        key: { type: String, required: true, unique: true },
        products: [
            {
                productId: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                }
            }
        ],
        amount: { type: Number, required: true },
        address: { type: Object , required: true},
        receipt_url:{type:String,required:true},
        status:{type:String,default:"pending"}

    }
    , { timestamps: true }
)

module.exports = mongoose.model("Order", OrderSchema);