const { network } = require("hardhat")

async function moveTime(amount){
    console.log("Moving Time")
    await network.provider.send("evm_increaseTime", [amount])
    console.log(`Moved Time by ${amount} seconds`)

    
}
module.exports = {
    moveTime
}