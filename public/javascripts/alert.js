function hideAlert() {
    console.log("Running");
    if ($(".error").text() === "") {
        $(".error").hide();
    }
    else {
        $(".error").show();
    }
}
$(document).ready(hideAlert());
