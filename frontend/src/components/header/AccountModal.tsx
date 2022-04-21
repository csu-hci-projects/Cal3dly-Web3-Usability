import {
	Box,
	Button,
	Flex,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Text,
	Tooltip,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import { shortenAddress, useEthers } from '@usedapp/core';
import Identicon from './Identicon';
import { Address } from '../../types';
import { setQueryString } from '../../services/queryString';

interface Props {
	setOwner: React.Dispatch<React.SetStateAction<Address>>;
	isOpen: boolean;
	onClose: () => void;
}

export default function AccountModal({ setOwner, isOpen, onClose }: Props) {
	const { account, deactivate } = useEthers();
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered size='md'>
			<ModalOverlay />
			<ModalContent
				bgGradient='linear(135deg, #F05F57 10%, #360940 100%)'
				border='1px'
				borderColor='edf2f7'
				borderRadius='3xl'
			>
				<AccountHeader />
				<AccountBody
					account={account}
					deactivate={deactivate}
					onClose={onClose}
					setOwner={setOwner}
				/>
			</ModalContent>
		</Modal>
	);
}

function AccountHeader() {
	return (
		<>
			<ModalHeader color='white' px={4} fontSize='lg' fontWeight='bold'>
				Account
			</ModalHeader>
			<ModalCloseButton
				color='white'
				fontSize='sm'
				_focus={{
					outlineColor: '#82C6F4',
				}}
				_hover={{
					color: '#F05F57',
				}}
			/>
		</>
	);
}

interface AccountBodyProps {
	account: Address;
	deactivate: () => void;
	onClose: () => void;
	setOwner: React.Dispatch<React.SetStateAction<Address>>;
}

function AccountBody({
	account,
	deactivate,
	onClose,
	setOwner,
}: AccountBodyProps) {
	return (
		<ModalBody pt={0} px={4}>
			<Box
				borderRadius='3xl'
				border='1px'
				borderStyle='solid'
				borderColor='white'
				px={5}
				pt={4}
				pb={2}
				mb={3}
			>
				<Flex justifyContent='space-between' alignItems='center' mb={3}>
					<Text color='white' fontSize='sm' fontWeight='bold'>
						Connected with MetaMask
					</Text>
					<Button
						onClick={() => deactivateAccount(deactivate, onClose, setOwner)}
						size='sm'
						bg='#F05F57'
						color='white'
						border='1px solid white'
						boxShadow='dark-lg'
						alignContent='center'
						_hover={{
							backgroundColor: '#591945',
						}}
					>
						Disconnect Wallet
					</Button>
				</Flex>
				<Flex alignItems='center' mt={2} mb={4} lineHeight={1}>
					<Identicon />
					<Text
						color='white'
						fontSize='xl'
						fontWeight='semibold'
						ml='2'
						lineHeight='1.1'
					>
						{account && shortenAddress(account)}
					</Text>
				</Flex>
				<Flex alignContent='center' m={3}>
					<Tooltip label='Copy Cal3dly Invite Link' hasArrow>
						<Button
							variant='link'
							color='white'
							fontWeight='bold'
							fontSize='sm'
							onClick={() =>
								navigator.clipboard.writeText(window.location.href)
							}
							_hover={{
								textDecoration: 'none',
								color: '#82C6F4',
							}}
						>
							<CopyIcon mr={1} />
							Share Cal3dly Link
						</Button>
					</Tooltip>
				</Flex>
			</Box>
		</ModalBody>
	);
}

function deactivateAccount(
	deactivate: () => void,
	onClose: () => void,
	setOwner: React.Dispatch<React.SetStateAction<Address>>
) {
	deactivate();
	setOwner(undefined);
	setQueryString('owner', undefined);
	localStorage.removeItem('account');
	onClose();
}
