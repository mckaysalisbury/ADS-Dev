cd /tmp

rm -rf ADS-Dev; true

git clone https://github.com/PyramidSystemsInc/ADS-Dev.git -b main

cd ADS-Dev

npm install gulp -g

gulp serve-build