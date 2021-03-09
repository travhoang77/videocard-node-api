module.exports = function (handler) {
  async (req, res) => {
    try {
      const result = await handler;
      return result;
    } catch (err) {
      return err;
    }
  };
};
