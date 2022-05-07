export function toPascalCase(string: string)
{
    string = removeAndCapitalizeNextUntilGone(string, " ");
    string = removeAndCapitalizeNextUntilGone(string, "_");
    string = removeAndCapitalizeNextUntilGone(string, "-");
    return capitalizeFirst(string);
}

function capitalizeFirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeAndCapitalizeNextUntilGone(string, match)
{
    let indexOfMatch = -1;
    while ((indexOfMatch = string.indexOf(match)) !== -1)
    {
        string = removeAndCapitalizeNext(string, indexOfMatch);
    }

    return string;
}

function removeAndCapitalizeNext(string, index)
{
    const capitalized = string.charAt(index + 1).toUpperCase();
    return string.slice(0, index) + capitalized + string.slice(index + 2);
}