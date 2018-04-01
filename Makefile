app_directory = app
acorn = assets/acorn
iconset = assets/icon.iconset
windows_app = Transcriptase-win32-x64
osx_app = Transcriptase-darwin-x64
linux_binary = Transcriptase-linux-x64
distribution_directory = dist
compiled_typescript_directory = built

typescript:
	rm -rf $(compiled_typescript_directory)
	yarn run compile-typescript
	cp -R src/css $(compiled_typescript_directory)
	cp src/index.html $(compiled_typescript_directory)

parcel:
	rm -rf dist
	yarn run parcel build src/index.html src/index.ts --no-cache --target electron --detailed-report

clean_distributions:
	rm -rf $(distribution_directory)

clean_compiled_apps:
	rm -rf $(app_directory)

clean:
	make clean_distributions
	make clean_compiled_apps

convert_icons_for_mac_osx:
	automator $(acorn)/createPNGIconsForOSX.workflow
	mv $(acorn)/*.png $(iconset)
	iconutil -c icns $(iconset)

update_installed_app:
	rm -rf /Applications/Transcriptase.app
	cp -r app/Transcriptase-darwin-x64/Transcriptase.app /Applications/Transcriptase.app

osx:
	node_modules/.bin/build -m

windows:
	node_modules/.bin/build -w

linux:
	node_modules/.bin/build -l

zipfiles_for_distribution:
	make clean_distributions
	mkdir $(distribution_directory)
	cd $(app_directory) && \
		pwd && \
		zip -r ../$(distribution_directory)/Transcriptase-osx-x64.zip $(osx_app) && \
		zip -r ../$(distribution_directory)/Transcriptase-win32-x64.zip $(windows_app) && \
		zip -r ../$(distribution_directory)/Transcriptase-linux-x64 $(linux_binary)

distribution:
	npm run build
