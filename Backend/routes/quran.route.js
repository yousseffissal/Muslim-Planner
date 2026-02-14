const express = require('express');
const router = express.Router();
const { FetchQuranSurah } = require('../controllers/quran.controller');

router.get('/quranSurah/:surahnumber', FetchQuranSurah);

module.exports = router;