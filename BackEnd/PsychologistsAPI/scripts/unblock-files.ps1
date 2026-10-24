# Script para eliminar la marca de 'Descargado' (Zone.Identifier) de archivos en el repositorio
# Uso: Abrir PowerShell y ejecutar:
#   powershell -ExecutionPolicy Bypass -File .\scripts\unblock-files.ps1

param(
    [string]$Path = ".",
    [switch]$IncludeHidden
)

Write-Host "Unblocking files under: $Path"

try {
    $items = Get-ChildItem -Path $Path -Recurse -Force -File -ErrorAction Stop
    if (-not $IncludeHidden) {
        $items = $items | Where-Object { -not ($_.Attributes -band [System.IO.FileAttributes]::Hidden) }
    }

    $count = 0
    foreach ($f in $items) {
        try {
            Unblock-File -Path $f.FullName -ErrorAction Stop
            $count++
        } catch {
            # Si falla Unblock-File, intentar eliminar stream Zone.Identifier manualmente
            try {
                $zoneStream = "$($f.FullName):Zone.Identifier"
                if (Test-Path $zoneStream) {
                    Remove-Item $zoneStream -ErrorAction Stop
                    $count++
                }
            } catch {
                Write-Host "No se pudo desbloquear: $($f.FullName) — $_" -ForegroundColor Yellow
            }
        }
    }

    Write-Host "Archivos procesados: $($items.Count). Elementos desbloqueados: $count"
} catch {
    Write-Host "Error al listar archivos: $_" -ForegroundColor Red
    exit 1
}

Write-Host "Proceso terminado. Si sigue apareciendo la excepción, mueva el repositorio fuera de la carpeta 'Downloads' o consulte las políticas de AppLocker/WDAC."