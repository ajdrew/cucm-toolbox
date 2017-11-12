const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
    .then(createWindowsInstaller)
    .catch((error) => {
        console.error(error.message || error)
        process.exit(1)
    })

function getInstallerConfig() {
    console.log('creating windows installer')
    const rootPath = path.join('./')
    const outPath = path.join(rootPath, 'release-builds')
    const icon = path.join(rootPath, 'assets/icons/win/icon.ico')
    console.log(icon)

    return Promise.resolve({
        appDirectory: path.join(outPath, 'cucm-toolbox-win32-ia32'),
        authors: 'Andrew Petersen',
        noMsi: true,
        outputDirectory: path.join(outPath, 'windows-installer'),
        exe: 'cucm-toolbox.exe',
        setupExe: 'cucm-toolbox.exe',
        loadingGif: path.join(rootPath, 'assets/loader/44frgm.gif'),
        setupIcon: path.join(rootPath, 'assets/icons/win/icon.ico')
    })
}