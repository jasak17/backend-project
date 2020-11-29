#node tracking-service/src/databaseSetup/createDb.js
#cd tracking-service && npm install
#cd ../pub-sub-system && npm install
cd pub-sub-system
(npm run devStart & (cd ../tracking-service && npm run devStart) & node ../cli-client/client.js 1 ) ; fg

