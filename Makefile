app_directory = app
acorn = assets/acorn
iconset = assets/icon.iconset
windows_app = $(app_directory)/Transcriptase-win32-x64
osx_app = $(app_directory)/Transcriptase-darwin-x64
linux_binary = $(app_directory)/Transcriptase-linux-x64

clean:
	rm -rf $(app_directory)/* dist/*

convert_icons_for_mac_osx:
	automator $(acorn)/createPNGIconsForOSX.workflow
	mv $(acorn)/*.png $(iconset)
	iconutil -c icns $(iconset)

update_installed_app:
	rm -rf /Applications/Transcriptase.app
	cp -r app/Transcriptase-darwin-x64/Transcriptase.app /Applications/Transcriptase.app

osx:
	electron-packager \
		. \
		--arch=all \
		--icon=assets/icon.icns \
		--out=$(app_directory) \
		--platform=darwin \
		--prune=true # https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#prune
	make update_installed_app

windows:
	electron-packager \
		. \
		--icon assets/windows-app-icon/icon.ico \
		--out $(app_directory) \
		--platform=win32 \
		--arch=x64 \
		--prune=true

linux:
		electron-packager \
		. \
		--out $(app_directory) \
		--platform=linux \
		--arch=x64 \
		--prune=true

zipfiles_for_distribution:
	zip -r dist/Transcriptase-osx-x64.zip $(osx_app)/Transcriptase.app
	zip -r dist/Transcriptase-win32-x64.zip $(windows_app)
	zip -r dist/Transcriptase-linux-x64 $(linux_binary)

distribution:
	make osx
	make windows
	make linux
	make zipfiles_for_distribution
