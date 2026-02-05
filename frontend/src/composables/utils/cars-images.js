export function getCarForTeam(teamName) {
    if (!teamName) return "fallback_car.png"
    const cleanName = teamName.toLowerCase().replaceAll(' ', '');

    if (cleanName.includes('sauber')) return 'audi_car.png';
    if (cleanName.includes('cadillac') || cleanName.includes('andretti')) return 'fallback_car.png';
    if (cleanName.includes('vcarb') || cleanName.includes('visa')) return 'racingbulls_car.png';

    return cleanName + "_car.png";
}