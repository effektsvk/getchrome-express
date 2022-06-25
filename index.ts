const express = require('express')
const path = require('path')
const app = express()
const router = express.Router()

const WINDOWS_COMMAND = '$Path = $env:TEMP; $Installer = "chrome_installer.exe"; Invoke-WebRequest "https://dl.google.com/chrome/install/latest/chrome_installer.exe" -OutFile $Path\\$Installer; Start-Process -FilePath $Path\\$Installer -Verb RunAs -Wait; Remove-Item $Path\\$Installer'

router.get('/', function (req, res) {
  const userAgent = req.headers['user-agent'] ?? 'unknown'
  if (userAgent.includes('WindowsPowerShell')) {
    res.send(WINDOWS_COMMAND)
  } else if (userAgent.includes('curl')) {
    res.send('Linux/Mac is not supported yet.\n')
  } else {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
  }
})

app.use(router)
app.use(express.static(path.resolve(__dirname, './client/build')))

app.listen(80)
