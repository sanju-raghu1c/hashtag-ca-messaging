var bcrypt = require('bcryptjs');

exports.stringHasing = async function (string) {
     let encryptedString ;
     
    try {
      
        const salt = await bcrypt.genSalt(10);
         encryptedString = await bcrypt.hash(string, salt);
        return encryptedString;
        
      } catch (error) {
        console.log(error)
        return encryptedString;
    }
  };


exports.stringCompareWithHasedString = async function (string,hasedString)
{    
   let flag = false;
    try
    {
      flag = await bcrypt.compare(string,hasedString);

    }
   catch (error) {
    console.log(error)
    flag = false;
   }
  
   return flag;

}