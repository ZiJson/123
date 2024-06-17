console.log("background script loaded12");
// @ts-ignore
chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error: any) => console.error(error));

chrome.webRequest.onCompleted.addListener(
    function (details) {
        console.log("onCompleted", details);
    },
    { urls: ["<all_urls>"] }
);
chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
        if (
            details.method === "POST" &&
            details.type === "xmlhttprequest" &&
            codeData
        ) {
            console.log(details, codeData);
            // const headers = details.requestHeaders;
            // siteId = getArrValue(headers, "site");
            // siteTime = getArrValue(headers, "sitetime");
            // const encryptKey = generateKey(siteId, siteTime); // 加密金鑰
            // const data = decryptData(codeData, encryptKey);
            // console.log(encryptKey, "Request payload:", details.url, data);
        }
    },
    { urls: ["<all_urls>"] },
    ["requestHeaders"]
);

// request header body
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        if (
            details.method === "POST" &&
            details.requestBody &&
            details.requestBody.raw
        ) {
            // 获取请求正文的第一个数据块（通常是 JSON 或表单数据）
            let requestData = details.requestBody.raw[0].bytes;
            // 转换成字符串
            let requestBody = new TextDecoder().decode(requestData);
            console.log("onBeforeRequest", requestBody);
            codeData = JSON.parse(requestBody).data;
        }
    },
    { urls: ["<all_urls>"] },
    ["requestBody"]
);
