@echo off
echo ============================================
echo   GEO sitemap fix - push to GitHub
echo ============================================
cd /d "C:\Users\Administrator\Documents\Codex\2026-07-31\new-chat-2\gitee-site"
if errorlevel 1 (
  echo [ERROR] folder not found
  pause
  exit /b 1
)

echo.
echo [1/4] local changes:
git status --short

echo.
echo [2/4] commit...
git add -A 2>nul
git commit -m "sitemap pinyin rename for Bing" 2>nul

echo.
echo [3/4] push to GitHub (via proxy 127.0.0.1:7897)...
git -c http.proxy=http://127.0.0.1:7897 -c https.proxy=http://127.0.0.1:7897 -c http.sslBackend=openssl push origin master

echo.
echo [4/4] done.
echo site:  https://aliye-afk.github.io/geo/
echo index: https://aliye-afk.github.io/geo/sitemap-index.xml
echo.
pause
