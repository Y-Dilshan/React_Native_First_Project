const customer = require('../models/customer');

// @desc Get alll customers
// @route GET /api/v1/customers
// @access private
const getCustomers = async(req, res) => {
    try{
        const customers = await Customer.find();
        res.status(200).json({
            success : true,
            count : customers.length,
            data : customers
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}