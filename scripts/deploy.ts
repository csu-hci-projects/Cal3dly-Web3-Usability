// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import * as hre from 'hardhat';
import * as fs from 'fs';
import { Contract } from 'ethers';
async function main() {
	// Hardhat always runs the compile task when running scripts with its command
	// line interface.
	//
	// If this script is run directly using `node` you may want to call compile
	// manually to make sure everything is compiled
	// await hre.run('compile');

	// We get the contract to deploy
	const Contract = await hre.ethers.getContractFactory('Cal3dly');
	const contract = await Contract.deploy();

	await contract.deployed();

	console.log('Cal3dly deployed to: ', contract.address);

	exportFrontendFiles(contract);
}

function exportFrontendFiles(contract: Contract) {
	const abiDir = __dirname + '/../frontend/src/abis';

	if (!fs.existsSync(abiDir)) {
		fs.mkdirSync(abiDir);
	}

	const artifact = hre.artifacts.readArtifactSync('Cal3dly');

	fs.writeFileSync(abiDir + '/Cal3dly.json', JSON.stringify(artifact, null, 2));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
