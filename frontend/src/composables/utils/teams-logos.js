export function getLogoForTeam(teamName) {
    if (!teamName) return
    const cleanName = teamName.toLowerCase().replaceAll(' ', '');

    if (cleanName.includes('vcarb') || cleanName.includes('visa')) return 'racingbulls_logo.png';

    return cleanName + "_logo.svg";
}