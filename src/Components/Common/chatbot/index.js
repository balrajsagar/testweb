import React, { useReducer } from 'react'
import $ from 'jquery';
import './chatbot.scss';
import { initialState, reducer } from './reducer';
import { useSelector } from 'react-redux';

function ChatBot(){
  //  eslint-disable-next-line
  const [state, dispatch] = useReducer(reducer, initialState);
  const webProperties = useSelector(state => state.landingReducer.webProperties)

     return(
        <div id="body"> 
        <div id="chat-circle" style={{backgroundColor: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b'}} class="btn btn-raised">
                <div id="chat-overlay"></div>
                  <i class="mdi mdi-comment" style={{fontSize: "24px"}}></i>
            </div>
          
          <div class="chat-box">
            <div class="chat-box-header" >
              <span id="chat-box-header">{state.title}</span>
              {/* <span class="chat-box-toggle"><i class="material-icons">close</i></span> */}
              <span class="chat-box-toggle"><i class="mdi mdi-close" style={{fontSize: "24px"}} ></i></span>
            </div>
            <div class="chat-box-body">
              <div class="chat-box-overlay">   
              </div>
              <div class="chat-logs">
              
        <div id="result"></div>
              </div>
            </div>
            <div class="chat-input">      
              <form>
                <input type="text" id="chat-input" placeholder="Send a message..."/>
              <button type="submit" class="chat-submit" id="chat-submit"><i class="mdi mdi-send" style={{fontSize: "24px"}}></i></button>
              </form>      
            </div>
          </div>
          
        </div>
//  <h1>Hello</h1>
     )
};

$(function() {

  //var bot_store = []; 
  //sessionStorage.clickcount = 0; var data2 = ["test"]; sessionStorage.setItem("data", JSON.stringify(data2)); 
  sessionStorage.chatbox  = "close";
  sessionStorage.clickcount = 0;
  // console.log(sessionStorage )
  // eslint-disable-next-line
  if(sessionStorage.chatbox =='open'){
    openChat();
    }
  
  var retrievedData = sessionStorage.getItem("data");
  var data2 = JSON.parse(retrievedData); 
  // eslint-disable-next-line
  if (sessionStorage.clickcount == 0) {
   // eslint-disable-next-line
        sessionStorage.clickcount = 0;   sessionStorage.chatbox = 'close';var data2 =[];   
  var jsonData1 = JSON.stringify({"bot_text": "hi"});
  
  // url for all communication
  $.ajax({
              url: "https://chatbot.agile24x7.com/agile_bot",
              //url: "message.php",
               type: "POST",
               dataType: "json",                  
               data: jsonData1,
               contentType: "application/json",
               success: function(response){
                     
     data2[0]=response;
  generate_message(data2[0], 'user');
  sessionStorage.setItem("data", JSON.stringify(data2));
  
                      },
               error: function(err){
  
      data2[0]='error';
  generate_message(data2[0], 'user');
  sessionStorage.setItem("data", JSON.stringify(data2));
               }
          });    
  
      }
  
  else {
  generate_message(data2[0], 'user');
  }
  
  
  for(var i=1; i <= sessionStorage.clickcount; i=i+2)
  {
  //generate_message(i, 'self');
  generate_message(data2[i], 'self');
  generate_message(data2[i+1], 'user');
  
  } 
  
   /* if(typeof(Storage) !== "undefined") {
      if (sessionStorage.clickcount) {
         
        sessionStorage.clickcounter = Number(sessionStorage.clickcounter)+1;  
  
      } else {
        sessionStorage.clickcounter = 1; 
      }
      document.getElementById("result").innerHTML = "You have clicked the button " + sessionStorage.clickcounter + " time(s).";
    } else {
      document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    } */
  
  
   var INDEX = 0; 
    $("#chat-submit").click(function(e) {
      // console.log("im here")
      e.preventDefault();
  
      var msg = $("#chat-input").val(); 
      // eslint-disable-next-line
      if(msg.trim() == ''){
        return false;
      }
  sessionStorage.clickcount = Number(sessionStorage.clickcount)+1; 
  data2[sessionStorage.clickcount]=msg;
  //generate_message(bot_store[sessionStorage.clickcount], 'self');
  
  sessionStorage.setItem("data", JSON.stringify(data2)); 
  
      generate_message(msg, 'self');
      // eslint-disable-next-line
      var buttons = [
          {
            name: 'Existing User',
            value: 'existing'
          },
          {
            name: 'New User',
            value: 'new'
          }
        ];
        
  
        var jsonData = JSON.stringify({"bot_text": msg});
  
  
  $.ajax({
              url: "https://chatbot.agile24x7.com/agile_bot",
              //url: "message.php",
               type: "POST",
               dataType: "json",                  
               data: jsonData,
               contentType: "application/json",
               success: function(response){
                           setTimeout(function() {      
        generate_message(response, 'user');  
      }, 200)
  sessionStorage.clickcount = Number(sessionStorage.clickcount)+1; 
  data2[sessionStorage.clickcount]=response;
  //generate_message(bot_store[sessionStorage.clickcount], 'self');
  
  sessionStorage.setItem("data", JSON.stringify(data2)); 
                      },
               error: function(err){
                  console.log(JSON.stringify(err));
  sessionStorage.clickcount = Number(sessionStorage.clickcount)+1; 
  data2[sessionStorage.clickcount]='error';
  generate_message('error', 'user'); 
  
  sessionStorage.setItem("data", JSON.stringify(data2)); 
               }
          });  
             
          /* start ajax code
                  $.ajax({
                      url: 'message.php',
                      type: "POST",
                      data: {"text": msg},
                     // data: 'text='+msg,
                      dataType: "json",                    
                      success: function(result){
                           setTimeout(function() {      
        generate_message(result, 'user');  
      }, 1000)
                      }
                  }); */
          
    })
    
    function generate_message(msg, type) {
      
      // console.log("in functn")
      INDEX++;
      var str="";
      str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
     
      str += "          <div class=\"cm-msg-text\">";
      str += msg;
      str += "          </div>";
      str += "        </div>";
      $(".chat-logs").append(str);
      $("#cm-msg-"+INDEX).hide().fadeIn(300);
      if(type === 'self'){
       $("#chat-input").val(''); 
      }    

      if(typeof $('.chat-logs')[0] !== 'undefined'){
        $('.chat-logs').scrollTop($('.chat-logs')[0].scrollHeight);
      } 

    }  
  
  
    // eslint-disable-next-line
    function generate_button_message(msg, buttons){    
      /* Buttons should be object array 
        [
          {
            name: 'Existing User',
            value: 'existing'
          },
          {
            name: 'New User',
            value: 'new'
          }
        ]
      */
      INDEX++;
      var btn_obj = buttons.map(function(button) {
         return  "              <li class=\"button\"><a href=\"javascript:;\" class=\"btn btn-primary chat-btn\" chat-value=\""+button.value+"\">"+button.name+"</a></li>";
      }).join('');
      var str="";
      str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg user\">";
      str += "          <span class=\"msg-avatar\">";
      str += "            <img src=\"https://image.crisp.im/avatar/operator/196af8cc-f6ad-4ef7-afd1-c45d5231387c/240/?1483361727745\">";
      str += "          </span>";
      str += "          <div class=\"cm-msg-text\">";
      str += msg;
      str += "          </div>";
      str += "          <div class=\"cm-msg-button\">";
      str += "            <ul>";   
      str += btn_obj;
      str += "            </ul>";
      str += "          </div>";
      str += "        </div>";
      $(".chat-logs").append(str);
      $("#cm-msg-"+INDEX).hide().fadeIn(300);   
      
      // $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);

      if(typeof $('.chat-logs')[0] !== 'undefined'){
        $('.chat-logs').scrollTop($('.chat-logs')[0].scrollHeight);
      } 
      $("#chat-input").attr("disabled", true);
    }
    
    $(document).delegate(".chat-btn", "click", function() {
      // console.log("chat button")
      // eslint-disable-next-line
      var value = $(this).attr("chat-value");
      var name = $(this).html();
      $("#chat-input").attr("disabled", false);
      generate_message(name, 'self');
    })
    
    $("#chat-circle").click(function() {  
    
      $("#chat-circle").toggle('scale');
      $(".chat-box").toggle('scale');
      console.log('open');sessionStorage.chatbox = 'open';
    })
    
    $(".chat-box-toggle").click(function() {
      $("#chat-circle").toggle('scale');
      $(".chat-box").toggle('scale');
      sessionStorage.clear();
        console.log('close'); sessionStorage.chatbox = 'close';
    })
  
   
  
    function openChat(){ 
    
      $("#chat-circle").toggle('scale');
      $(".chat-box").toggle('scale');
     // console.log('open');sessionStorage.chatbox = 'open';
  
  }
  // eslint-disable-next-line
  function closeChat(){ 
    
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
   // console.log('open');sessionStorage.chatbox = 'open';
  
  }
  
  })

export default ChatBot;