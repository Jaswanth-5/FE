const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
var voicebtn = document.getElementById("voicebtn");
var stopbtn = document.getElementById("stopbtn");

var text = document.getElementById("french")
var engText = document.getElementById("english")



const aiUrl = 'http://localhost:3000/ai?message='
const aiUrlFrench = 'http://localhost:3000/ai/fr?message='




var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

var grammer = "#JSGF V1.0;";
var recognition = new SpeechRecognition();
var speechRecognitionGrammerList = new SpeechGrammarList();
speechRecognitionGrammerList.addFromString(grammer, 1);



recognition.grammers = speechRecognitionGrammerList;
let currentLanguage = 'en-US';
recognition.lang = currentLanguage;
// recognition.lang = "fr-FR";
//recognition.continuous = true;
recognition.interimResults = false;



let femaleVoice = null;
window.speechSynthesis.onvoiceschanged = function() {
  let voices = window.speechSynthesis.getVoices();
  femaleVoice = voices.find(voice => voice.name.toLowerCase().includes('female'));
};

function speak(text){
  
    speak1(text)

    arriveMessage(BOT_IMG,"left",text)

  }


  function speak1(text){
    let utterance = new SpeechSynthesisUtterance();
    utterance.text = text
    utterance.voice =  window.speechSynthesis.getVoices()[4];
    window.speechSynthesis.speak(utterance);
  
  }


  function english(){

    if(currentLanguage !=="en-US"){
     
       speak("Language changed to English");
   
       currentLanguage = 'en-US';
       
       recognition.lang = currentLanguage;
       data = "english"
   
       var menu = document.getElementById("menu");
       menu.style.display = "none";
       text.style.opacity= 1
       text.style.cursor = "pointer"
       
       engText.style.opacity =  0.5
       engText.style.cursor = "not-allowed"
       
     }
   
     
}
   var data = "english"
   
   function french(){
   
     if(currentLanguage !=='fr-FR'){
       currentLanguage = 'fr-FR';
       recognition.lang = currentLanguage; 
       speak("Language changed to French");
       data = "french"
       
   
       var menu = document.getElementById("menu");
       menu.style.display = "none";
       text.style.opacity = 0.5
       text.style.cursor = "not-allowed"

       engText.style.opacity =  1
       engText.style.cursor= "pointer"
       
     
     }
    
   }



   


//////////////



  
recognition.onresult = function(event) {

    var last = event.results.length - 1;
    var command = event.results[last][0].transcript;
    var message = command;


     if(data == "english"){
      appendMessage("right",command)
      AiFetchData(command)

     }
     else{
      appendMessage("right",command)
      AiFetchDataFrench(command)
     }
     
      
}






const BOT_MSGS = [
  "Hi, how are you?",
  "Ohh... I can't understand what you trying to say. Sorry!",
  "I like to play games... But I don't know how to play!",
  "Sorry if my answers are not relevant. :))",
  "I feel sleepy! :("
];


const BOT_IMG = "./assets/download.png";
const PERSON_IMG = "./assets/jas.jpg";
const BOT_NAME = "BOT";
const PERSON_NAME = "User";

msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  

  // appendMessage("right", msgText);
  msgerInput.value = "";
  // arriveMessage(BOT_IMG, "left", msgText)



  if(data == "english"){
    appendMessage("right",msgText)
    AiFetchData(msgText)
  }
    else{
    appendMessage("right",msgText)
    AiFetchDataFrench(msgText)
   }

//   botResponse();
});

function appendMessage(side, text) {

  const msgHTML = `
    <div class="msg ${side}-msg">
    
      <div class="msg-bubble">
        <div class="msg-info">
        
        <div class="msg-text">${text}</div>
        </div>
       
        <div class="msg-info-time">${formatDate(new Date())}</div>

      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function arriveMessage(img, side, text) {
    
    const msgHTML = `
      <div class="msg ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>
  
        <div class="msg-bubble">
          <div class="msg-info">
          
          <div class="msg-text">${text}</div>
          </div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
  
        </div>
      </div>
    `;
  
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
  }

function botResponse(msgText) {
  // const r = random(0, BOT_MSGS.length - 1);
  // const msgText = BOT_MSGS[r];
  const delay = msgText.split(" ").length * 100;

  // setTimeout(() => {
  //   arriveMessage(BOT_IMG, "left", msgText);
  // }, delay);

  setTimeout(() => {
  AiFetchData(msgText)
  }, delay);
  
}


function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  const twelveHourFormatHours = hours % 12 || 12; // Convert 0 to 12

  const formattedHours = "0" + twelveHourFormatHours;
  const formattedMinutes = "0" + minutes;

  return `${formattedHours.slice(-2)}:${formattedMinutes.slice(-2)} ${ampm}`;
}


function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}



function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  }
  



  
voicebtn.addEventListener("click", function() {
        recognition.start()
        voicebtn.classList.add("hidden");
        stopbtn.classList.remove("hidden")
 
})


stopbtn.addEventListener("click",function(){
     recognition.stop();
     stopbtn.classList.add("hidden")
     voicebtn.classList.remove("hidden")

})

recognition.onspeechend = function() {
    recognition.stop();
    voicebtn.classList.remove("hidden")
    stopbtn.classList.add("hidden")
}



async function AiFetchData(input) {

    try {
      const response = await fetch(aiUrl+input);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      speak(data.message)
       
    } catch (error) {
      console.error('Error fetching data:', error);
      speak('Connection lost to the server')
    
      
        
    }
  
  }
  
  
  async function AiFetchDataFrench(input) {
  
    try {
      const response = await fetch(aiUrlFrench+input);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      speak(data.message)
       
    } catch (error) {
      console.error('Error fetching data:', error);
      speak('Connection lost to the server')
      // speak('Je veux connaître les détails de votre entreprise?')
      
    }
  
  }