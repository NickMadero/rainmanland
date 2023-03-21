param (
  [switch]$d,
  [switch]$p,
  [switch]$s
)

if ($p -eq $true) {
  Write-Host "The -p option is not supported on Windows. Please run this script on the EC2 instance (Linux machine)." -ForegroundColor Red
  exit 1
}

if (($d -eq $false) -or ($d -eq $true -and $p -eq $true)) {
  Write-Host "Error: -d must be specified." -ForegroundColor Red
  exit 1
}

Get-Content .start-app-env | Select-String -Pattern '^# Development' -Context 0, 1000 | 
Select-String -Pattern '^# Production' -Context 1000, 0 |
Select-Object -ExpandProperty Line |
Select-Object -Skip 1 -SkipLast 1 |
Where-Object { $_ -ne "" } |
Set-Content .env

Write-Host "The following environment variables have been given to the docker-compose.dev.yml file:"
Get-Content .env

docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.dev.yml down

if ($s -eq $true) {
  Write-Host "Note: Using elevated privileges to run Docker commands." -ForegroundColor Yellow
  Start-Process -FilePath "docker-compose" -ArgumentList "-f", "docker-compose.dev.yml", "up", "--build" -Verb RunAs -Wait
} else {
  docker-compose -f docker-compose.dev.yml up --build
}

Remove-Item .env

