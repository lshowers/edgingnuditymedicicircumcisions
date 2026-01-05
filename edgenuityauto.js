var lastNotified = 0

const notify = () => {
	if (Date.now() - lastNotified < 3000) return

	lastNotified = Date.now()

	if (document.querySelector("#stageFrame").contentWindow.document.querySelector("#iFramePreview") !== null) {
		var iframe = document.querySelector("#stageFrame").contentWindow.document.querySelector("#iFramePreview").contentWindow.document.body
	} else {
		var iframe = document.querySelector("#stageFrame").contentWindow.document.body
	}
	if (iframe.querySelector(".quick-check") !== null) {
		const notification = new Notification("Quick Check!")
	} else if (iframe.querySelector(".try-it") !== null) {
		const notification = new Notification("Try it!")
	}
}

const getQuestion = () => {
	let question = ""
	if (document.querySelector("#stageFrame") !== null) {
		if (document.querySelector("#stageFrame").contentDocument.querySelector("#iFramePreview") !== null) {
			if (document.querySelector("#stageFrame").contentDocument.querySelector("#iFramePreview").contentDocument.querySelector(".content") !== null) {
				question = document.querySelector("#stageFrame").contentDocument.querySelector("#iFramePreview").contentDocument.querySelector(".content").innerText
			}
		} else if (document.querySelector("#stageFrame").contentDocument.querySelector(".question-container") !== null) {
			question = document.querySelector("#stageFrame").contentDocument.querySelector(".question-container").innerText
		}
	}

	return question
}

var cachedText = ""

const edgenuityAuto = setInterval(() => {
	//document.querySelector("#stageFrame").contentDocument.querySelector("#iFramePreview").contentDocument.querySelector("iframe").contentDocument.querySelectorAll("*").forEach(element => {element.style.userSelect = "text"})
	
	if (document.querySelector("#stageFrame").contentWindow.API.FrameChain) {
		document.querySelector("#stageFrame").contentWindow.API.FrameChain.nextFrame() // Skips video when possible
	}

	if (document.querySelector("#stageFrame").contentDocument.getElementById("invis-o-div") !== null) {
		document.querySelector("#stageFrame").contentDocument.getElementById("invis-o-div").style.display = "none" // Hides the overlay preventing you from answering questions
	}

	let question = getQuestion()

	if (question != "" && question !== cachedText) { // Only run question code once
		cachedText = question
	
		// Sends a notification once manual input is required
	
		if (Notification.permission === "granted") {
			notify()
		} else if (Notification.permission !== "denied") {
			Notification.requestPermission().then((permission) => {
				if (permission === "granted") notify()
			})
		}
	}
}, 1000)

const killEdgenuityAuto = () => {
	if (edgenuityAuto !== null) {
		clearInterval(edgenuityAuto)
		console.log("Killed EdgenuityAuto")

		if (document.querySelector("#stageFrame").contentDocument.querySelector(".buttons").querySelector("#copyQuestion") !== null) {
			document.querySelector("#stageFrame").contentDocument.querySelector(".buttons").querySelector("#copyQuestion").remove()
		}
	} else {
		console.log("EdgenuityAuto not running")
	}
}

console.log("Started EdgenuityAuto")
