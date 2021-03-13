module.exports = async function (handler) {
  try {
    result = await handler;
    if (!result) return { success: false, message: "Object not found" };
    return { success: true, body: result };
  } catch (err) {
    return { success: false, error: err };
  }
};
