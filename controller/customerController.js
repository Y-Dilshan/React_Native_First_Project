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

// @desc Get customer
// @route GET /api/v1/customers
// @access private
const getCustomer = async(req, res) => {
    try{
        const customer = await Customer.findById(req.params.id);

        if(!customer){
            return res.status(404).json({
                success : false,
                message : 'Customer not found'
            });
        }
        res.status(200).json({
            success : true,
            data : customer
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

// @desc Create customer
// @route GET /api/v1/customers
// @access private
const CreateCustomer = async(req, res) => {
    try{
        const customers = await Customer.create(req.body);
        res.status(200).json({
            success : true,
            data : customer
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

// @desc Update customer
// @route PUT /api/v1/customers/:id
// @access private
const getCustomers = async(req, res) => {
    try{
        const customers = await Customer.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators: true});
        
        if(!customer){
             return res.status(404).json({
                success : false,
                message : 'Customer not found'
            });
        }
        res.status(200).json({
            success : true,
            data : customers
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}