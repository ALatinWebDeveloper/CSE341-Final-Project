const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags = ['Hello world'];
    res.send('Hello, World!');
});

router.use('/auth', require('./authRoutes'));

router.use('/products', require('./products'));

router.use('/categories', require('./categories'));

router.use('/orders', require('./orders'));

router.use('/reviews', require('./reviews'));

module.exports = router;