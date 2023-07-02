const { network } = require("hardhat")

async function moveBlocks(amount){

    console.log("moving Blocks")
for(let i = 0; i<amount; i++){ //mining blocks
    await network.provider.request({
        method: "evm_mine",
        params: [],

    })
}
}
module.exports = {
    moveBlocks,
}