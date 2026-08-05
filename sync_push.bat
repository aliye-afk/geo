@echo off
echo ============================================
echo   GEO ?????? & ??
echo   ????????????
echo ============================================
echo.

cd /d "C:\Users\Administrator\Documents\Codex\2026-07-31\new-chat-2\gitee-site"

echo [1/3] ??? data.json ?? data.js...
node -e "var fs=require('fs');var d=JSON.parse(fs.readFileSync('../geo-publish/data.json','utf-8'));var e=d.contents.map(function(c){return[c.id,c.coreWord||'',c.question||'',c.question||'',c.answer||'',c.createTime||'']});fs.writeFileSync('data.js','window.__D='+JSON.stringify(e)+';');console.log('OK: '+e.length+' entries')"
if %ERRORLEVEL% NEQ 0 (
    echo ? ?????
    pause
    exit /b 1
)

echo [2/3] ????? Git...
git add data.js
git commit -m "sync: %date% %time%"
if %ERRORLEVEL% NEQ 0 (
    echo ?? ????????????????
)

echo [3/3] ????? GitHub...
git push origin main
if %ERRORLEVEL% NEQ 0 (
    echo ? ??????????
) else (
    echo.
    echo ? ?????GitHub Pages ?????
    echo    ??: https://aliye-afk.github.io/geo/
)

echo.
pause
