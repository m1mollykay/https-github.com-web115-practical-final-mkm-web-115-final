// Author:  Molly-Kay Miller
// Date Written:  Tuesday, May 7, 2019
// This is the Spring 2019 WEB-115-3221 Final Practical Project;
// Intended to work on through Summer 2019 and beyond;
// Using new text editor Visual Studio Code;
// https://github.com/m1mollykay/https-github.com-web115-practical-final-mkm-web-115-final.git



function myFunction(x) {
  if (x.matches) { // If media query matches
    document.body.style.backgroundColor = "lightblue";
  } else {
    document.body.style.backgroundColor = "pink";
  }
}


var x = window.matchMedia("(max-width: 700px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes


var menuItems = document.getElementsByTagName("LI");

buildMenu();


buildMenu();
  function buildMenu(){
      var jResp = '';
    
        $.ajax({
            url : 'https://nflarrest.com/api/v1/crime',
            type : 'GET',
            dataType:'json',
            success : function(data) {         
                
                for(var i = 0; i < data.length; i++){
                    $('#mainMenu').append('<li id="'+data[i].Category+'" class="menItem">'+data[i].Category+' ('+data[i].arrest_count+')</li>');
                }
                
                $(".menItem").click(function(data){
                  getInfo(this.id);
                });
                
            },
            error : function(request,error)
            {
                alert("Request: "+JSON.stringify(request));
            }
        });
  }
    

function getInfo(focus){
  
      
        $.ajax({
            url : 'https://nflarrest.com/api/v1/crime/topPlayers/'+focus,
            type : 'GET',
            dataType:'json',
            success : function(data) {         
                
                var itemInformation = '';
                
                for(var i = 0; i < data.length; i++){
                    itemInformation = itemInformation + '<div id="'+data[i].Name+'" class="nameClick">'+data[i].Name+' ('+data[i].arrest_count+')</div>';
                }

                $('section').html(itemInformation);
                
                                $(".nameClick").click(function(data){
                  getDetails(this.id);
                });
            },
            error : function(request,error)
            {
                alert("Request: "+JSON.stringify(request));
            }
        });

  
}




function getDetails(focus){
  
      
        $.ajax({
            url : 'https://nflarrest.com/api/v1/player/arrests/'+focus,
            type : 'GET',
            dataType:'json',
            success : function(data) {         
                
                var itemInformation = '';
                
                itemInformation = itemInformation + '<p>'+data[0].Name+'</p>';
                itemInformation = itemInformation + '<p>'+data[0].Position_name+'</p>';
                itemInformation = itemInformation + '<p>'+data[0].Team_preffered_name+'</p>';
                itemInformation = itemInformation + '<p>'+data[0].Description+'</p>';
                itemInformation = itemInformation + '<p>'+data[0].Outcome+'</p>';
                itemInformation = itemInformation + '<p>'+data[0].ArrestSeasonState+'</p>';
              
                
                $('section').html(itemInformation);
            },
            error : function(request,error)
            {
                alert("Request: "+JSON.stringify(request));
            }
        });

  
}



