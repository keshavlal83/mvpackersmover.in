# Pure Windows Built-in HTTP Server (No Node.js or Python required)
$port = 8080
$folder = $PSScriptRoot
if (-not $folder) { $folder = (Get-Location).Path }

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "==========================================================================" -ForegroundColor Cyan
Write-Host "  MAA VINDHYAVASINI PACKERS MOVERS AND TRANSPORT - LOCAL SERVER ACTIVE" -ForegroundColor Yellow
Write-Host "  Running at: http://localhost:$port/" -ForegroundColor Green
Write-Host "  Helpline: +91 80100 41007" -ForegroundColor White
Write-Host "  Press Ctrl+C in this window to stop the server." -ForegroundColor Gray
Write-Host "==========================================================================" -ForegroundColor Cyan

Start-Process "http://localhost:$port/"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $path = $request.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($path)) { $path = "index.html" }
    
    $filePath = Join-Path $folder $path

    if (Test-Path $filePath -PathType Leaf) {
        $content = [System.IO.File]::ReadAllBytes($filePath)
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        
        switch ($ext) {
            ".html" { $response.ContentType = "text/html; charset=utf-8" }
            ".css"  { $response.ContentType = "text/css; charset=utf-8" }
            ".js"   { $response.ContentType = "application/javascript; charset=utf-8" }
            ".json" { $response.ContentType = "application/json; charset=utf-8" }
            ".svg"  { $response.ContentType = "image/svg+xml" }
            ".png"  { $response.ContentType = "image/png" }
            ".jpg"  { $response.ContentType = "image/jpeg" }
            default { $response.ContentType = "application/octet-stream" }
        }

        $response.ContentLength64 = $content.Length
        $response.OutputStream.Write($content, 0, $content.Length)
    } else {
        $response.StatusCode = 404
        $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 - Not Found")
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
    }
    
    $response.Close()
}
