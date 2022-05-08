let username = document.querySelector('input')
let button = document.querySelector('button')
let error = document.querySelector('.error');
let api = "https://api.github.com/users/";

let name = document.getElementById('name')

let folCount = document.querySelector('.userdata pre')

let img = document.querySelector('.userdata img')

let idk = document.querySelector('.repos')

button.addEventListener('click',(event)=>{




  if (username.value.length == 0){
    error.innerHTML = 'user not found try agaim!'
    return;
  }
  idk.classList.remove('hidden')
  document.querySelector('.userdata').classList.remove('hidden')
  
  f(username.value.trim())
  
});

function setup(obj){
  name.innerHTML = obj['name']
  folCount.innerHTML = obj['followers'] + ' followers,'+ obj['following'] + ' following'
  img.src = obj['avatar_url']


  fetch(obj['repos_url'])
  .then(obj => obj.json())
  .then((data)=>{
    repos(data)
  });
}

function repos(sata){
  //console.table(sata)
  while(idk.hasChildNodes()){
    idk.removeChild(idk.firstChild)
  }
  for (let i=1;i<sata.length;i++){
    let base = document.createElement('div')
    base.classList.add('idk')
    let text = document.createElement('img')
    text.src = img.src
    let heist = document.createElement('div')
    heist.classList.add('heist')
    let title = document.createElement('p')
    title.style.fontSize = '1.4rem';
    title.innerHTML = String(sata[i]["full_name"]).split('/')[1]
    heist.appendChild(title)
    let descrip = document.createElement('p')
    descrip.innerHTML = sata[i]['description']

    let langs = document.createElement('div')

    let languages = String(sata[0]['language']).split()
    langs.classList.add('lang')
   // console.log(languages)
    for (let v = 0;v<languages.length;v++){
      let lan = document.createElement('li')
      lan.innerHTML = languages[v]
      lan.style.color = randomColor()
      langs.appendChild(lan)
    }



    heist.appendChild(descrip)
    heist.appendChild(langs)
    base.appendChild(text)
    base.appendChild(heist)
    idk.appendChild(base)
    idk.addEventListener('click', (e)=>
      {
        location.href = "https://www.github.com/"+username.value + "/"+title.innerHTML
      });
  }
}
function randomColor(){
  let first = Math.random()*255
  let sec = Math.random()*255
  let third = Math.random()*255
  return 'rgb('+first+','+sec+','+third+')'
}

async function f(name){
  await fetch(api + name).then(out => out.json()).then((sata) =>{ 
    error.innerHTML = ""
    if (sata['login'] == undefined){
      error.innerHTML='User not found'
    }
    else{
      error.innerrHTML = 'User found  ' + sata['login']
      setup(sata)
    }
  });
}

