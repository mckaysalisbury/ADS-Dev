cd /tmp

if [ ! -d "ADS-Dev" ]; then
	git clone https://github.com/PyramidSystemsInc/ADS-Dev.git -b dev
	cd ADS-Dev
	npm install
fi

cd /tmp/ADS-Dev

npm start