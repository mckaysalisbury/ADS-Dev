cd /tmp

rm -rf ADS-Dev; true

git clone https://github.com/PyramidSystemsInc/ADS-Dev.git -b master

cd ADS-Dev

npm install gulp -g
npm install
gulp serve-build
