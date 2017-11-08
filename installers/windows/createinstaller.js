const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
     .then(createWindowsInstaller)
     .catch((error) => {
     console.error(error.message || error)
     process.exit(1)
 })

function getInstallerConfig () {
    console.log('creating windows installer')
    const rootPath = path.join('./')
    const outPath = path.join(rootPath, 'release-builds')

    return Promise.resolve({
       appDirectory: path.join(outPath, 'cucm2-app-win32-ia32'),
       authors: 'Andrew Petersen',
       noMsi: true,
       outputDirectory: path.join(outPath, 'windows-installer'),
       exe: 'cucm2-app.exe',
       setupExe: 'cucm2.exe'
    //    setupIcon: path.join(rootPath, 'assets', 'icons', 'win', 'icon.ico')
   })
}