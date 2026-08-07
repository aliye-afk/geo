@echo off
setlocal enabledelayedexpansion
echo ============================================
echo   GEO 站点同步到 GitHub（API方式）
echo   苏州邦恩精密仪器有限公司
echo ============================================
echo.
cd /d "C:\Users\Administrator\Documents\Codex\2026-07-31\new-chat-2\gitee-site"
echo [1/2] 编码 data.js...
node -e "var fs=require('fs');var c=fs.readFileSync('data.js').toString('base64');fs.writeFileSync('_b64.txt',c);console.log('OK: '+Math.round(c.length/1024)+'KB base64')"
echo [2/2] 通过API上传...
powershell -ExecutionPolicy Bypass -Command "$token='ghp_XgJldFpstbDkTRC2koW6eCe5S17ciJ2bqEWQ'; $content=[System.IO.File]::ReadAllText('C:\\Users\\Administrator\\Documents\\Codex\\2026-07-31\\new-chat-2\\gitee-site\\_b64.txt'); $body=@{message='sync data.js';content=$content;branch='main'}|ConvertTo-Json -Depth 1; try{ $r=Invoke-RestMethod -Uri 'https://api.github.com/repos/aliye-afk/geo/contents/data.js' -Method PUT -Headers @{Authorization='token '+$token;Accept='application/vnd.github.v3+json'} -Body $body -ContentType 'application/json'; Write-Output '✅ 上传成功！' }catch{ Write-Output '❌ 失败: '+$_.Exception.Message }" -NonInteractive
echo.
echo 完成！站点: https://aliye-afk.github.io/geo/
del _b64.txt 2>nul
pause
