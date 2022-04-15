import { FC } from 'react';
import { Flex, Icon, Link, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { ToasterModes } from '../../types';

interface ToastProps {
	title: string;
	info: string;
	link: string;
	icon: IconType;
	mode: ToasterModes;
}

export const Toast: FC<ToastProps> = ({ title, info, link, icon, mode }) => {
	return (
		<Flex
			bg={getColor(mode)}
			flexDir='column'
			alignItems='center'
			color='white'
			borderRadius='.375rem'
			padding='.75rem'
			m='0.5rem'
		>
			<Flex>
				<Icon
					as={icon}
					mr='.75em'
					alignSelf='baseline'
					h={'1.25em'}
					w={'1.25em'}
				/>
				<Flex flexDir='column'>
					<Text fontWeight='extrabold'>{title}</Text>
					<Text>
						{info}
						{mode !== 'error' && link.length > 0 && (
							<>
								{' '}
								<Link href={link} isExternal>
									<u>here</u>
								</Link>
								!
							</>
						)}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};

function getColor(mode: ToasterModes): string {
	switch (mode) {
		case 'success':
			return '#38A169';
		case 'info':
			return '#3182CE';
		case 'error':
			return '#E53E3E';
		default:
			return '';
	}
}
