module.exports = async function (handler) {
  try {
    result = await handler;
    // console.log("handler result-->", result);
    return { success: true, body: result };
  } catch (err) {
    return { success: false, error: err };
  }
};
