#!/usr/bin/env node

/*
Launcher came from here.
https://github.com/mrxdst/webtorrent-mpv-hook/blob/master/src/bin.ts
*/
const path = require("path");
const os = require("os");
const fs = require("fs");

const pluginDir = path.join(__dirname, "mpvremote");
const pluginTarget = path.join(getScriptFolder());

const target = path.join(__dirname, "remoteServer.js");
const target1 = path.join(__dirname, "watchlisthandler.js");
const link = path.join(getScriptFolder(), "mpvremote", "remoteServer.js");
const link1 = path.join(getScriptFolder(), "mpvremote", "watchlisthandler.js");

// const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf-8'));

console.log(
  [
    `mpv-remote`,
    "",
    `${
      os.platform() === "win32"
        ? "On Windows you can't create symlink without Administrator privileges!"
        : ""
    }`,
    "First copy mpvremote plugin to your MPV plugins folder:",
    "",
    `  ${
      os.platform() === "win32"
        ? `xcopy /i "${pluginDir}" "${path.join(pluginTarget, "mpvremote")}"`
        : `mkdir -p "${pluginTarget}" && cp -r "${pluginDir}" "${pluginTarget}"`
    }`,
    "",
    "You need to symlink the script file to your MPV scripts folder:",
    "",
    `  ${
      os.platform() === "win32"
        ? `mklink "${link}" "${target}"\n  or\n  New-Item -ItemType SymbolicLink -Path "${link}" -Target "${target}"`
        : `ln -s "${target}" "${link}"`
    }`,
    "If you want save media status do this:",
    `  ${
      os.platform() === "win32"
        ? `mklink "${link1}" "${target1}"\n  or\n  New-Item -ItemType SymbolicLink -Path "${link1}" -Target "${target1}"`
        : `ln -s "${target1}" "${link1}"`
    }`,
    "",
    "Download the Android app here: https://github.com/husudosu/mpv-remote-app/blob/master/android/app/release/app-release.apk",
  ].join("\n")
);

function getScriptFolder() {
  let mpvHome;

  if (os.platform() === "win32") {
    mpvHome = process.env["MPV_HOME"] || "%APPDATA%/mpv";
  } else {
    mpvHome = process.env["MPV_HOME"];
    if (!mpvHome) {
      const xdgConfigHome = process.env["XDG_CONFIG_HOME"] || "$HOME/.config";
      mpvHome = path.join(xdgConfigHome, "mpv");
    }
  }

  return path.join(mpvHome, "scripts");
}
