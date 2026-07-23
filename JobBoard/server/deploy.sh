echo "Build Frontend"

cd ../client
npm install
npm run build
cd ..

echo "Build Backend"
cd server
npm install


