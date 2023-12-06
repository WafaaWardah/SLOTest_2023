const fs = require("fs");


let badges = [];

var normalFiles = [];
let goldFiles = [];
let trickFiles = [];

fs.readdir("./audio_files/ref/normal", (err, files) => { 
  if (err) 
    console.log(err); 
  else { 
    //normalFiles = files;
    files.forEach(file => { 
      console.log(typeof(file));
      normalFiles.push(file)
    }) 
  } 
})


  
fs.readdir("./audio_files/ref/gold", (err, files) => { 
  if (err) 
    console.log(err); 
  else { 
    files.forEach(file => { 
      goldFiles.push(file)
    }) 
  } 
})

fs.readdir("./audio_files/ref/trick", (err, files) => { 
  if (err) 
    console.log(err); 
  else { 
    files.forEach(file => {
      //let element = createElement(file, "normal", "./audio_files/ref/trick") 
      trickFiles.push(file)
    }) 
  } 
}) 

function createElement(name, type, path){
    let e = {
        "Name": name,
        "Type": type,
        "Path": path
    }
    return e;
}

for(let j = 0; j < 10; j++){
    let badge = [];
    console.log(normalFiles);
    for(let i = 0; i < 20; i++){
        let rnd;
        let file;
        let element;
        if(i === 4 || i === 13){
            rnd = Math.floor(Math.random() * goldFiles.length)
            file = goldFiles.splice(rnd, 1);
            element = createElement(file, "gold", "audio_files/ref/gold/")
            badge.push(element)
        }
        else if(i === 8 || i === 17){
            rnd = Math.floor(Math.random() * trickFiles.length)
            file = trickFiles.splice(rnd, 1);
            element = createElement(file, "trick", "audio_files/ref/trick/")
            badge.push(element);
        }
        else{
            rnd = Math.floor(Math.random() * normalFiles.length)
            file = normalFiles.splice(rnd, 1)
            element = createElement(file, "normal", "audio_files/ref/normal/")
            badge.push(element)
        }
    }
    badges.push(badge)
}




//fs.writeFileSync("name of json", JSON.stringify(resultarray))
//console.log(badges);



