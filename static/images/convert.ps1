# get current directory
$initpath = Get-Location
# get all directories
foreach($img in Get-Childitem $initpath -File -Recurse) {

    $extension = $img.Extension
    if ($extension -iin ".jpg",".png") {
        Write-Output "To be converted"

        Write-Output $img.FullName

        # output file will be written in the same directory
        # but with .webp extension instead of old extension
        $outputName = $img.DirectoryName + "\" + $img.BaseName + ".webp"
        $outputNameAVIF = $img.DirectoryName + "\" + $img.BaseName + ".avif"

        # since you have the cwebp bin folder in PATH just type the command
        # more options https://developers.google.com/speed/webp/docs/cwebp
        cwebp -q 75 -m 6 -af -f 50 -sharpness 0 -mt -v -progress $img.FullName -o $outputName
        $cmdLine = "avif-win-x64.exe -e `"" + $img.FullName + "`" -o `"" + $outputNameAVIF + "`""

        invoke-expression -command $cmdline
    }  else  {
        Write-Output "Not To be converted"
        Write-Output $img.FullName

    }
}
set-location $initpath