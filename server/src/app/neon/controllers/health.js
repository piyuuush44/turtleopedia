exports.get = async (req, res) => {
  console.log(process.env);
  return res.status(200).json('Cheers !');
};
