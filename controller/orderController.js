const Order = require('../models/order')
const Product = require('../models/product')

// @desc Get all orders
// @route GET /api/v1/orders
// @access Private 

const getOrders = async(req, res) => {
    try{
        const orders = await Order.find().populate('customer', 'name adderess').populate('productDetails.product', 'unitPrice');
        
        res.status(200).json({
            success : true,
            count : orders.length,
            data : orders
        })
    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// @desc create order
// @route POST /api/v1/order
// @access Private 

const createOrder = async(req, res) => {
    try{
        const {customer, productDetails} = req.body;

        let totalAmount = 0;

        for(let item of productDetails){
            const product = await Product.findById(item.product);

            if(!product){
                return res.status(404).json({
                    success : false,
                    message : 'Product with id ${item.product} not found'
        })
            }
            if(!product.qtyOnHand < item.quantity){
                  return res.status(400).json({
                    success : false,
                    message : 'Insufficient quantity for product ${product.description}'
                  })
            }
            item.price = product.unitPrice;
            totalAmoun+= product.unitPrice*item.quantity

            // product update quantity
            product.qtyOnHand  -= item.quantity;
            await product.save();
        }

        const order = await Order.create({
            customer,
            productDetails,
            totalAmoun,
            date = req.body.date || Date.now()
        })

        const populateOrder = await Order.findById(order_id)
        .populate('Customer', 'name address')
        .populate('productDetails.product', 'description UnitPrice');
        
            res.status(201).json({
            success : true,
            message : populatedOrder
        })

    }catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}