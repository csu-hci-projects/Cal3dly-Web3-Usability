import {
	Box,
	Button,
	Flex,
	Link,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Text,
} from '@chakra-ui/react';
import { ExternalLinkIcon, CopyIcon } from '@chakra-ui/icons';
import { shortenAddress, useEthers } from '@usedapp/core';
import Identicon from './Identicon';

export default function AccountModal(props: any) {
	const { account, deactivate } = useEthers();
	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size='md'>
			<ModalOverlay />
			<ModalContent
				background='gray.900'
				border='1px'
				borderStyle='solid'
				borderColor='gray.700'
				borderRadius='3xl'
			>
				<AccountHeader />
				<AccountBody
					account={account}
					deactivate={deactivate}
					onClose={props.onClose}
				/>
			</ModalContent>
		</Modal>
	);
}

function AccountHeader() {
	return (
		<>
			<ModalHeader color='white' px={4} fontSize='lg' fontWeight='medium'>
				Account
			</ModalHeader>
			<ModalCloseButton
				color='white'
				fontSize='sm'
				_hover={{
					color: 'whiteAlpha.700',
				}}
			/>
		</>
	);
}

function AccountBody({ account, deactivate, onClose }: any) {
	return (
		<ModalBody pt={0} px={4}>
			<Box
				borderRadius='3xl'
				border='1px'
				borderStyle='solid'
				borderColor='gray.600'
				px={5}
				pt={4}
				pb={2}
				mb={3}
			>
				<Flex justifyContent='space-between' alignItems='center' mb={3}>
					<Text color='gray.400' fontSize='sm'>
						Connected with MetaMask
					</Text>
					<Button
						onClick={() => deactivateAccount(deactivate, onClose)}
						variant='outline'
						size='sm'
						borderColor='blue.800'
						borderRadius='3xl'
						color='blue.500'
						fontSize='13px'
						fontWeight='normal'
						px={2}
						height='26px'
						_hover={{
							background: 'none',
							borderColor: 'blue.300',
							textDecoration: 'underline',
						}}
					>
						Disconnect
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
					<Button
						variant='link'
						color='gray.400'
						fontWeight='normal'
						fontSize='sm'
						_hover={{
							textDecoration: 'none',
							color: 'whiteAlpha.800',
						}}
					>
						<CopyIcon mr={1} />
						Copy Address
					</Button>
					<Link
						fontSize='sm'
						display='flex'
						alignItems='center'
						href={`https://ropsten.etherscan.io/address/${account}`}
						isExternal
						color='gray.400'
						ml={6}
						_hover={{
							color: 'whiteAlpha.800',
							textDecoration: 'underline',
						}}
					>
						<ExternalLinkIcon mr={1} />
						View on Explorer
					</Link>
				</Flex>
			</Box>
		</ModalBody>
	);
}

function deactivateAccount(deactivate: any, onClose: any) {
	deactivate();
	onClose();
}
