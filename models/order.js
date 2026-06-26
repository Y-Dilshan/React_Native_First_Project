const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customer : {
        type : mongoose.Schema.Types.ObjectId,
        ref :'Customer',
        requied : [true, 'Please add a customer']
    },
    date : {
        type : Date,
        default : Date.now
    },
    totalAmount : {
        type : Number,
        required : [true, 'Please add a amount'],
        min : 0,
    },
    productdetails : [{
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product',
            required : true,
            min : 1
        },
        price : {
            type : Number,
            requied : true,
            min : 0
        }
    }]
}, {timestamps:true});

module.exports = mongoose.model('Order', OrderSchema);