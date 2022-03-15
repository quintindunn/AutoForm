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
    chrome.storage.local.get("identifier4", function(result) {
        if (JSON.stringify(result).toString() === "{}") {
            chrome.storage.local.set({"identifier4": Math.random().toString().replace(".", "")});
        }
    });
    chrome.storage.local.get("identifier4", function(result) {
        let identifier = JSON.stringify(result)
        var request = new XMLHttpRequest();
        const url = "https://www.recoiloff.com/api/ret?identifier=" + identifier.split(":")[1].replace("}", "").replace("%", "");
        request.open("GET", url);
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if (request.response != "none"){
                    
                    let url_small = document.getElementById("url_small");
                    url_small.innerText = "Click to Open!";
                    copytext = document.getElementById("copytext");
                    copytext.href = request.response;
                    let forcp = document.getElementById("forcp");
                    forcp.style.display = "block";
                    let copypaste = document.getElementById("cap");
                    copypaste.style.display = "block";
                    
                    copypaste.value = request.response;
                }
                else
                {
                    let forcp = document.getElementById("forcp");
                    forcp.style.display = "none";
                    let copypaste = document.getElementById("cap");
                    copypaste.style.display = "none";
                    copytext = document.getElementById("copytext");
                    copytext.href = "none://none";
                }
            }
        }
        request.send("");
        url_small.addEventListener('click', function() {
            if (document.getElementById("copytext").href != "none://none"){
                chrome.tabs.create({url: document.getElementById("copytext").href});
            }

        });
    });
    
});
