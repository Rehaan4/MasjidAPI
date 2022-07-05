/* eslint-disable */
module.exports = {

  errHandler: (err, req, res, next) => {
    const statusCode = req.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      data: {
        msg: err.message,
      },
    });

    next();
  },

  headerFunction: (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'GET,PUT,POST,DELETE,OPTIONS,PATCH',
    );
    res.header(
      'Access-Control-Allow-Headers',
      [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'Accept-Language',
      ].join(', '),
    );

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    next();
  },

};
