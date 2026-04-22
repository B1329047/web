function getimg() {
  console.log("正在透過 JSONP 請求 Flickr 資料...");

  // 1. 建立一個唯一的 Callback 函式名稱
  var callbackName = 'flickr_cb_' + Math.floor(Math.random() * 100000);

  // 2. 定義這個全域函式，當 Flickr 資料回傳時會自動執行它
  window[callbackName] = function(data) {
    console.log("資料接收成功！", data);
    add_new_img(data.items);
    
    // 執行完後移除 script 標籤與全域函式，保持乾淨
    document.body.removeChild(script);
    delete window[callbackName];
  };

  // 3. 動態建立一個 <script> 標籤，這是繞過 CORS 的經典技巧
  var script = document.createElement('script');
  
  // 網址說明：
  // format=json (指定格式)
  // jsoncallback=... (指定接收資料的函式名稱)
  script.src = 'https://www.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=' + callbackName;
  
  // 4. 將 script 標籤加入頁面，這會觸發瀏覽器去抓取 API
  document.body.appendChild(script);
}

function add_new_img(dataset) {
  var gal = document.getElementById("gallery");
  if (!gal) return;
  
  gal.innerHTML = ""; // 清空舊照片

  dataset.forEach(function(item) {
    var img = document.createElement("img");
    // Flickr 的圖片網址在 item.media.m
    img.setAttribute("src", item.media.m);
    gal.appendChild(img);
  });
  console.log("照片渲染完成");
}