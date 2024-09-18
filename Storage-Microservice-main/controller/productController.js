const express = require('express');
const products = require('../model/products');
const middleware = require('../middleware/studentWare');
const {logRequests} = require('../helper/logsHelper');

const router = express.Router();

router.post('/product/update', async(req, res) => {
    try {
    const update = await products.findOne({product : req.body.product});
    if(!update) {
        const newProduct = new products({
            product : req.body.product,
            totalCost : req.body.cost,
            cost : []
        });
        newProduct.cost.push(req.body.cost);
        await newProduct.save();
        await logRequests('POST', '/product/update', res);
        return res.sendStatus(200);
    }
    update.totalCost += req.body.cost;
    update.cost.push(req.body.cost);
    await update.save();
    res.sendStatus(200);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.get('/product/getAll', middleware.constAdminSender, async (req, res) => {
    try {
        const product = await products.find({});
        await logRequests('GET', '/product/getAll', res);
        await res.status(200).json(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/product/clear', middleware.adminSender, async (req, res) => {
    try {
        await products.deleteMany({});
        await logRequests('DELETE', '/product/clear', res);
        res.sendStatus(200);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;