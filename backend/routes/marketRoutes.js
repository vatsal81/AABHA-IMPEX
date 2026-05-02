const express = require('express');
const router = express.Router();
const marketService = require('../utils/marketService');

// Live Market Prices
router.get('/prices', async (req, res) => {
    try {
        const prices = await marketService.getLivePrices();
        res.json(prices);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Live Market News
router.get('/news', async (req, res) => {
    try {
        const news = await marketService.getTradeNews();
        res.json(news);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Diagnostics for News Sources
router.get('/diagnostics', async (req, res) => {
    try {
        const diagnostics = await marketService.getDiagnostics();
        res.json(diagnostics);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

