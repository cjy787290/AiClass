# Content Folder Map

這個資料夾用來放可抽換素材與各區塊內容。

## Home

首頁相關素材放在 `home`。

- `home/photos/course-review.svg`：首頁「課程回顧」照片
- `home/photos/course-outlook.svg`：首頁「課程展望」照片
- `home/photos/other-options.svg`：首頁「其他選項」照片
- `home/background/`：首頁背景圖素材預留資料夾

如果要換首頁三張照片，建議使用相同檔名覆蓋，或改 `index.html` 裡對應的 `<img src="...">`。

## Course Review

課程回顧目前是「單頁相簿瀏覽器」：每次只顯示一個 iframe 網頁，不再顯示左右雙頁。

頁面內容放在 `course-review/pages`。

- `course-review/pages/page-01/index.html`：第 1 頁
- `course-review/pages/page-02/index.html`：第 2 頁
- ...
- `course-review/pages/page-10/index.html`：第 10 頁
- `course-review/pages/page.css`：簡單頁面範本的共用樣式
- `course-review/pages/start-left/index.html`：舊版雙頁左頁保留檔，目前相簿模式不會自動載入

每一頁都是獨立 HTML，可以直接替換該頁資料夾裡的 `index.html`。如果要放圖片，也可以把圖片放進同一個頁面資料夾的 `assets/`，再由該頁 `index.html` 引用。

## Course Outlook

課程展望後續內容放在 `course-outlook`。

目前首頁 hover 已有「課程展望」，後續如果要做點擊進入新畫面，內容建議從這裡開始放。

## Other

其他選項後續內容放在 `other`。

目前首頁 hover 已有「其他選項」，後續如果要做點擊進入新畫面，內容建議從這裡開始放。
