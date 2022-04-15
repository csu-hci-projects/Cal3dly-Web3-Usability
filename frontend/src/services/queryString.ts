import { parse, stringify } from 'query-string';

const setQueryStringWithoutPageReload = (qsValue: string) => {
	const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${qsValue}`;
	window.history.pushState({ path: newurl }, '', newurl);
};

const clearQueryStringWithoutPageReload = () => {
	const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
	window.history.pushState({ path: newurl }, '', newurl);
	window.location.reload();
};

export const setQueryString = (
	key: string,
	value: string | undefined,
	queryString = window.location.search
) => {
	if (value) {
		const values = parse(queryString);
		const newVals = stringify({ ...values, [key]: value });
		setQueryStringWithoutPageReload(newVals);
	} else {
		clearQueryStringWithoutPageReload();
	}
};
