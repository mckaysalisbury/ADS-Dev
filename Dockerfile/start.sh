cd /tmp

rm -rf ADS-Dev; true

git clone https://github.com/PyramidSystemsInc/ADS-Dev.git -b master

cd ADS-Dev

npm install

npm install gulp -g

gulp serve-build
