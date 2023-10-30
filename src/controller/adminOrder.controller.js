const orderService = require('../services/order.service');


const getAllOrders = async (req,res)=>{
    try {
        const orders = await orderService.getAllOrders();

        return res.status(200).send(orders);
        
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const confirmOrders = async (req,res)=>{
    const orderId = req.params.orderId
    try {
        const orders = await orderService.confirmOrders(orderId);

        return res.status(200).send(orders);
        
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const shipOrders = async (req,res)=>{
    const orderId = req.params.orderId
    try {
        const orders = await orderService.shipOrders(orderId);

        return res.status(200).send(orders);
        
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const deliverOrders = async (req,res)=>{
    const orderId = req.params.orderId
    try {
        const orders = await orderService.deliverOrders(orderId);

        return res.status(200).send(orders);
        
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const cancelOrders = async (req,res)=>{
    const orderId = req.params.orderId
    try {
        const orders = await orderService.cancelOrders(orderId);

        return res.status(200).send(orders);
        
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const deleteOrders = async (req,res)=>{
    const orderId = req.params.orderId
    try {
        const orders = await orderService.deleteOrders(orderId);

        return res.status(200).send(orders);
        
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports ={
    getAllOrders,
    confirmOrders,
    shipOrders,
    deliverOrders,
    cancelOrders,
    deleteOrders
}