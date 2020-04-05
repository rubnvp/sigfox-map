// hexIEEEtoFloat function from: https://gist.githubusercontent.com/laerciobernardo/498f7ba1c269208799498ea8805d8c30/raw/152175a1a5e8f837cdb3c2d62f389d5c890ec35e/hexIEEEtoFloat.js
export function hexIEEEtoFloat(str) {
  var float = 0, sign, mantissa,exp,
      int = 0, multi = 1;
  if (/^0x/.exec(str)) {
    int = parseInt(str,16);
  }else{
    for (var i = str.length -1; i >=0; i -= 1) {
      if (str.charCodeAt(i)>255) {
        console.log('Wrong string parametr'); 
        return false;
      }
      int += str.charCodeAt(i) * multi;
      multi *= 256;
    }
  }
  sign = (int>>>31)?-1:1;
  exp = (int >>> 23 & 0xff) - 127;
  mantissa = ((int & 0x7fffff) + 0x800000).toString(2);
  for (i=0; i<mantissa.length; i+=1){
    float += parseInt(mantissa[i])? Math.pow(2,exp):0;
    exp--;
  }
  return float*sign;
}

function getEncodedCoord(encodedCoord) {
    const hexEncodedLat = '0x' + [
            encodedCoord.slice(6, 8),
            encodedCoord.slice(4, 6),
            encodedCoord.slice(2, 4),
            encodedCoord.slice(0, 2),
        ]
        .join('');
    return hexIEEEtoFloat(hexEncodedLat);
}

export const getEncodedCoords = encodedCoordinates => ({
    lat: getEncodedCoord(encodedCoordinates.slice(0,8)),
    long: getEncodedCoord(encodedCoordinates.slice(9,16)),
});