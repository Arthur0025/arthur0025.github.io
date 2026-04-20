Add-Type -AssemblyName System.Runtime.WindowsRuntime | Out-Null
$null = [Windows.Storage.StorageFile,Windows.Storage,ContentType=WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapDecoder,Windows.Graphics.Imaging,ContentType=WindowsRuntime]
$null = [Windows.Media.Ocr.OcrEngine,Windows.Media.Ocr,ContentType=WindowsRuntime]

function Await-WinRtOp([object]$op, [type]$resultType) {
  $method = [System.WindowsRuntimeSystemExtensions].GetMethods() |
    Where-Object { $_.Name -eq 'AsTask' -and $_.IsGenericMethodDefinition -and $_.GetGenericArguments().Count -eq 1 -and $_.GetParameters().Count -eq 1 } |
    Select-Object -First 1
  $generic = $method.MakeGenericMethod($resultType)
  $task = $generic.Invoke($null, @($op))
  $task.GetAwaiter().GetResult()
}

function Ocr-Segments([string]$imagePath, [int]$segmentHeight = 2000) {
  $file = Await-WinRtOp ([Windows.Storage.StorageFile,Windows.Storage,ContentType=WindowsRuntime]::GetFileFromPathAsync($imagePath)) ([Windows.Storage.StorageFile,Windows.Storage,ContentType=WindowsRuntime])
  $stream = Await-WinRtOp ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream,Windows.Storage.Streams,ContentType=WindowsRuntime])
  $decoder = Await-WinRtOp ([Windows.Graphics.Imaging.BitmapDecoder,Windows.Graphics.Imaging,ContentType=WindowsRuntime]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder,Windows.Graphics.Imaging,ContentType=WindowsRuntime])
  $engine = [Windows.Media.Ocr.OcrEngine,Windows.Media.Ocr,ContentType=WindowsRuntime]::TryCreateFromUserProfileLanguages()

  $all = New-Object System.Collections.Generic.List[string]
  $all.Add("[IMAGE] $imagePath")
  $all.Add("[SIZE] $($decoder.PixelWidth)x$($decoder.PixelHeight)")

  for ($y = 0; $y -lt $decoder.PixelHeight; $y += $segmentHeight) {
    $h = [Math]::Min($segmentHeight, $decoder.PixelHeight - $y)
    $transform = [Windows.Graphics.Imaging.BitmapTransform,Windows.Graphics.Imaging,ContentType=WindowsRuntime]::new()
    $bounds = [Windows.Graphics.Imaging.BitmapBounds,Windows.Graphics.Imaging,ContentType=WindowsRuntime]::new()
    $bounds.X = 0
    $bounds.Y = [uint32]$y
    $bounds.Width = [uint32]$decoder.PixelWidth
    $bounds.Height = [uint32]$h
    $transform.Bounds = $bounds

    $bitmap = Await-WinRtOp (
      $decoder.GetSoftwareBitmapAsync(
        [Windows.Graphics.Imaging.BitmapPixelFormat]::Bgra8,
        [Windows.Graphics.Imaging.BitmapAlphaMode]::Premultiplied,
        $transform,
        [Windows.Graphics.Imaging.ExifOrientationMode]::RespectExifOrientation,
        [Windows.Graphics.Imaging.ColorManagementMode]::DoNotColorManage
      )
    ) ([Windows.Graphics.Imaging.SoftwareBitmap,Windows.Graphics.Imaging,ContentType=WindowsRuntime])

    $result = Await-WinRtOp ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult,Windows.Media.Ocr,ContentType=WindowsRuntime])

    $all.Add("===== SEGMENT y=$y h=$h =====")
    if ($result -and $result.Lines -and $result.Lines.Count -gt 0) {
      foreach ($line in $result.Lines) {
        $all.Add($line.Text)
      }
    } else {
      $all.Add("[EMPTY]")
    }
    $all.Add("")
  }

  return ($all -join "`r`n")
}

$root = 'd:\arthur0025\arthur0025.github.io'
$images = Get-ChildItem -Path $root -Filter '*.jpg' |
  Where-Object { $_.Name -like '20*.jpg' } |
  Sort-Object Name |
  Select-Object -ExpandProperty Name

$outPath = Join-Path $root '_tmp_schedule_ocr_segments.txt'
$allText = New-Object System.Collections.Generic.List[string]
foreach ($img in $images) {
  $full = Join-Path $root $img
  try {
    $allText.Add((Ocr-Segments $full 2000))
  } catch {
    $allText.Add("[ERROR] $img :: $($_.Exception.Message)")
  }
  $allText.Add("`r`n")
}
$allText -join "`r`n" | Set-Content -Encoding UTF8 $outPath
