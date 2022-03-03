var wakeup = function(){
    setTimeout(function(){
        chrome.runtime.sendMessage('ping', function(){
            console.log("pong");
        });
        wakeup();
    }, 10000);
}
wakeup();

document.addEventListener("DOMContentLoaded", function(){
    // chrome.storage.local.set({"identifier": Math.random().toString().replace(".", "")})
    chrome.storage.local.get("identifier3", function(result) {
        if (JSON.stringify(result).toString() === "{}") {
            chrome.storage.local.set({"identifier3": Math.random().toString().replace(".", "")});
        }
    });
    chrome.storage.local.get("identifier3", function(result) {
        let identifier = JSON.stringify(result)
        console.log(identifier);
        var request = new XMLHttpRequest();
        const url = "https://www.recoiloff.com/api/ret?identifier=" + identifier.split(":")[1].replace("}", "").replace("%", "");
        console.log(url);
        request.open("GET", url);
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                let url_small = document.getElementById("url_small");
                url_small.innerText = "Click to Open!";
                copytext = document.getElementById("copytext");
                copytext.href = request.response;
            }
        }
        request.send("");
        url_small.addEventListener('click', function() {
            chrome.tabs.create({
                url: document.getElementById("copytext").href
              });
        });
    });
    
});
