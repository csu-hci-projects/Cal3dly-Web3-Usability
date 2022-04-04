import { parse, stringify } from 'query-string';

const setQueryStringWithoutPageReload = (qsValue: string) => {
	const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${qsValue}`;
	window.history.pushState({ path: newurl }, '', newurl);
};

export const setQueryString = (
	key: string,
	value: string,
	queryString = window.location.search
) => {
	const values = parse(queryString);
	const newVals = stringify({ ...values, [key]: value });
	setQueryStringWithoutPageReload(newVals);
};
