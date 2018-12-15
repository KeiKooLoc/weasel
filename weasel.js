const target = 'METHINKS IT IS LIKE A WEASEL';
const mut = 5;
const copies = 100;
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ';

function genStr(){
  let str = '';
  for (let i = 0; i < target.length; i++){
    str += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return str;
};

function compStr(str){
  let matches = 0;
  for (let i = 0; i < target.length; i++){
    if (str[i] === target[i]){
      matches += 1;
    }
  }
  return matches;
};

function modStr(str){
  let newStr = str;
  for (let i = 0; i < str.length; i++){
    const prob = Math.floor(Math.random() * 100);
    if (prob < mut){
      newStr = newStr.substring(0, i) + alphabet.charAt(Math.floor(Math.random() * alphabet.length))
              + newStr.substring(i+1, str.length);
    }
  }
  return newStr;
};

// the same func as modStr but letters which are correct can't mutate. To use this - change line 60
function modStrLock(str){
  let newStr = str;
  for (let i = 0; i < str.length; i++){
    if(newStr[i] !== target[i]){
      const prob = Math.floor(Math.random() * 100);
      if (prob < mut){
        newStr = newStr.substring(0, i) + alphabet.charAt(Math.floor(Math.random() * alphabet.length))
                + newStr.substring(i+1, str.length);
      }
    }
  }
  return newStr;
};

var resultList = [];
var startStr = genStr();
var strFound = false;
var loopNumber = 0;

while (!strFound){
  var strList = Array.from(Array(copies), x => '');
  var matchesList = Array.from(Array(copies), x => '');
  for (let i = 0; i < copies; i++){
    strList[i] = modStr(startStr);
    matchesList[i] = compStr(strList[i]);
  }
  maxMatch = Math.max.apply(null, matchesList);
  if (maxMatch === target.length){
    strFound = true;
  }
  startStr = strList[matchesList.indexOf(maxMatch)];
  resultList.push(loopNumber + ': ' + startStr + ' |matches: ' + maxMatch);
  loopNumber += 1;
};

for (let i = 0; i < resultList.length; i++){
  console.log(resultList[i]);
}
