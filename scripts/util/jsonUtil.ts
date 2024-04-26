import fs from 'fs'
export const writeObjectToJson=(fileName:string,obj:Object)=>{
  let json = JSON.stringify(obj);
  fs.writeFile(`static/${fileName}.json`, json, 'utf8', (()=>{console.log(`write to ${fileName} suc`)}));
}

