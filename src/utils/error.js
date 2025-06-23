const error = (err,res) =>{
  console.log(err.message);
  res
  .status(err.code || 500)
  .json({ message : err.message || "Unknown Error"});
};

export default error;