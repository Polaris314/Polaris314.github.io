/**
 *  
 *  gup(name) :: retrieves URL parameters if provided
 *
 *  Prepares the page for MTurk on load.
 *  1. looks for a form element with id="mturk_form", and sets its METHOD / ACTION
 *    1a. All that the task page needs to do is submit the form element when ready
 *  2. disables form elements if HIT hasn't been accepted
 *
 **/

// selector used by jquery to identify your form
var form_selector = "#mturk_form";
var button_selector = "#mturk-submit-button";

// TODO: Remove, test
// var submit_url = "./";






//  Turkify the captioning page.
$(document).ready(function () {
  console.log("start31231");
  // is assigntmentId is a URL parameter
  if((aid = gup("assignmentId"))!="" && $(form_selector).length>0) {
    aid = gup("assignmentId");

    // If the HIT hasn't been accepted yet, disabled the form fields.
    if(aid == "ASSIGNMENT_ID_NOT_AVAILABLE") {
      $('input,textarea,select,button,canvas').attr("DISABLED", "disabled");
    }

    // Add a new hidden input element with name="assignmentId" that
    // with assignmentId as its value.
    // var aid_input = $("<input type='hidden' name='assignmentId' value='" + aid + "'>").appendTo($(form_selector));

    // Make sure the submit form's method is POST
    // $(form_selector).attr('method', 'POST');

    // Set the Action of the form to the provided "turkSubmitTo" field
    // if((submit_url=gup("turkSubmitTo"))!="") {
    //   $(form_selector).attr('action', submit_url + '/mturk/externalSubmit');
    // }

    console.log(button_selector);
    console.log($(button_selector).html());


    if ((submit_url)=gup("turkSubmitTo")!==""){

      $(button_selector).click(function(){
  
        // if ((submit_url=gup("turkSubmitTo")) === "") return;
  
        var data = {};
  
        data.vertexList = vertexList;
        data.vertexCount = vertexCount;
        data.assignmentId = aid;
  
        
        
        console.log("posting");
        $.post(submit_url,data, function(d){
          $("html").html(d);
        });
  
  
  
  
      });
    
    }


  }

});

$(button_selector).click(function(){
  console.log("Here12");
})