exports.get = async (req, res) => {
  return res.status(200).json(process.env.MONGO_DB);
};
