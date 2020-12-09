
const container = document.querySelector('.containers')
const timeContainer = document.querySelector('.formattedTime h2')
const greeting = document.querySelector(".greeting")
const icon = document.querySelector(".greeting i")
const curSpan = document.querySelector(".greeting span")
const locationText = document.querySelector('.container .location span')
const btn = document.querySelector('.btn button span')
const btns = document.querySelector('.btn button')
const next = document.querySelector('.next div')
const hidediv = document.querySelector('.next')
let isClicked=false
let htmlIcon=""
let btnIcon = document.createElement('i')
btn.onclick= ()=>{
   isClicked= !isClicked
   if(isClicked){
      btn.innerHTML="less"
      btnIcon.setAttribute('class','fa fa-angle-down')
      btns.classList.add('flip')
      hidediv.classList.add('show')
   }else{
      btn.innerHTML="more"
      btns.classList.remove('flip')
      hidediv.classList.remove('show')
      btnIcon.setAttribute('class', 'fa fa-angle-up')
   }
   btn.append(btnIcon)
   console.log(btnIcon)
}
let html=""
const fetchTime = ()=>{
   let timeD = new Date()
   let myHour = timeD.getHours()
   let hourFormat = myHour > 12 ? myHour - 12 : (myHour < 10 ? `0${myHour}` : myHour)
   let myMinute = timeD.getMinutes()
   let minFormat = myMinute < 10 ? `0${myMinute}` : myMinute
   let mySecs = timeD.getSeconds()
   let secFormat = mySecs < 10 ? `0${mySecs}` : mySecs
   let meridiemFormat = myHour >= 12 ? `PM` : `Am`
   timeContainer.innerHTML = `${hourFormat}:${minFormat}`
   let spanText = document.createTextNode(meridiemFormat)
   let spanEle = document.createElement('span')
   spanEle.setAttribute('id', "mySpan")
   setBg(myHour)
   spanEle.append(spanText)
   timeContainer.append(spanEle)
   setTimeout(fetchTime, 1000)
}
const setBg= hour=>{
   icon.style.color="#fff"
   icon.style.fontSize="10px"
   greeting.style.fontSize = "14px"
   switch(hour){
      case 12:
         case 13:
         case 14:
         case 15:
         case 16:
            html="Good Afternoon,"
         icon.classList.add('fa-sun')
         container.style.backgroundImage = `url('./Image/mid.jpg')`
         break
         case 17:
         case 18:
         case 19:
         case 20:
         case 21:
         case 22:
         case 23:
         html = "Good Evening,"
         icon.style.color = "gold"
            icon.classList.add('fa-moon')
         container.style.backgroundImage = `url('./Image/night.jpg')`
         break
         default:
         html = "Good Mornings,"
         container.style.backgroundImage = ` url('./Image/morning.jpg')`
         icon.classList.add('fa-cloud')
   }
   curSpan.innerHTML=html
}
let textHtml=""
const hideTextfun= async ()=>{
   try{
      let fetchData = await fetch('https://worldtimeapi.org/api/ip')
      let jsonData = await fetchData.json()
      textHtml = `<div class="content"><h3>Current Timezone</h3><h1>${jsonData.timezone}</h1></div><div class="content"><h3>day of the year</h3><h1>${jsonData.day_of_year}</h1></div><div class="content"><h3>Week Number</h3><h1>${jsonData.week_number}</h1></div><div class="content"><h3>Day of the week</h3><h1>${jsonData.day_of_week}</h1></div>`
      console.log(jsonData)
      next.innerHTML=textHtml
   }catch(e){}
}
const successCallBack= async position=>{
   try{
      const { latitude, longitude } = position.coords
      let url = `http://api.timezonedb.com/v2.1/get-time-zone?key=TTCQOKJT9N8N&format=json&by=position&lat=${latitude}&lng=${longitude}
`
      let fetchTime = await fetch(url)
      const jsonTime = await fetchTime.json()
      locationText.innerHTML = `${jsonTime.zoneName}`
      hideTextfun()
   }catch(e){}
}
const failedCallback= error=>{
   console.log(error)
}
const startTime = () => {
   fetchTime()
   btn.innerHTML = "more"
   btnIcon.setAttribute('class', 'fa fa-angle-up')
   btn.append(btnIcon)
   window.navigator.geolocation.getCurrentPosition(successCallBack, failedCallback)
}
window.onload = startTime
