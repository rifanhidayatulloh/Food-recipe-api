module.exports = {
  sucses: (res, data, status, message, pagination) => {
    if (pagination) {
      res.json({
        code: 200,
        status,
        pagination,
        message,
        data,
      });
    } else {
      res.json({
        code: 200,
        status,
        message,
        data,
      });
    }
  },
  failed: (res, error, status, message) => {
    res.status(500).json({
      code: 500,
      status,
      error,
      message,
    });
  },
  sucessWithToken: (res, token, status, message) => {
    res.json({
      status,
      token,
      message,
    });
  },
};
