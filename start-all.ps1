$root = 'E:\CyberArena'

$backend = Join-Path $root 'backend'
$frontend = Join-Path $root 'frontend'
$ai = Join-Path $root 'ai-service'

Start-Process powershell -ArgumentList '-NoExit','-Command', "Set-Location '$backend'; node server.js" | Out-Null
Start-Process powershell -ArgumentList '-NoExit','-Command', "Set-Location '$ai'; .\.venv\Scripts\Activate; uvicorn app:app --reload --port 8000" | Out-Null
Start-Process powershell -ArgumentList '-NoExit','-Command', "Set-Location '$frontend'; npm run dev" | Out-Null

Write-Host 'CyberArena started in separate terminals.'
Write-Host 'Frontend: http://localhost:5173'
Write-Host 'Backend: http://localhost:5000/api/health'
Write-Host 'AI service: http://localhost:8000/health'
