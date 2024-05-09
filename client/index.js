const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  const leaf = process.argv[2];
  const index = niceList.findIndex(n => n === process.argv[2]);

  if (index === -1) {
    //console.log('unfortunately you are not on the list, looks like you didn\'t make it to the nice list!');
  } 

  const merkleTree = new MerkleTree(niceList);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    leaf
  });

  console.log({ gift });
}

main();