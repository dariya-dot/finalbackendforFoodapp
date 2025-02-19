const express=require('express')
const orderRouter=express.Router()
const verifytoken=require('../middlewares/verifytoken')
const orderControler=require('../controlers/orderControler')

orderRouter.post('/save',verifytoken,orderControler.placeOrder)
orderRouter.get('/:userId', verifytoken,orderControler.getOrderDetails);



module.exports=orderRouter