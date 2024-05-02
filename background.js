chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    console.log("message received");
    if (message.action === 'captureHtml'){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            var tab = tabs[0];
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                function: function(){
                    var htmlContent = document.documentElement.outerHTML;
                    return htmlContent;
                }
            }, function(results){
                var html = results[0].result;
                //local storage
                chrome.storage.local.set({savedRecipeHtml: html}, function() {
                    console.log('HTML content saved locally:', html);
                    sendResponse({html: html});
                });            
            });
        });
        return true;
    }
});