# 個人作品集網站

這是一個可直接部署的靜態作品集網站，不需要建置或安裝套件。`index.html` 是暖白底動態拼貼首頁，保留作品圖片、分類、搜尋與關於我。首頁的「作品檔案」、「探索作品」與「查看作品」連到 `works.html`，以黑底 3D Fibonacci 球體展示作品，可拖曳旋轉、捲動拉近、切換網格與展開作品；沒有自動旋轉。展示頁的品牌與「首頁」連結可返回首頁。

兩個頁面各自包含完整 HTML、CSS 與原生 JavaScript。首頁保留內嵌字型與作品拼貼圖片；展示頁使用 Google Fonts Playfair Display / Inter 與 `assets/images/` 的本機作品圖片。

## 修改內容

1. 在 `works.html` 的 `EDIT PORTFOLIO CONTENT HERE` 區段修改 `portfolio` 的姓名、品牌、簡介與 email。
2. 在同一區段的 `works` 陣列修改作品名稱、描述、分類、年份與連結。未知的製作年份保留空白。
3. 把實際作品圖放到 `assets/images/`，並在對應作品設定 `image` 相對路徑。支援 JPG、JPEG、PNG、WebP、AVIF；可選填 `fullImage` 在作品展開時載入高解析度版本。直式作品設定 `tall: true`。圖片不嵌入 Base64，也不使用外部圖片服務。
4. 首頁的分類與搜尋使用 `index.html` 的 `projects` 陣列，新增或修改作品時同步更新該處。若要改色彩，調整各頁內嵌 `<style>` 最上方的 `:root` 變數。

新增作品只需加入一張圖片與一筆 `works` 記錄；瀏覽器不會自動掃描資料夾。球體依 `works.length` 重新分布，支援單件作品與後續擴充。開發中的作品可設定 `status: "In development"`；連結使用 `url` 與 `linkLabel`。沒有圖片時設定 `image: null`，顯示該作品的文字提示。

球體與游標共用一個 requestAnimationFrame 迴圈，靜止時不重寫卡片的樣式，分頁隱藏時暫停。圖片只解碼與縮小一次，球體與網格共用快取；Object URL 在頁面離開時釋放。尊重系統的減少動態偏好；每件作品可用鍵盤 Enter 或空白鍵開啟，Escape 依序關閉作品、選單與網格，並還原焦點。

目前使用六件已提供資料的作品：ARC、Lone Escape、Chronostasis、二拾光、國科會專案與 Rustborn。三張實際畫面位於 `assets/images/work-01.webp`、`work-02.webp`、`work-04.webp`；其餘三件等待正式截圖，不加入示範專案或無關照片。

頭像與片頭影片預設關閉。提供 `assets/images/avatar.webp` 後設定 `portfolio.avatar`；提供 `assets/videos/intro.mp4` 後設定 `portfolio.introVideo`，並保留 `introEnabled: true`。影片以 2 倍速播放並提供 Skip。未提供、載入失敗或自動播放被阻擋時會自動進入作品集；載入計數有 9 秒上限，避免卡在讀取畫面。

原始拼貼首頁備份保存在 `output/portfolio-before-sphere.html`。舊版 `script.js`、`styles.css` 不由目前兩個頁面載入。

## 本機預覽

直接用瀏覽器開啟 `index.html` 即可預覽首頁，點「探索作品」進入 `works.html`。

如果想用本機伺服器預覽，也可以在此資料夾執行：

```powershell
python -m http.server 5500
```

接著開啟 `http://localhost:5500`。

## 部署到 GitHub Pages

1. 建立一個 GitHub repository。
2. 將這個資料夾推上 GitHub。
3. 到 repository 的 `Settings` → `Pages`。
4. `Build and deployment` 選擇 `GitHub Actions`。
5. 推送到 `main` 後，`.github/workflows/pages.yml` 會自動發布。
6. 等 Actions 完成後，頁面會出現在 `https://你的帳號.github.io/你的-repo/`。

## 部署到 Netlify

1. 登入 Netlify，選擇 `Add new site`。
2. 選擇從 GitHub 匯入 repository，或直接拖曳整個資料夾。
3. Build command 留空。
4. Publish directory 填 `.`。
5. 部署完成後即可取得公開網址。

## 部署到 Vercel

1. 登入 Vercel，選擇 `Add New Project`。
2. 匯入 GitHub repository。
3. Framework Preset 選擇 `Other`。
4. Build command 留空。
5. Output directory 填 `.`。
6. 部署完成後即可取得公開網址。
