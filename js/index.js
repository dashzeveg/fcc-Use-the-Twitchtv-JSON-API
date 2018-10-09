$(document).ready(function(){
  
  let display = (data1) => {
    
    let channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
    let channelstatus;
    
    channels.forEach((channel) => {
      $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + channel + '?callback=?', function(data) {
        if(data.stream === null || data.stream === undefined) {
           channelstatus = "Offline";
        } else {
           channelstatus = "Online";
        }
        
        $('.main').html('');
        
        $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + channel + '?callback=?', function(data) {
          let logo = data.logo != null ? data.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
          let name = data.display_name != null ? data.display_name : channel;
          let url = data.url;
          //let description = status === "online" ? ': ' + data.status : "";

          let html =`<div class="stream">
            <div class="logo"><img src="` + logo + `" alt="` + name + `"></div>
            <div class="name"><a href="` + url + `" target="_blank">` + name + `</a></div>
            <div class="status">` + channelstatus + `</div>
          </div>`;
            
          if (data1 == 1) {
            $('.main').append(html);
          } else if(data1 == 2 && channelstatus === "Online") {
            $('.main').append(html);
          } else if (data1 == 3 && channelstatus === "Offline") {
            $('.main').append(html);
          }

        }); 
        
      });
    });
  }
  
  $('.btn').click(function() {
    $('.btn').removeClass('btnActive');
    $(this).addClass('btnActive');
    $('.circle').removeClass('circleGreen');
    $(this).children('.circle').addClass('circleGreen');
    
    let data1 = $('.btnActive').attr('data');
    display(data1);
  });
  
  let data1 = $('.btnActive').attr('data');
  display(data1);
});