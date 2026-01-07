var $, jQuery;
$ = jQuery = window.jQuery;

setTimeout( //2 sec delay to load before trying to run
    function main() {

        console.log("HelloWorldEdgenTweaks")

        function init() {
            window.openedWindows = [];
            window.configElements = []; //Config infomation
            try {
                $(".mainfoot")[0].append(null);
            } //stupid hack to prevent it building twice
            catch {
                console.log('%cIGNORE THE ERROR BELOW ME!', 'color: green; font-weight: bold;');
            $(".mainfoot")[0].append(null);
        }

        //Internal Functions
        function buildMenuButton(text, id, event, overrideid) { //puts buttons in the menu
            var x, y;
            y = document.createElement("li")
            y.id = id
            y.append(x = document.createElement("button"))
            x.style = "display:block; padding: 0; border: 2px; background: none; height:45px; width:54px; background-color: rgb(51, 51, 51); color: rgb(249, 166, 25); opacity: 1;"
            x.innerText = text
            x.addEventListener("click", event);
            if (!overrideid) {
                $(".toolbar")[0].append(y);
            } else $("#" + overrideid).append(y);
        }

        function RenderPane(name, id, width, height, transform) { //renders panes
            window.pane = document.createElement("div")
            window.pane.style = "padding:5px; z-index:1; overflow:auto; visibility: hidden; position: fixed; border: 1px solid rgb(95, 95, 95); background-color: rgb(39, 39, 39); color: rgb(249, 166, 25); text-align: center; top:50%;left:50%; transform: translate(-50%, -50%)"
            window.pane.style.width = width
            window.pane.style.height = "auto"
            window.pane.style.maxHeight = height;
            //window.pane.style.marginTop = -(height/2)
            //window.pane.style.marginLeft = -(width/2)
            window.pane.id = id;
            window.pane.classList.add("tweakpane")
            x = document.createElement("header")
            x.style = ""
            var button = document.createElement("img");
            button.src = "https://cdn.pixabay.com/photo/2012/04/12/20/12/x-30465_1280.png";
            button.style = "filter: sepia(1);;position:sticky;opacity:60%;text-align:left;left:0;top:0;height:15px;width:15px";
            button.align = "left"
            button.onclick = function() {
                $("#" + id).css("visibility", "hidden") //find my pane and close
                $("#" + id + "~ div[id]").css("visibility", "hidden")
            }; //find panes after me and close
            x.appendChild(button);
            var z = document.createElement("label")
            z.style = " float: right;"
            z.innerText = "info"
            var y = document.createElement("input")
            y.type = "checkbox";
            y.checked = "true";
            y.style = "margin: 3px; float: right";
            y.addEventListener("click", function() {
                $("#" + id + " p").fadeToggle()
                // $("#" +id).css("height", "auto")
            })
            x.appendChild(y)
            x.appendChild(z);
            window.panetitle = document.createElement("h1")
            window.panetitle.innerText = "     " + name //shitty centering fix
            x.appendChild(window.panetitle)
            window.pane.appendChild(x);
            $("#overlay").append(window.pane)
        }

        function BuildMenuEntry(name, info, id, configpane, override, element) { //Creates tickbox element with info and optional (new) config pane (see guesspractice). in a pane
            //Override 1 append to tweak menu
            //Override 2 no text no check just button and append
            //Override 3 no button
            window.entry = document.createElement("div")
            window.entry.margin = "5px"
            // window.entry.onmouseleave =function(){setTimeout(function(){$("#" + id +"~ p").fadeOut()}, 1000);}
            if (override != 2 && override != 3) {
                window.tickbox = document.createElement("input")
                window.tickbox.type = "checkbox"
                window.tickbox.id = id
                window.configElements.push(id)
                window.entry.appendChild(window.tickbox)
            }
            window.label = document.createElement("label");
            window.label.innerText = " " + name //spacing fix
            window.entry.appendChild(window.label)
            if (configpane != undefined) { //If any configpane was passed through try and create a button to open it.
                window.configbutton = document.createElement("button")
                window.configbutton.innerText = "Configure"
                window.configbutton.style.marginLeft = "7px"
                window.configbutton.style.border = "1px solid #5f5f5f"
                window.configbutton.style.boxShadow = "inset 0 0 5px rgba(0, 0, 0, 0.6)"
                window.configbutton.style.backgroundColor = "rgb(39, 39, 39)"
                window.configbutton.style.color = "#f9a619"
                window.configbutton.style.borderRadius = "3px"
                window.configbutton.onclick = function() {
                    if (document.getElementById(configpane).style.visibility == "hidden") { //visiblitly handler for configpane button
                        document.getElementById(configpane).style.visibility = "visible"
                    } else {
                        document.getElementById(configpane).style.visibility = "hidden"
                    }
                }
                window.entry.appendChild(window.configbutton)
            }
            if (element != null) {
                window.entry.appendChild(element);
            }
            if (info != "") {
                window.desc = document.createElement("p")
                window.desc.innerHTML = info;
                window.desc.style = "position: abosolute;";
                window.entry.appendChild(window.desc)
            }
            //   window.label.onmouseenter = function () {
            //  $("#" + id +"~ p").siblings("p").hide();
            //  $("#" + id +"~ p").fadeIn()}
            //
            if (override == 1) { //override
                $("#tweaksmenu").append(window.entry);
            }
            if (override == 2) {
                window.configbutton.innerText = "Search Selection Config"
                $("#tweaksmenu").append(window.entry);
            } 
            else return window.entry;
        }

        function dragElement(elmnt) {
            //drag elemments
            //https://www.w3schools.com/howto/howto_js_draggable.asp
            var pos1 = 0,
                pos2 = 0,
                pos3 = 0,
                pos4 = 0;

            elmnt.onmousedown = dragMouseDown;


            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmouseleave = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // set the element's new position:
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }

            function closeDragElement() {
                // stop moving when mouse button is released:
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }

        function shortcut(shortcut, callback, opt) {
            /*
			 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
			 * Version : 1.00.A
			 * By Binny V A
			 * License : BSD
			 */
            var code; //needed to be declared
            //Provide a set of default options
            var default_options = {
                'type': 'keydown',
                'propagate': false,
                'target': document
            }
            if (!opt) opt = default_options;
            else {
                for (var dfo in default_options) {
                    if (typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
                }
            }
            var ele = opt.target
            if (typeof opt.target == 'string') ele = document.getElementById(opt.target);
            var ths = this;
            //The function to be called at keypress
            var func = function(e) {
                e = e || window.event;
                //Find Which key is pressed
                if (e.keyCode) code = e.keyCode;
                else if (e.which) code = e.which;
                var character = String.fromCharCode(code).toLowerCase();
                var keys = shortcut.toLowerCase().split("+");
                //Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
                var kp = 0;
                var k;
                for (var i = 0; k = keys[i], i < keys.length; i++) {
                    //Modifiers
                    if (k == 'ctrl' || k == 'control') {
                        if (e.ctrlKey) kp++;
                    } else if (k == 'shift') {
                        if (e.shiftKey) kp++;
                    } else { //The special keys did not match
                        if (character == k) kp++;
                    }
                }
                if (kp == keys.length) {
                    callback(e);
                    if (!opt['propagate']) { //Stop the event
                        //e.cancelBubble is supported by IE - this will kill the bubbling process.
                        e.cancelBubble = true;
                        e.returnValue = false;
                        //e.stopPropagation works only in Firefox.
                        if (e.stopPropagation) {
                            e.stopPropagation();
                            e.preventDefault();
                        }
                        return false;
                    }
                }
            }
            //Attach the function with the event
            if (ele.addEventListener) ele.addEventListener(opt['type'], func, false);
            else if (ele.attachEvent) ele.attachEvent('on' + opt['type'], func);
            else ele['on' + opt['type']] = func;
        }

        //!!!!!!!!!!!!!!!!!!START REAL UI BUILDING !!!!!!!!!!!!!!!!!!
        shortcut("Ctrl+Shift+P", function(){$("#stageFrame").contents().find(".FrameRight").click()});
        shortcut("Ctrl+Shift+O", function(){$("#stageFrame").contents().find(".FrameLeft").click()});
        shortcut("Ctrl+Shift+H", function() {
            $("#HideButton").click();
            $("#userconsole").prepend("<li>stealth mode hotkey pressed "+ $("#HideButton").is(":checked"));
        })
        shortcut("Ctrl+Shift+G", function() {
            $("#GuessPractice").click();
            $("#userconsole").prepend("<li>Guess hotkey pressed "+ $("#GuessPractice").is(":checked"));
        })
        shortcut("Ctrl+Shift+A", function() {
            $("#AutoAdvance").click();
            $("#userconsole").prepend("<li>Autoadvance hotkey pressed "+ $("#AutoAdvance").is(":checked"));
        })
        shortcut("Ctrl+Shift+S", function() {
            $("#googlebutton > button").click();
            $("#userconsole").prepend("<li>Search hotkey pressed ");
        })
        shortcut("Ctrl+Shift+V", function() {
            $("#AutoCompleteVocabTickbox").click();
            $("#userconsole").prepend("<li>AutoVocab hotkey pressed "+ $("#AutoCompleteVocabTickbox").is(":checked"));
        })
        shortcut("Ctrl+Shift+E", function() {
            $("#ShowColumn").click();
            $("#userconsole").prepend("<li>Example response hotkey pressed "+ $("#ShowColumn").is(":checked"));
        })
        shortcut("Ctrl+Shift+M", function() {
            $("#SkipIntro").click();
            $("#userconsole").prepend("<li>Skip Intro hotkey pressed " + $("#SkipIntro").is(":checked"));
        })


        console.log("EdgenTweaks UI build starting")

        //Create base overlay
        window.overlay = document.createElement("div")
        window.overlay.style = "z-index:1;"
        window.overlay.id = "overlay"
        document.body.prepend(window.overlay)

        //menu buttons
        buildMenuButton("Tweaks Menu", "tweaksbutton", function() {
            if (document.getElementById("tweaksmenu").style.visibility == "hidden") {
                document.getElementById("tweaksmenu").style.visibility = "visible"
            } else {
                document.getElementById("tweaksmenu").style.visibility = "hidden"
            }
        })
        // buildMenuButton("Search Selection", "googlebutton", function() {
        //     var result = window.getSelection().toString();
        //     if ($("#CloseSearch").is(":checked")) {
        //         window.openedWindows.forEach(function(window) {
        //             if (window != null) {
        //                 window.close();
        //             }
        //             window = null;
        //         })
        //     }
        //     if (result == "") {

        //         result = document.getElementById("stageFrame").contentWindow.getSelection().toString()
        //     }
        //     if (result == "") {
        //         result = document.getElementById("stageFrame").contentWindow.document.getElementById("iFramePreview").contentWindow.getSelection().toString()
        //     }
        //     if (result != "") {
        //         $("#userconsole").prepend("<li>Searching your selection ");
        //         if ($("#googlesearch").is(":checked")) window.openedWindows[0] = window.open("https://www.google.com/search?q=" + result);
        //         if ($("#brainlysearch").is(":checked")) window.openedWindows[1] = window.open("https://brainly.com/app/ask?q=" + result);
        //         if ($("#wolframsearch").is(":checked")) window.openedWindows[2] = window.open("https://www.wolframalpha.com/input/?i=" + result);
        //         if ($("#customsearch").is(":checked")) window.openedWindows[3] = window.open("https://google.com/search?q=site:" + $("#css").val() + " " + result, )
        //         localStorage.setItem("csskey", $("#css").val())
        //     } else $("#userconsole").prepend("<li>There's nothing selected! ");
        // })
        // buildMenuButton("Search Config", "scbutton", function() {
        //     if (document.getElementById("searchconfig").style.visibility == "hidden") { //visiblitly handler for configpane button
        //         document.getElementById("searchconfig").style.visibility = "visible"
        //     } else {
        //         document.getElementById("searchconfig").style.visibility = "hidden"
        //     }
        // }, "googlebutton")
        // $("#googlebutton").on("mouseenter", function() {
        //     $("#scbutton").fadeIn()
        // }) //Hide / Show search config
        // $("#googlebutton").on('mouseleave', function() {
        //     $("#scbutton").fadeOut()
        // })
        // $("#scbutton").hide()
        buildMenuButton("Guess this", "guessbutton", function() {
                try {
                    window.options = window.frames[0].frames[0].document.getElementsByClassName("answer-choice-button"); //find options
                    window.options[Math.floor(Math.random() * window.options.length)].click(); //click a random one
                } catch (TypeError) {}
                window.frames[0].API.Frame.check();
                window.options[Math.floor(Math.random() * window.options.length)].click(); //click a random one again
                $("span#btnCheck").click(); //dont think it works
    			})
        buildMenuButton("Toggle Console", "consolebutton", function() {
            $("#consolediv").toggle()
		})

        //Panes
        RenderPane("EdgenTweaks", "tweaksmenu", "40%", "40%", "") //make tweaksmenu base
        RenderPane("Guess Practice Config", "practiceconfig", "35%", "35%") //Panerender for guesspractice
        RenderPane("Search Title Config", "searchconfig", "35%", "35%", ) //serach config
        RenderPane("Auto Advance Config", "aaconfig", "35%", "35%")

        //Entries
        $("#searchconfig").append(BuildMenuEntry("Search in google", "", "googlesearch"))
        $("#searchconfig").append(BuildMenuEntry("Search in brainly", "", "brainlysearch"))
        $("#searchconfig").append(BuildMenuEntry("Search in wolfram", "", "wolframsearch"))
        var textbox = document.createElement("input")
        textbox.id = "css"
        textbox.value = localStorage.getItem("csskey") ? localStorage.getItem("csskey") : "example.com" //not sure if this works
        $("#searchconfig").append(BuildMenuEntry("CustomSearch ", "This should end in a .com to work best.", "customsearch", null, null, textbox))
        $("#searchconfig").append(BuildMenuEntry("Close search windows", "Closes search windows when you open new ones", "CloseSearch", null, 1))
        BuildMenuEntry("Auto Advance", "Advance to the next portion of the course automatically when it becomes available", "AutoAdvance", "aaconfig", 1) //Autoadvance
        var x = document.createElement("input");
        x.id = "ASLAPtext"
        x.value = "A";
        $("#aaconfig").append(BuildMenuEntry("No Skip", "Won't skip the end of videos", "aaNoSkip"))
         $("#aaconfig").append(BuildMenuEntry("As Slow As Possible", "Set delay for autoadvance (so you dont speed through classes)", "ASLAP", null,null, x))
                 $("#aaconfig").append(BuildMenuEntry("Auto Submit", "Submit elective junk automatically", "aaASubmit"))

        $("#aaconfig").append(BuildMenuEntry("Feedback reading", "Don't autoadvance if there's a note from your teacher", "NoteReading"))
        $("#aaconfig").append(BuildMenuEntry("Hard Disabling", "Completely disables autoadvance for any quiz or test (you have to reenable it)", "HardDisable"))
        BuildMenuEntry("Guess Practice", "Automatically guesses through practice lessons (Warm-Up, Instruction, Summary)", "GuessPractice", "practiceconfig", 1) //GuessPracice
        $("#practiceconfig").append(BuildMenuEntry("Guess thru Assignments", "Guesses thru assignments. This is highly discouraged", "guessassignments"))
        BuildMenuEntry("Skip intro", "Lets you interact with practices while the intro audio is playing", "SkipIntro", null, 1) //Skipintro
        BuildMenuEntry("Show Example Response", "Displays default example response for short answer questions", "ShowColumn", null, 1) //example response
        BuildMenuEntry("Auto Complete Vocab", "Automatically completes vocab assignments", "AutoCompleteVocabTickbox", null, 1) //Autocompletevocab
        BuildMenuEntry("Stealth Mode", "Hides button and dialogs", "HideButton", null, 1) //StealthMode
        //Copyright info & Other
        dragElement(document.getElementById("tweaksmenu"))
        dragElement(document.getElementById("practiceconfig"))
        dragElement(document.getElementById("aaconfig"))
        $("#inActivityMessage").after('<div style=position:static; overflow-y: hidden;  visibility:visible; id=consolediv><ul style=color:gold id=userconsole></ul></div>') //console ID=userconsole
        window.shortcutinfo = document.createElement("p")
        window.shortcutinfo.innerHTML = "<br> <b> HOTKEYS </b> <br> CTRL+SHFT+A = Auto Advance Toggle <br> CTRL+SHIFT+H = Stealth Mode Toggle <br> CTRL+SHIFT+G = Guess Practice toggler <br> CTRL+SHIFT+S = Search Selection <br> CTRL+SHIFT+P = Foward +O = Back <br> CTRL+SHIFT+V = AutoComplete Vocab Toggle <br> CTRL+SHIFT+E = Show Example Response toggle <br> CTRL+SHIFT+B = Skip Intro toggle"
        window.copyright = document.createElement("p")
        window.copyright.innerHTML = "EdgenTweaks Version 1.4.6 orginally by Gradyn Wursten (<a href='https://gitlab.com/roglemorph/edgentweaks/-/issues/'>Report a bug!</a>) (<a href='https://host.gradyn.com/edgentweaks/support.html'>Support the project!</a>)  (<a href='https://gitlab.com/roglemorph/edgentweaks'>Gitlab</a>) <br> This is free and unencumbered software released into the public domain.Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means."

        window.copyright.style.color = "gray"
        window.copyright.style.width = "100%"
        $("#tweaksmenu").append(window.shortcutinfo, window.copyright)
        document.getElementById("tweaksmenu").children[1].onclick = easteregg
        window.menutitleclicks = 0
        //!!!!!!!!!!!!!!!!!!END REAL UI BUILDING !!!!!!!!!!!!!!!!!!
    }
    init();


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
        if ($("#HardDisable").is(":checked")) {
            $("#userconsole").prepend("<li>Auto Advance hard disabled");
            return;
        } else if ($("#activity-status").text() != "Complete") {
            output += "Autoadvance (disabled for  " + x + "), ";
            return;
        }
    }
    if ($("#NoteReading").is(":checked") && document.getElementById("feedback") != undefined) {
        output += "Autoadvance (I found a note from your teacher!), ";
        return;
    }
    var x;
    //this really does not work well
        var temp = eval(x = $("#stageFrame").contents().find("#uid1_time").text().replace(/:/g,".").replace("/", '-')); ///e.g. 1:20 / 2:00 -> 1.20 - 2.00 = abs seconds left
        console.log(temp, x)
        if (temp < -.02 && temp != undefined && temp != 0 && $("#stageFrame").contents().find("#frame_video_controls").css("display") != "none") { //many condition cause videos sometime get stuck one second behind,
            output += "Autoadvance (NoSkip is enabled),  ";
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
    output += ("Autoadvance, ")
}
//Stealth Mode
function StealthMode(a) { //starting to get kinda bad, also, .toggle()
    if (a) {
        output += ("Stealth Mode, ")
        $("#consolediv").css("visibility", "hidden")
        $("#consolebutton").css("visibility", "hidden")
        $("#tweaksbutton").css("opacity", "0")
        $("#googlebutton").css("visibility", "hidden")
        $("#guessbutton").css("visibility", "hidden")
        $(".tweakpane").css("opacity", 0.05)
    } else {
        $("#consolediv").css("visibility", "visible")
        $("#consolebutton").css("visibility", "visible")
        $("#tweaksbutton").css("opacity", "1")
        $("#googlebutton").css("visibility", "visible")
        $("#guessbutton").css("visibility", "visible")
        $(".tweakpane").css("opacity", 1)
        document.getElementById("HideButton").checked = false;
    }
}
// Skip intro
function skipIntro() {
    //if ($("#invis-o-div") == null) return; test this if you want, I can't.
    output += ("Skip intro, ")
    try {
        window.frames[0].document.getElementById("invis-o-div").remove()
    } catch (TypeError) {}
}
// Guess Practice
function GuessPractice() {
    //Hide/Show button
    //Cancels guess if assignment , class names are often misformatted( .trim())
    if ($("#activity-title").text().trim() == "Assignment") {
        output += ("Guess Practice (disabled), ")
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
window.frames[0].API.Frame.check();
$("span#btnCheck").click();

// wait for grading → then go forward
waitForNextAndAdvance();

}
        //submitter
//        try {
//            $("#nextQuestion").click()
//        } catch (TypeError) {}
//    } else {
//        output += ("Guess Practice (not supported for  " + $("#activity-title").text() + "), ")
//    }

// Unhide Right Column
function showColumn() {
    output += ("Show Example Response, ")
    try {
        window.frames[0].frames[0].document.getElementsByClassName("right-column")[0].children[0].style.display = "block"
    } catch (TypeError) {}
    try {
        window.frames[0].frames[0].document.getElementsByClassName("left-column")[0].children[0].style.display = "block"
    } catch (TypeError) {}
}
// Easter Egg (onclick moved to init)
function easteregg() {
    if (window.menutitleclicks < 10) {
        window.menutitleclicks++;
        if (window.menutitleclicks == 10) {
            alert("Easter egg activated! How'd you know?! (refresh to get rid of)")
            var easteregg = document.createElement("img")
            easteregg.src = "https://i.gifer.com/zYw.gif"
            easteregg.style.position = "fixed"
            easteregg.style.bottom = "40px";
            easteregg.style.marginLeft = "80%"
            document.body.appendChild(easteregg)
            window.menutitleclicks = 0;
        }
    }
}
// Auto complete vocab
function vocabCompleter() {
  if (document.getElementById("activity-title").innerText == "Vocabulary") {
    var i = 0;
    try{
    var txt = window.frames[0].document.getElementsByClassName("word-background")[0].value
    } catch{txt=""}
    var speed = 50;

    function typeWriter() {
        if (window.frames[0].document.getElementsByClassName("word-textbox")[0].value.length < txt.length) {
            window.frames[0].document.getElementsByClassName("word-textbox")[0].value += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    if (txt.length > 3){

        typeWriter();
       $("#stageFrame").contents().find(".word-textbox.word-normal")[0].dispatchEvent(new Event("keyup"));
    }
    output += ("Vocab Completer, ")
  
        $("#stageFrame").contents().find(".playbutton.vocab-play")[0].click()
        $("#stageFrame").contents().find(".playbutton.vocab-play")[1].click()
        try {
          if (window.frames[0].document.getElementsByClassName("word-textbox")[0].value.length = txt.length){
            $("#stageFrame").contents().find(".uibtn.uibtn-blue.uibtn-arrow-next")[0].click()
          }
        } catch (TypeError) {}
    }
}
//!!!!!!!!!!!!!!!!!!!!! END TWEAKS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!! BEGIN CONFIG & INTERNAL HANDLERS !!!!!!!!!!!!!!!!!!!!!!!!!!!

function loaditem(item, id) {
    if (localStorage.getItem(item) != null) {
        if (localStorage.getItem(item) == "true") { //Because LocalStorage only stores strings
            document.getElementById(id).checked = true
        } else {
            document.getElementById(id).checked = false
        }
    }
}
// Load config (should run on open), does not work if  in a function probably becuase it's so far down
for (var x of configElements) {
    loaditem(x, x)
}

function syncConfig() { // Sync Config (save)
    output += ("Config saved, ")
    for (var x of configElements) {
        localStorage.setItem(x, document.getElementById(x).checked.toString())
    }
}
//!!!!!!!!!!!!!!!!! END CONFIG & INTERNAL HANDLERS !!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!! MASTERLOOP !!!!!!!!
var output = "";

function loop() {
    output = "Active Tweaks: ";
    StealthMode($("#HideButton").is(":checked"))
    if ($("#AutoCompleteVocabTickbox").is(":checked")) {
        vocabCompleter()
    }
    if ($("#AutoAdvance").is(":checked")) {
        autoadvance()
    }
    if ($("#SkipIntro").is(":checked")) skipIntro()
    if ($("#GuessPractice").is(":checked")) GuessPractice()
    if ($("#ShowColumn").is(":checked")) showColumn()
    syncConfig()
    if ($("#userconsole li:first").text() != output) {
        $("#userconsole").prepend("<li>" + output)
    }
}
window.masterloop = setInterval(loop, 2000);
}, 2000); //makes this run after 2 seconds
