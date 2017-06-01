function hideAlert()  {
    console.log("hiding alert");
    if ($(".error").text() === "") {
        console.log("Is hidden");
        $(".error").hide();
    }
    else {
        console.log("Is not hidden");
        $(".error").show();
    }
}
$(document).ready(hideAlert());