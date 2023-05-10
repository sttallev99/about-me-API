const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Welcome to auth page')
})

module.exports = router;