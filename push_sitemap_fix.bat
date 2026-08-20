@echo off
chcp 65001 >nul
setlocal
echo ============================================
echo   GEO sitemap 修复推送（v3 中文安全版）
echo ============================================
cd /d "C:\Users\Administrator\Documents\Codex\2026-07-31\new-chat-2\gitee-site"
if errorlevel 1 (
  echo [错误] 找不到项目文件夹，请确认路径存在
  pause
  exit /b 1
)

echo.
echo [1/4] 检查待提交的改动...
git status --short

echo.
echo [2/4] 提交改动...
git add -A 2>nul
git commit -m "sitemap文件名改为英文拼音，修复Bing抓取问题" 2>nul
if errorlevel 1 (
  echo 提交失败或无改动可提交，继续尝试推送...
)

echo.
echo [3/4] 推送到 GitHub...
git push origin master

echo.
echo [4/4] 完成！
echo 站点: https://aliye-afk.github.io/geo/
echo 索引: https://aliye-afk.github.io/geo/sitemap-index.xml
echo.
echo 如果推送失败，通常是网络或 token 问题，请把窗口文字发我。
pause
