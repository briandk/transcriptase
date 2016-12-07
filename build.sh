#!/bin/bash --verbose
ASSETS=assets
ICONSET="$ASSETS/icon.iconset"
ICNS_FILE="$ASSETS/icon.icns"
RAW_ICONS="$ASSETS/raw-icons"
CURRENT_DIRECTORY=$(pwd)
BINARIES_DIRECTORY="app"

# in case there's no existing transparency in the logos
function add_alpha_channel_to_icons {
    cd $RAW_ICONS
    for filename in *.png; do
        convert "$filename" -alpha Set -colorspace sRGB -define png:format=png32 "../icon.iconset/$filename" && \
        echo "added alpha channel to $filename"
    done
    cd $CURRENT_DIRECTORY
}

function convert_icons_for_osx {
    iconutil -c icns $ICONSET
}

function clean_previous_builds {
    rm -rf $BINARIES_DIRECTORY
    mkdir $BINARIES_DIRECTORY
}

function build_for_osx {
    convert_icons_for_osx
    clean_previous_builds
    electron-packager \
        . \
        --arch=all \
        --icon=assets/icon.icns \
        --out=app \
        --platform=darwin \
        --prune=true # https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#prune
}

build_for_osx

