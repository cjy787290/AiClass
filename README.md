# TIPC AI 教育訓練回憶錄

互動式課程布告欄與課程回顧相簿。原有網站網址：[AI 教育訓練回憶錄](https://cjy787290.github.io/AiClass/)。本機修改不會自動更新線上網站。

## 在電腦上預覽

需要 Node.js 和 pnpm。在專案資料夾開啟終端機，執行：

```powershell
pnpm install
pnpm dev
```

用瀏覽器開啟終端機顯示的網址。按 `Ctrl+C` 停止預覽。

## 製作發布檔案

```powershell
pnpm build
pnpm preview
```

建置結果在 `dist/`，預覽指令會顯示本機網址。發布時需將 `dist/` 內的全部內容上傳到網站空間；不要直接在 `dist/` 修改內容。本專案目前沒有自動發布設定。

## 專案內容

- `index.html`：首頁文字、入口圖片與相簿架構。
- `src/styles.css`：首頁及相簿的樣式。
- `src/main.js`：主題入口的開啟、轉場與返回首頁。
- `content/home/`：首頁圖片和背景。
- `content/文字魔法變簡報/pages/`、`content/圖文玩出簡報力/pages/`、`content/實用工具百寶箱/pages/`：三個主題各自的網頁，入口檔名記錄於 `src/main.js`。
- `node_modules/`、`dist/`：分別是安裝及建置產物，可依上述指令重新產生。

新增或替換課程頁的方式，請參考 [content/README.md](content/README.md)。修改完成後，請重新建置並預覽確認。
