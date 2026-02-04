var $, jQuery;
$ = jQuery = window.jQuery;
setTimeout( //2 sec delay to load before trying to run
    function main() {

//!!!!!!!!!!!!!!!!!!!!!!! BEGIN TWEAKS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function waitForNextAndAdvance(timeout = 3000) {
    const start = Date.now();
    const interval = setInterval(() => {
        try {
            const nextBtn = $("#stageFrame")
                .contents()
                .find(".FrameRight:not(.disabled)");

            if (nextBtn.length) {
                nextBtn.click();
                clearInterval(interval);
            }

            if (Date.now() - start > timeout) {
                clearInterval(interval);
            }
        } catch {}
    }, 250);
}		
		
		
// Auto Advance
function autoadvance() {
    var increment = 0;
    if (["Unit Test", "Unit Test Review", "Quiz"].includes(x = $("#activity-title").text())) {
        if ($("#activity-status").text() != "Complete") {
            return;
        }
    }
    var x;
    //this really does not work well
        var temp = eval(x = $("#stageFrame").contents().find("#uid1_time").text().replace(/:/g,".").replace("/", '-')); ///e.g. 1:20 / 2:00 -> 1.20 - 2.00 = abs seconds left
        console.log(temp, x)
        if (temp < -.02 && temp != undefined && temp != 0 && $("#stageFrame").contents().find("#frame_video_controls").css("display") != "none") { //many condition cause videos sometime get stuck one second behind,
            return;
    }
    increment++;
    //All other AA checks have succedded at this point.
           console.log($("#ASLAPtext").value)
	    try {
        document.getElementsByClassName("footnav goRight")[0].click()
    } catch (TypeError) {} //Advance to next !!!!assignment!!! not redundant
    $("#stageFrame").contents().find(".FrameRight").click()
          $("iframe").contents().find("#SubmitButton").click()
}
// Skip intro
function skipIntro() {
    try {
        window.frames[0].document.getElementById("invis-o-div").remove()
    } catch (TypeError) {}
}
setInterval(skipIntro, 2000);
// Guess Practice

function GuessPractice() {
    //Hide/Show button
    //Cancels guess if assignment , class names are often misformatted( .trim())
try {
    const v = document
        .getElementById("stageFrame")
        ?.contentDocument
        ?.querySelector("video");

    if (v && !v.paused && v.currentTime > 0 && v.currentTime < v.duration - 0.25) {
        return; // video is actively playing, do nothing
    }
} catch (e) {}
    if ($("#activity-title").text().trim() == "Assignment") {
        return;
    }
    //Guesser (THIS IS INDEDED TO BE RESTRICTIVE, JUST LEAVE IT.)
    if (["Practice", "Instruction", "Assignment", "Warm-Up", "Summary"].includes(document.getElementById("activity-title").innerText)) {
      
            try {
                    window.options = window.frames[0].frames[0].document.getElementsByClassName("answer-choice-button"); //find options
                    window.options[Math.floor(Math.random() * window.options.length)].click(); //click a random one
                } catch (TypeError) {}
                window.frames[0].API.Frame.check();
                window.options[Math.floor(Math.random() * window.options.length)].click(); //click a random one again
                $("span#btnCheck").click(); //dont think it works
	    try {
        document.getElementsByClassName("footnav goRight")[0].click()
    } catch (TypeError) {} //Advance to next !!!!assignment!!! not redundant
    $("#stageFrame").contents().find(".FrameRight").click()
          $("iframe").contents().find("#SubmitButton").click()
	}
setInterval(GuessPractice, 2000);
window.frames[0].API.Frame.check();
$("span#btnCheck").click();

// wait for grading → then go forward
waitForNextAndAdvance();

}
setInterval(GuessPractice, 2000);


//!!!!!!!!!!!!!!!!!!!!! END TWEAKS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!! MASTERLOOP !!!!!!!!
var output = "";

function loop() {
    autoadvance()
    skipIntro()
    GuessPractice()
}
window.masterloop = setInterval(loop, 2000);
}, 2000); //makes this run after 2 seconds
