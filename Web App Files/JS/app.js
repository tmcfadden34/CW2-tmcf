//The URIs of the REST endpoint
postMedia = "https://prod-49.eastus.logic.azure.com:443/workflows/97bc92545d164828b97c1a651ffb4f24/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=15ykK8nnyR9Z-COoaPcdfXqWcbSTJ42YrFadHfu36kw";
retrieAllMedia = "https://prod-00.eastus.logic.azure.com:443/workflows/437e21f4a81343ad8b0e48996796e105/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Tb5O5yYfT0JGAkCLOp-5uEN3viGZe-iq1Xpk7ZPo9_0";
removeMedia = "https://prod-03.eastus.logic.azure.com/workflows/43f5e508cf50474f8e0ce80c18821e6e/triggers/manual/paths/invoke/api/v1/media/{id}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HwnyShAkBW7qAtZIjfXc2KJKlPVgW91BkpHLGbiOgzg";
BLOB_ACCOUNT = "https://blobstoragetmcf.blob.core.windows.net";

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
   
 $.getJSON(retrieAllMedia, function( data ) {
  
  var items = [];             //Create an array to hold all the retrieved assets
 
  //Iterate through the returned records and build HTML, incorporating the key values of the
    $.each( data, function( key, val ) {
      items.push( "<hr />");
      items.push("<img src='"+ BLOB_ACCOUNT + val["filePath"] +"' width='400'/> <br/>")
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





