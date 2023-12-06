//The URIs of the REST endpoints related to media
postMedia = "https://prod-49.eastus.logic.azure.com:443/workflows/97bc92545d164828b97c1a651ffb4f24/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=15ykK8nnyR9Z-COoaPcdfXqWcbSTJ42YrFadHfu36kw";
retrieveAllMedia = "https://prod-00.eastus.logic.azure.com:443/workflows/437e21f4a81343ad8b0e48996796e105/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Tb5O5yYfT0JGAkCLOp-5uEN3viGZe-iq1Xpk7ZPo9_0";
removeMedia0 = "https://prod-03.eastus.logic.azure.com/workflows/43f5e508cf50474f8e0ce80c18821e6e/triggers/manual/paths/invoke/rest/v1/media/";
removeMedia1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HwnyShAkBW7qAtZIjfXc2KJKlPVgW91BkpHLGbiOgzg";
updateMedia0 = "https://prod-83.eastus.logic.azure.com/workflows/b8788bc0331d467bb863762a94a66efc/triggers/manual/paths/invoke/api/v1/media/{id}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=OfCJAqUbVvkxmpt_48JHD3ejPTj7DaEOhWQXsLGYUOg";
updateMedia1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=OfCJAqUbVvkxmpt_48JHD3ejPTj7DaEOhWQXsLGYUOg"
BLOB_ACCOUNT = "https://blobstoragetmcf.blob.core.windows.net";

//The URIs of the REST endpoint relating to users
retrieveAllUsers = "https://prod-24.eastus.logic.azure.com/workflows/7bd5d6501e70475cadda15c20ee953e9/triggers/manual/paths/invoke/rest/v1/users?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=I79IMg-llIS5JkoEKAl600Z6W2SjRYkHz7MZfs4MdSU";
postNewUser = "https://prod-80.eastus.logic.azure.com/workflows/53f2aadc0c8c463fad10bfb1ad3931eb/triggers/manual/paths/invoke/rest/v1/assests?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cgvhF3ATNz3qzSQ59Kcm-Pmyp_6C_78dmJaRB2RkHag";
updateUser0 = "https://prod-59.eastus.logic.azure.com/workflows/bdcd99b44fcb4d4b98259161ac7f1ad6/triggers/manual/paths/invoke/rest/v1/users/";
updateUser1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=8m-mbA4ngX8a5BnwEGlJ_WVYQiRTzobRiQm2MXT6fsc";
removeUser0 = "https://prod-87.eastus.logic.azure.com/workflows/81aad7ce15a8452193137eb835b9a6a6/triggers/manual/paths/invoke/rest/v1/users/";
removeUser1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=34WX4w-UGgNAI0fhAn79wtFbmAGvvj4ehQW1dD1FZxw";
siteAccess = "https://prod-80.eastus.logic.azure.com:443/workflows/6640491629984579ab252bfc0f67b800/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=4WF8BPqvfcxcGLKJnXM2US37qg7i8QAOGU06RVsFt8I";



//Handlers for media functions called by id in html running an onClick() function
$(document).ready(function() {

 
  $("#retMedias").click(function(){

    getMedia();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    submitNewAsset();
    
  }); 

  $("#delMedia").click(function(){

    deleteMedia();
    
  });


  $("updMedia").click(function(){

    editMedia();
  })
  


});

//A function to submit a new media to the REST endpoint 
function submitNewAsset(){

  
 submitData = new FormData();                               //Creates the form data object
 
 submitData.append('FileName', $('#FileName').val());       //Get the form variables and appends them to the form data object created
 submitData.append('userID', $('#userID').val());
 submitData.append('userName', $('#userName').val());
 submitData.append('File', $("#UpFile")[0].files[0]);

  //Post the form data to the endpoint
  $.ajax({
  url: postMedia,
  data: submitData,
  cache: false,
  enctype: 'multipart/form-data',
  contentType: false,
  processData: false,
  type: 'POST',
  success: function(data){                                //success messages to user and console when added successfully
    console.log('Adding media was successful!', data);
    alert('Adding media was successful!'),
    getMedia();
  },
  error: function(xhr, status, error) {                   //error messages to user and console when added successfully
    console.log('Adding media was unsuccessful', error);
    alert('Adding media was unsuccessful');
  }, 
 });

}


//A function to get a list of all the media from adding to the media list
function getMedia(){
 
 $('#MediaList').html('<div class="spinner-border" role="status"><span class="sr-only">&nbsp;</span>'); //Replace the current HTML in that div with a loading message
   
 $.getJSON(retrieveAllMedia, function( data ) {
  
  var items = [];             //Create an array to hold all the media
 
  //Iterate through the returned records and build HTML, incorporating the key values of the media
    $.each( data, function( key, val ) {
      items.push( "<hr />");
      items.push("<img src='"+ BLOB_ACCOUNT + val["filePath"] +"' width='400'/><br/>");
      items.push( "File : " + val["fileName"] + "<br />");
      items.push( "Uploaded by: " + val["userName"] + " (user id: "+val["userID"]+")<br/>");
      items.push( '<button type="button" class="btn btn-danger" onclick="deleteMedia('+val["id"]+')">Delete</button>  <br/><br/>');
      items.push( '<button type="button" class="btn btn-warning" onclick="editMedia('+val["id"]+')">Edit</button>  <br/><br/>');
      items.push( "<hr />");
      //pushes information to the user 
    });

    
    $('#MediaList').empty();       //Clears th media list div
  
    $("<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
    }).appendTo( "#MediaList" );  //creates a new list, populates the list with media data and appends it to the media list
  });
}


function deleteMedia(id) {
  $.ajax({                                  //construction to make a request to the http request
    url: removeMedia0 + id + removeMedia1,  //url construction
    type: 'DELETE',                         //type of callback
  }).done(function(msg) {                   
    getMedia();
  });
} //deletes the media

function editMedia(id){
  var updatedMediaInfo = {
    FileName: $('#editFileName').val(),
    userID: $('#edituserID').val(),
    userName: $('#edituserName').val(),
    UpFile: $('#editUpFile').val()
  };

  // Convert to a JSON String
  updatedUserInfo = JSON.stringify(updatedUserInfo);

  $.ajax({
    type: "PUT",
    cache: false,
    url: updateMedia0 + id + updateMedia1,
    data: updatedMediaInfo,
    contentType: 'application/json; charset=utf-8',
    success: function(data){
      console.log('Media Update successful!', data);
      alert('Media Update successful!'),
      getMedia();
    },
    error: function(xhr, status, error) {
      console.log('Media update unsuccessful', error);
      alert('Media update unsuccessful');
    },
  });
}


//Handlers for button clicks
$(document).ready(function() {

 
  $("#retUsers").click(function(){

      //Run the get asset list function
    getUsersList();

  }); 

   //Handler for the new asset submission button
  $("#subNewUser").click(function(){

    //Execute the submit new asset function
    submitNewUser();
    
  }); 

  $("updUser").click(function(){

    editUser();
  })

  $("#login").click(function(){

    //Execute the submit new asset function
    userLogin();
    
  }); 

  $("#translate").click(function(){

    textTranslation();
  })

});

//A function to get a list of all the assets and write them to the Div with the AssetList Div


//A function to submit a new asset to the REST endpoint 
function submitNewUser(){
  var subObj = { 
  //Construct JSON Object for new item
    name: $('#name').val(),
    email: $('#email').val(),
    username: $('#username').val(),
    password: $('#password').val()
  }
  //Convert to a JSON String
  subObj = JSON.stringify(subObj);

  //Post the JSON string to the endpoint, note the need to set the content type header

  $.post({
    url: postNewUser,
    data: subObj,
    contentType: 'application/json; charset=utf-8'
  }).done(function (response) {
    getUsersList();
  });
  
}

function getUsersList(){
  $('#UserList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');


  $.getJSON(retrieveAllUsers, function( data ) {
    var items = [];

    $.each( data, function( key, val ) {

      items.push( "name: " + val["name"] + "<br/>");
      items.push( "Email: " + val["email"] + "<br/>");
      items.push( "Username: " + val["username"] + "<br/>");
      items.push( "Password: " + val["password"] + "<br/>");
      items.push( '<button type="button" class="btn btn-danger" onclick="deleteUser('+val["userID"]+')">Delete</button> <br/><br/>'); 
      items.push( '<button type="button" class="btn btn-warning" onclick="editUser('+val["userID"]+')">Update</button> <br/><br/>'); 

    });

    $('#UserList').empty();

    $( "<ul/>", {
      "class": "my-new-list",
      html: items.join( "" )
    }).appendTo( "#UserList" );
  });
}

function deleteUser(userID){
  $.ajax({
    type: "DELETE",
    url: removeUser0 + userID + removeUser1,
  }).done(function( msg ) {
    getUsersList();
  });
}

function editUser(userID) {
  var updatedUserInfo = {
    name: $('#editName').val(),
    email: $('#editEmail').val(),
    username: $('#editUsername').val(),
    password: $('#editPassword').val()
  };

  // Convert to a JSON String
  updatedUserInfo = JSON.stringify(updatedUserInfo);

  $.ajax({
    type: "PUT",
    url: updateUser0 + userID + updateUser1,
    data: updatedUserInfo,
    cache: false,
    contentType: 'application/json; charset=utf-8',
    success: function(data){
      console.log('User Update successful!', data);
      alert('User Update successful!'),
      getUsersList();
    },
    error: function(xhr, status, error) {
      console.log('User update unsuccessful', error);
      alert('User update unsuccessful');
    },
    
  });
}


function userLogin(){
  var loginInfo = {
    username: $('#username').val(),
    password: $('#password').val()
  }

  $.ajax ({
    url: siteAccess,
    data: JSON.stringify(loginInfo),
    cache: false,
    contentType: 'application/json',
    type: 'POST',
    processData: false,
    
    success: function(data){
      console.log('Login successful', data);
      window.location.href = "index.html";
      alert("Login was successful")
    },
    error: function(xhr, status, error) {
      console.log('Login failed', error);
      alert("Login Failed");
    },
  })
}

function textTranslation() {
  var key = "a1e5ae42f0474b3ba9f21184b43a80ec";                     //API key for translator from Azure
  var endpoint = "https://api.cognitive.microsofttranslator.com/";  //Base URL of AZURE API
  var location = "eastus";                                          //Assigns the region location
  var path = '/translate';                                          //API endpoint that needs translated
  var fromLanguage = 'en';                                          //sets languages to translate from
  var toLanguages = ['en', 'fr', 'it', 'de', 'es'];                 ////sets languages to translate to
  var textToTranslate = document.getElementById('textToTranslate').value; //pulls the value of textToTranslate that user wants to translate

  toLanguages.forEach(targetLanguage => {     //does a loop over the list of languages you want to convert

      var params = new URLSearchParams({    //helps construct the query params we are using
          'api-version': '3.0',
          'from': fromLanguage,
          'to': [targetLanguage]
      });                                     //sets the variables of params and holds them for the requested translation

      var headers = {
          'Ocp-Apim-Subscription-Key': key,
          'Ocp-Apim-Subscription-Region': location,
          'Content-type': 'application/json',
          'X-ClientTraceId': Date.now().toString()  //the Date.now()toString() timestamp is represented as a String 
      };                                      //defines the sub key, region, content type and client trace ID HTTP headers

      var body = JSON.stringify([{ 'text': textToTranslate }]); //translaes the body to JSON format

      fetch(`${endpoint}${path}?${params}`, {
          method: 'POST',
          headers: headers,
          body: body
      })
      .then(response => response.json())
      .then(data => {
          var translationResult = data[0].translations[0].text;
          console.log(`${targetLanguage.toUpperCase()}: ${translationResult}`);
          $('#translationBox').append(`<p>${targetLanguage.toUpperCase()}: ${translationResult}</p>`);
      })
      .catch(error => {
          console.error('Error:', error);
      });
  });
}





















