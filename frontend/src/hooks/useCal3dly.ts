import { Contract, ethers } from 'ethers';
import { useCall, useContractFunction } from '@usedapp/core';
import * as abi from '../abis/Cal3dly.json';
import { cal3dlyContractAddress } from '..';
import { Address, Cal3dlyContractMethodNames } from '../types';

export function useGetAppointments(address: Address) {
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
		return [];
	}
	return value?.[0];
}

export function useCal3dlyContractMethod(
	methodName: Cal3dlyContractMethodNames
) {
	const cal3dlyContractInterface = new ethers.utils.Interface(
		JSON.stringify(abi.abi)
	);
	const cal3dlyContract = new Contract(
		cal3dlyContractAddress,
		cal3dlyContractInterface
	);
	const { state, send } = useContractFunction(cal3dlyContract, methodName, {});
	return { state, send };
}
