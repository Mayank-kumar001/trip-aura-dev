import neo4j from 'neo4j-driver';
import "dotenv/config";

console.log(process.env.NEO4J_URL);
console.log(process.env.NEO4J_PASSWORD);

(async () => {
  const URI = 'neo4j+s://49e602b5.databases.neo4j.io';
  const USER = 'neo4j';
  const PASSWORD = 'sKP7XKSLeFkZJafpMqhp1yE6lShvZwDbZZDeekKtX3Y';

  let driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
  const serverInfo = await driver.getServerInfo();

  console.log('Connection established');
  console.log(serverInfo);

  await driver.close();
})();
