// minimal PNG dimension reader (IHDR)
const fs=require("fs");
module.exports=function(p){
  const b=fs.readFileSync(p);
  // PNG: width at bytes 16-19, height 20-23 (big-endian)
  if(b.slice(0,8).toString("hex")==="89504e470d0a1a0a"){
    return {w:b.readUInt32BE(16), h:b.readUInt32BE(20)};
  }
  return {w:1,h:1};
};
