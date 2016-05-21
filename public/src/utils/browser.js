import browserInfo from 'browser-info';

export function edgeCheck()
{
    return (browserInfo().name.match("Edge"))? true : false;
}

export function ieCheck()
{
    return (browserInfo().name.match("IE"))? true : false;
}

export function safariCheck()
{
    return (browserInfo().name.match("Safari"))? true : false;
}
