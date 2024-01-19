const fs = require("fs");


let batches = [];

var normalFiles = ['F1_C12.wav', 'F1_C34.wav','F1_C03.wav', 'F1_C31.wav','F1_C11.wav', 'F1_C04.wav','F1_C10.wav', 'F1_C07.wav','F1_C20.wav', 'F1_C23.wav','F1_C14.wav', 'F1_C35.wav','F1_C22.wav', 'F1_C21.wav','F1_C25.wav', 'F1_C30.wav','F1_C13.wav', 'F1_C33.wav','F1_C05.wav', 'F1_C36.wav','F1_C19.wav', 'F1_C32.wav','F1_C09.wav', 'F1_C08.wav','F1_C06.wav', 'F1_C02.wav', 'F1_C24.wav','F2_C03.wav', 'F2_C09.wav','F2_C35.wav', 'F2_C25.wav','F2_C20.wav', 'F2_C11.wav','F2_C24.wav', 'F2_C05.wav','F2_C23.wav', 'F2_C22.wav','F2_C31.wav', 'F2_C14.wav','F2_C34.wav', 'F2_C10.wav','F2_C06.wav', 'F2_C08.wav','F2_C07.wav', 'F2_C02.wav','F2_C33.wav', 'F2_C12.wav','F2_C04.wav', 'F2_C13.wav','F2_C30.wav', 'F2_C19.wav','F2_C32.wav', 'F2_C36.wav', 'F2_C21.wav', 'M1_C19.wav', 'M1_C05.wav', 'M1_C32.wav', 'M1_C23.wav','M1_C10.wav', 'M1_C24.wav','M1_C36.wav', 'M1_C06.wav','M1_C31.wav', 'M1_C21.wav','M1_C30.wav', 'M1_C12.wav','M1_C04.wav', 'M1_C07.wav','M1_C14.wav', 'M1_C33.wav','M1_C20.wav', 'M1_C09.wav','M1_C35.wav', 'M1_C02.wav','M1_C34.wav', 'M1_C22.wav','M1_C11.wav', 'M1_C03.wav','M1_C08.wav', 'M1_C25.wav','M1_C13.wav','M2_C14.wav', 'M2_C08.wav','M2_C11.wav', 'M2_C03.wav','M2_C33.wav', 'M2_C07.wav','M2_C13.wav', 'M2_C35.wav','M2_C04.wav', 'M2_C09.wav','M2_C25.wav', 'M2_C06.wav','M2_C36.wav', 'M2_C34.wav','M2_C05.wav', 'M2_C02.wav','M2_C24.wav', 'M2_C20.wav','M2_C21.wav', 'M2_C23.wav','M2_C12.wav', 'M2_C30.wav','M2_C32.wav', 'M2_C19.wav','M2_C31.wav', 'M2_C10.wav','M2_C22.wav'];
var goldFiles = ["F1_C01.wav","F2_C01.wav","M1_C01.wav","M2_C01.wav"];
let female1 = ["F1_C02.wav","F1_C03.wav","F1_C04.wav","F1_C05.wav","F1_C06.wav","F1_C07.wav","F1_C08.wav","F1_C09.wav","F1_C10.wav","F1_C11.wav","F1_C12.wav","F1_C13.wav","F1_C14.wav","F1_C19.wav","F1_C20.wav","F1_C21.wav","F1_C22.wav","F1_C23.wav","F1_C24.wav","F1_C25.wav","F1_C30.wav","F1_C31.wav","F1_C32.wav","F1_C33.wav","F1_C34.wav","F1_C35.wav","F1_C36.wav"];
let female2 = ["F2_C02.wav","F2_C03.wav","F2_C04.wav","F2_C05.wav","F2_C06.wav","F2_C07.wav","F2_C08.wav","F2_C09.wav","F2_C10.wav","F2_C11.wav","F2_C12.wav","F2_C13.wav","F2_C14.wav","F2_C19.wav","F2_C20.wav","F2_C21.wav","F2_C22.wav","F2_C23.wav","F2_C24.wav","F2_C25.wav","F2_C30.wav","F2_C31.wav","F2_C32.wav","F2_C33.wav","F2_C34.wav","F2_C35.wav","F2_C36.wav"];
let male1 = ["M1_C02.wav","M1_C03.wav","M1_C04.wav","M1_C05.wav","M1_C06.wav","M1_C07.wav","M1_C08.wav","M1_C09.wav","M1_C10.wav","M1_C11.wav","M1_C12.wav","M1_C13.wav","M1_C14.wav","M1_C19.wav","M1_C20.wav","M1_C21.wav","M1_C22.wav","M1_C23.wav","M1_C24.wav","M1_C25.wav","M1_C30.wav","M1_C31.wav","M1_C32.wav","M1_C33.wav","M1_C34.wav","M1_C35.wav","M1_C36.wav"];
let male2 = ["M2_C02.wav","M2_C03.wav","M2_C04.wav","M2_C05.wav","M2_C06.wav","M2_C07.wav","M2_C08.wav","M2_C09.wav","M2_C10.wav","M2_C11.wav","M2_C12.wav","M2_C13.wav","M2_C14.wav","M2_C19.wav","M2_C20.wav","M2_C21.wav","M2_C22.wav","M2_C23.wav","M2_C24.wav","M2_C25.wav","M2_C30.wav","M2_C31.wav","M2_C32.wav","M2_C33.wav","M2_C34.wav","M2_C35.wav","M2_C36.wav"];
let F1shuffled = ['F1_C12.wav', 'F1_C34.wav','F1_C03.wav', 'F1_C31.wav','F1_C11.wav', 'F1_C04.wav','F1_C10.wav', 'F1_C07.wav','F1_C20.wav', 'F1_C23.wav','F1_C14.wav', 'F1_C35.wav','F1_C22.wav', 'F1_C21.wav','F1_C25.wav', 'F1_C30.wav','F1_C13.wav', 'F1_C33.wav','F1_C05.wav', 'F1_C36.wav','F1_C19.wav', 'F1_C32.wav','F1_C09.wav', 'F1_C08.wav','F1_C06.wav', 'F1_C02.wav', 'F1_C24.wav'];
let F2shuffled = ['F2_C03.wav', 'F2_C09.wav','F2_C35.wav', 'F2_C25.wav','F2_C20.wav', 'F2_C11.wav','F2_C24.wav', 'F2_C05.wav','F2_C23.wav', 'F2_C22.wav','F2_C31.wav', 'F2_C14.wav','F2_C34.wav', 'F2_C10.wav','F2_C06.wav', 'F2_C08.wav','F2_C07.wav', 'F2_C02.wav','F2_C33.wav', 'F2_C12.wav','F2_C04.wav', 'F2_C13.wav','F2_C30.wav', 'F2_C19.wav','F2_C32.wav', 'F2_C36.wav', 'F2_C21.wav'];
let M1shuffled = ['M1_C19.wav', 'M1_C05.wav', 'M1_C32.wav', 'M1_C23.wav','M1_C10.wav', 'M1_C24.wav','M1_C36.wav', 'M1_C06.wav','M1_C31.wav', 'M1_C21.wav','M1_C30.wav', 'M1_C12.wav','M1_C04.wav', 'M1_C07.wav','M1_C14.wav', 'M1_C33.wav','M1_C20.wav', 'M1_C09.wav','M1_C35.wav', 'M1_C02.wav','M1_C34.wav', 'M1_C22.wav','M1_C11.wav', 'M1_C03.wav','M1_C08.wav', 'M1_C25.wav','M1_C13.wav'];
let M2shuffled = ['M2_C14.wav', 'M2_C08.wav','M2_C11.wav', 'M2_C03.wav','M2_C33.wav', 'M2_C07.wav','M2_C13.wav', 'M2_C35.wav','M2_C04.wav', 'M2_C09.wav','M2_C25.wav', 'M2_C06.wav','M2_C36.wav', 'M2_C34.wav','M2_C05.wav', 'M2_C02.wav','M2_C24.wav', 'M2_C20.wav','M2_C21.wav', 'M2_C23.wav','M2_C12.wav', 'M2_C30.wav','M2_C32.wav', 'M2_C19.wav','M2_C31.wav', 'M2_C10.wav','M2_C22.wav'];
let male3 = [4,9,14,19,24,29,34,39,44,49,54,59,64,69,74,79,84,89,94,99,104,109];
let b = [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,   1,6,11,16,21,26,31,36,41,46,51,56,61,66,71,76,81,86,91,96,101,106,111,  2,7,12,17,22,27,32,37,42,47,52,57,62,67,72,77,82,87,92,97,102,107,  3,8,13,18,23,28,33,38,43,48,53,58,63,68,73,78,83,88,93,98,103,108,   4,9,14,19,24,29,34,39,44,49,54,59,64,69,74,79,84,89,94,99,104,109]

// "F1_C01.wav","F1_C02.wav","F1_C03.wav","F1_C04.wav","F1_C05.wav","F1_C06.wav","F1_C07.wav","F1_C08.wav","F1_C09.wav","F1_C10.wav","F1_C11.wav","F1_C12.wav","F1_C13.wav","F1_C14.wav","F1_C19.wav","F1_C20.wav","F1_C21.wav","F1_C22.wav","F1_C23.wav","F1_C24.wav","F1_C25.wav","F1_C30.wav","F1_C31.wav","F1_C32.wav","F1_C33.wav","F1_C34.wav","F1_C35.wav","F1_C36.wav","F2_C01.wav","F2_C02.wav","F2_C03.wav","F2_C04.wav","F2_C05.wav","F2_C06.wav","F2_C07.wav","F2_C08.wav","F2_C09.wav","F2_C10.wav","F2_C11.wav","F2_C12.wav","F2_C13.wav","F2_C14.wav","F2_C19.wav","F2_C20.wav","F2_C21.wav","F2_C22.wav","F2_C23.wav","F2_C24.wav","F2_C25.wav","F2_C30.wav","F2_C31.wav","F2_C32.wav","F2_C33.wav","F2_C34.wav","F2_C35.wav","F2_C36.wav","M1_C01.wav","M1_C02.wav","M1_C03.wav","M1_C04.wav","M1_C05.wav","M1_C06.wav","M1_C07.wav","M1_C08.wav","M1_C09.wav","M1_C10.wav","M1_C11.wav","M1_C12.wav","M1_C13.wav","M1_C14.wav","M1_C19.wav","M1_C20.wav","M1_C21.wav","M1_C22.wav","M1_C23.wav","M1_C24.wav","M1_C25.wav","M1_C30.wav","M1_C31.wav","M1_C32.wav","M1_C33.wav","M1_C34.wav","M1_C35.wav","M1_C36.wav","M2_C01.wav","M2_C02.wav","M2_C03.wav","M2_C04.wav","M2_C05.wav","M2_C06.wav","M2_C07.wav","M2_C08.wav","M2_C09.wav","M2_C10.wav","M2_C11.wav","M2_C12.wav","M2_C13.wav","M2_C14.wav","M2_C19.wav","M2_C20.wav","M2_C21.wav","M2_C22.wav","M2_C23.wav","M2_C24.wav","M2_C25.wav","M2_C30.wav","M2_C31.wav","M2_C32.wav","M2_C33.wav","M2_C34.wav","M2_C35.wav","M2_C36.wav"

// fs.readdir("./audio_files/real_files", (err, files) => { 
//   if (err) 
//     console.log(err); 
//   else { 
//     //normalFiles = files;
//     files.forEach(file => { 
//       console.log('"' + file + '",');
//       //normalFiles.push(file)
//     }) 
//   } 
// })

let b1list = [0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,75,78,81,84,87,90,93,96,99,102,105,108,111]
  
// fs.readdir("./audio_files/ref/gold", (err, files) => { 
//   if (err) 
//     console.log(err); 
//   else { 
//     files.forEach(file => { 
//       goldFiles.push(file)
//     }) 
//   } 
// })

// fs.readdir("./audio_files/ref/trick", (err, files) => { 
//   if (err) 
//     console.log(err); 
//   else { 
//     files.forEach(file => {
//       //let element = createElement(file, "normal", "./audio_files/ref/trick") 
//       trickFiles.push(file)
//     }) 
//   } 
// }) 

function createElement(name, type, path){
    let e = {
        "Name": name,
        "Type": type,
        "Path": path
    }
    return e;
}

let b1 = [];
let b2 = [];
let b3 = [];
// let b4 = [];
// let b5 = [];

// for(let i = 0; i < normalFiles.length; i+=5){
//   b1.push(createElement(normalFiles[i], "Normal", "audio_files/real_files/"));
//   b2.push(createElement(normalFiles[i+1], "Normal", "audio_files/real_files/"));
//   if(i+2 < normalFiles.length - 1){
//     b3.push(createElement(normalFiles[i+2], "Normal", "audio_files/real_files/"));
//     b4.push(createElement(normalFiles[i+3], "Normal", "audio_files/real_files/"));
//     b5.push(createElement(normalFiles[i+4], "Normal", "audio_files/real_files/"));
//   }
// }
// console.log(b1);
// console.log(b2);
// console.log(b3);
// console.log(b4);
// console.log(b5);

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  
  // While there remain elements to shuffle.
  while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  
  return array;
}

// shuffle(male2);
// console.log(male2);
// shuffle(normalFiles);
let counter = 0;
for(let i = 0; i < normalFiles.length; i++){
  if(i < 39){
    b1.push(createElement(normalFiles[counter], "Normal", "audio_files/real_files/"));
    //b1.push(counter);
    counter+=3;
    if(counter>107){
      counter=1;
    } 
  }
  else if(i < 78){
    b2.push(createElement(normalFiles[counter], "Normal", "audio_files/real_files/"));
    //b2.push(counter);
    counter+=3;
    if(counter > 107){
      counter = 2;
    }
  }
  else{
    b3.push(createElement(normalFiles[counter], "Normal", "audio_files/real_files/"));
    //b3.push(counter);
    counter+=3;
  }
  
}



console.log(b1);
console.log(b2);
console.log(b3);

// for(let j = 0; j < 10; j++){
//     let batch = [];
//     console.log(normalFiles);
//     for(let i = 0; i < 20; i++){
//         let rnd;
//         let file;
//         let element;
//         if(i === 4 || i === 13){
//             rnd = Math.floor(Math.random() * goldFiles.length)
//             file = goldFiles.splice(rnd, 1);
//             element = createElement(file, "gold", "audio_files/ref/gold/")
//             batch.push(element)
//         }
//         else if(i === 8 || i === 17){
//             rnd = Math.floor(Math.random() * trickFiles.length)
//             file = trickFiles.splice(rnd, 1);
//             element = createElement(file, "trick", "audio_files/ref/trick/")
//             batch.push(element);
//         }
//         else{
//             rnd = Math.floor(Math.random() * normalFiles.length)
//             file = normalFiles.splice(rnd, 1)
//             element = createElement(file, "normal", "audio_files/ref/normal/")
//             batch.push(element)
//         }
//     }
//     batches.push(batch)
// }




//fs.writeFileSync("name of json", JSON.stringify(resultarray))
//console.log(badges);



