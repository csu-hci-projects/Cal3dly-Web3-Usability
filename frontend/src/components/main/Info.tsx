import { FC } from 'react';
import { Flex, Text, Heading } from '@chakra-ui/react';

export const Info: FC = () => {
	return (
		<Flex
			alignItems='center'
			justifyContent='center'
			mt='150px'
			flexDir='column'
		>
			<Heading letterSpacing='wide' color='white' size='4xl' fontWeight='bold'>
				Cal3dly
			</Heading>
			<Text
				letterSpacing='wide'
				mt='10px'
				color='white'
				fontWeight='bold'
				fontSize='lg'
			>
				A Web3 Powered Appointment Scheduler
			</Text>
		</Flex>
	);
};
