import { EventApi } from '@fullcalendar/react';
import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useEthers } from '@usedapp/core';
import { Address } from '../../../types';

interface Props {
	event: EventApi;
	accountHasAccess: (account: Address, attendees: string[]) => boolean;
}

export const Event: FC<Props> = ({ event, accountHasAccess }) => {
	const { account } = useEthers();
	return (
		<Flex flexDir='column' p='2'>
			{checkDuration(event.start, event.end) && (
				<Flex>
					<Flex flex='1'></Flex>
					<Flex marginBottom='5px' fontSize='sm'>
						<Text>
							{new Date(event?.start?.getTime() || 0).toLocaleTimeString(
								'en-US',
								{
									hour: '2-digit',
									minute: '2-digit',
									hour12: false,
								}
							)}
							-
						</Text>
						<Text>
							{new Date(event?.end?.getTime() || 0).toLocaleTimeString(
								'en-US',
								{
									hour: '2-digit',
									minute: '2-digit',
									hour12: false,
								}
							)}
						</Text>
					</Flex>
				</Flex>
			)}
			<Flex>
				<Text fontSize='lg' letterSpacing='wide'>
					{accountHasAccess(account, event.extendedProps.attendees)
						? event.title
						: `Unavailable`}
				</Text>
			</Flex>
		</Flex>
	);
};

function checkDuration(start: Date | null, end: Date | null) {
	return start && end && end?.getTime() - start?.getTime() > 3600000;
}
