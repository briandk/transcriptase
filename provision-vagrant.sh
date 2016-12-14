# Swap out default Ubuntu mirror for a hopefully faster one
apt-get update && apt-get upgrade --assume-yes

# Dependencies to build an Electron app for all platforms and architectures
apt-get update && apt-get install --assume-yes \
    wine64-development
    
apt-get update && apt-get build-dep --assume-yes \
    nodejs

NODE_VERSION='node-v6.9.1'

wget "https://nodejs.org/dist/v6.9.1/$NODE_VERSION.tar.gz"
tar -zxvf $NODE_VERSION.tar.gz
