const { Router } = require('express');
const rateLimit = require('express-rate-limit');
// for middleware routing

// adding rate limit for the routes so that unwanted load of requests doesnt harm server
const limit = rateLimit({
  max: 100, // max requests
  windowMs: 60 * 60 * 1000, // 1 Hour
  message: 'Too many requests', // message to send
});

const router = new Router();

router.use('/events', require('./api/EventsApi'));
router.use('/masjid', require('./api/MasjidApi'));
router.use('/timings', require('./api/TimingsApi'), limit);
router.use('/auth', require('./api/AuthApi'));
router.use('/admin', require('./api/AdminApi'));

module.exports = router;
