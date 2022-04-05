import { Contract, ethers } from 'ethers';
import { useCall } from '@usedapp/core';
import * as abi from '../abis/Cal3dly.json';
import { cal3dlyContractAddress } from '..';

export function useGetAppointments(address: string | null | undefined) {
	const cal3dlyContractInterface = new ethers.utils.Interface(
		JSON.stringify(abi.abi)
	);
	const { value, error } =
		useCall(
			cal3dlyContractAddress && {
				contract: new Contract(
					cal3dlyContractAddress,
					cal3dlyContractInterface
				),
				method: 'getAppointments',
				args: [address],
			}
		) ?? {};
	if (error) {
		console.error(error);
		return undefined;
	}
	return value?.[0];
}
