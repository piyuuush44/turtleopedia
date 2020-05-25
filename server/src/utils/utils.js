exports.convertArrayKeyToString = (array)=>{
  return array.reduce((final, value)=>`${final},${value}`);
};
