binaries_directory = app
acorn = assets/acorn
iconset = assets/icon.iconset

clean:
	rm -rf $(binaries_directory)

convert_icons_for_mac_osx:
	automator $(acorn)/createPNGIconsForOSX.workflow
	mv $(acorn)/*.png $(iconset)
	iconutil -c icns $(iconset)

update_installed_app:
	rm -rf /Applications/Transcriptase.app
	cp -r app/Transcriptase-darwin-x64/Transcriptase.app /Applications/Transcriptase.app

osx:
	make convert_icons_for_mac_osx
	electron-packager \
		. \
		--arch=all \
		--icon=assets/icon.icns \
		--out=app \
		--platform=darwin \
		--prune=true # https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#prune
	make update_installed_app

windows:
	electron-packager \
		. \
		--icon assets/windows-app-icon/icon.ico \
		--out app \
		--platform=win32 \
		--arch=x64 \
		--prune=true

linux:
		electron-packager \
		. \
		--out app \
		--platform=linux \
		--arch=x64 \
		--prune=true

all:
	make osx
	make windows
	make linux
