//The URIs of the REST endpoint
postMedia = "https://prod-49.eastus.logic.azure.com:443/workflows/97bc92545d164828b97c1a651ffb4f24/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=15ykK8nnyR9Z-COoaPcdfXqWcbSTJ42YrFadHfu36kw";
retrieveAllMedia = "https://prod-00.eastus.logic.azure.com:443/workflows/437e21f4a81343ad8b0e48996796e105/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Tb5O5yYfT0JGAkCLOp-5uEN3viGZe-iq1Xpk7ZPo9_0";
removeMedia = "https://prod-03.eastus.logic.azure.com/workflows/43f5e508cf50474f8e0ce80c18821e6e/triggers/manual/paths/invoke/api/v1/media/{id}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HwnyShAkBW7qAtZIjfXc2KJKlPVgW91BkpHLGbiOgzg";
BLOB_ACCOUNT = "https://blobstoragetmcf.blob.core.windows.net";

//The URIs of the REST endpoint
retrieveAllUsers = "https://prod-24.eastus.logic.azure.com/workflows/7bd5d6501e70475cadda15c20ee953e9/triggers/manual/paths/invoke/rest/v1/users?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=I79IMg-llIS5JkoEKAl600Z6W2SjRYkHz7MZfs4MdSU";
postNewUser = "https://prod-80.eastus.logic.azure.com/workflows/53f2aadc0c8c463fad10bfb1ad3931eb/triggers/manual/paths/invoke/rest/v1/assests?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cgvhF3ATNz3qzSQ59Kcm-Pmyp_6C_78dmJaRB2RkHag";
updateUser = "https://prod-59.eastus.logic.azure.com/workflows/bdcd99b44fcb4d4b98259161ac7f1ad6/triggers/manual/paths/invoke/rest/v1/users/{id}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=8m-mbA4ngX8a5BnwEGlJ_WVYQiRTzobRiQm2MXT6fsc"
removeUser0 = "https://prod-87.eastus.logic.azure.com/workflows/81aad7ce15a8452193137eb835b9a6a6/triggers/manual/paths/invoke/rest/v1/users/";
removeUser1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=34WX4w-UGgNAI0fhAn79wtFbmAGvvj4ehQW1dD1FZxw";



//Handlers for button clicks
$(document).ready(function() {

 
  $("#retMedias").click(function(){

      //Run the get asset list function
    getMedia();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 

  $("#delMedia").click(function(){

    //Execute the delet asset function
    deleteMedia();
    
  });

  


});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){

  
 submitData = new FormData();                               //Create a form data object
 
 submitData.append('FileName', $('#FileName').val());       //Get form variables and append them to the form data object
 submitData.append('userID', $('#userID').val());
 submitData.append('userName', $('#userName').val());
 submitData.append('File', $("#UpFile")[0].files[0]);

 //Post the form data to the endpoint, note the need to set the content type header
  $.ajax({
  url: postMedia,
  data: submitData,
  cache: false,
  enctype: 'multipart/form-data',
  contentType: false,
  processData: false,
  type: 'POST',
  success: function(data){

  }
 });

}


//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getMedia(){
 
 $('#MediaList').html('<div class="spinner-border" role="status"><span class="sr-only">&nbsp;</span>'); //Replace the current HTML in that div with a loading message
   
 $.getJSON(retrieveAllMedia, function( data ) {
  
  var items = [];             //Create an array to hold all the retrieved assets
 
  //Iterate through the returned records and build HTML, incorporating the key values of the
    $.each( data, function( key, val ) {
      items.push( "<hr />");
      items.push("<img src='"+ BLOB_ACCOUNT + val["filePath"] +"' width='400'/><br/>");
      items.push( "File : " + val["fileName"] + "<br />");
      items.push( "Uploaded by: " + val["userName"] + " (user id: "+val["userID"]+")<br/>");
      items.push(`<button type="button" class="btn btn-danger" onclick="deleteMedia(${val["id"]})">Delete</button><br/><br/>`);
      items.push( "<hr />");
      
    });

    
    $('#MediaList').empty();       //Clear the assetlist div
  
    $("<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
    }).appendTo( "#MediaList" );
  });
}



function deleteMedia(id) {
  $.ajax({
    url: `${removeMediaBase}${id}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HwnyShAkBW7qAtZIjfXc2KJKlPVgW91BkpHLGbiOgzg`,
    type: 'DELETE',
    success: function (data) {
      // Handle the success response
      console.log('Media deleted successfully:', data);

      // After successful deletion, you may want to remove the media from the UI
      getMedia();
    },
    error: function (error) {
      // Handle the error response
      console.error('Error deleting media:', error);
    }
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

  $("#login").click(function(){

    //Execute the submit new asset function
    userLogin();
    
  }); 



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
    getUserList();
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
      items.push('<button type="button" class="btn btn-danger" onclick="deleteUser('+val["userID"]+')">Delete</button> <br/><br/>'); 
      items.push('<button type="button" class="btn btn-warning" onclick="editUser('+val["userID"]+')">Edit</button> <br/><br/>'); 

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
    //Note the need to concatenate the
    url: removeUser0 + userID + removeUser1,
  }).done(function( msg ) {
    //On success, update the assetlist.
    getUsersList();
  });
}

function editUser(userID) {

  var subObj = { 
    //Construct JSON Object for new item
      name: $('#name').val(),
      email: $('#email').val(),
      username: $('#username').val(),
      password: $('#password').val()
    }
    //Convert to a JSON String
    subObj = JSON.stringify(subObj);

    $.ajax({
      type: "PUT",
      url: updateUser + userID + removeUser1,
    }).done(function( msg ) {
      getUsersList();
    });

    
}

function userLogin(){

  var loginInfo = {
    username: $('username').val(),
    password: $('password').val()
  }

  siteAccess = "https://prod-80.eastus.logic.azure.com:443/workflows/6640491629984579ab252bfc0f67b800/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=4WF8BPqvfcxcGLKJnXM2US37qg7i8QAOGU06RVsFt8I"

  $.ajax ({
    url: siteAccess,
    data: JSON.stringify(loginInfo),
    cache: false,
    contentType: 'application/json',
    processData: false,
    type: 'POST',
    success: function(data){
      // Handle success as needed
      console.log('Login successful', data);
      window.location.href = "file:///C:/Users/tmcfa/OneDrive%20-%20Ulster%20University/Ulster%20Univeristy/Year%204/Semester%201/Cloud%20Native%20Development/Assessment/Cloud%20Assessment%202/Web%20App%20Files/index.html";
      alert("Login was successful")
    },
    error: function(xhr, status, error) {
      // Handle error as needed
      console.log('Login failed', error);
    }

  })
}





















