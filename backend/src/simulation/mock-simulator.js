const injectCarRaceData = (cars) => {

    if (!cars || cars.length == 0) {
        console.log("[ERROR] Invalid cars object.");
        return;
    }

    cars.forEach(element => {
        if (element.progress === undefined || element.progress === null) {
            element.progress = 0;
        } else {
            const prevProgress = element.progress;
            element.progress = prevProgress + getRandomBetween(1, 5);
        }
    });

    return cars;

}


const assembleTelemetryData = () => {

    const data = {
        speed: getRandomBetween(0, 378), // km/h – 0 (pit/standstill) to ~378 (absolute top speed record)
        rpms: getRandomBetween(3000, 15000), // Current engines limited to 15,000 rpm redline

        tire_health_fl: getRandomBetween(0, 100), // TODO we'll see these ones
        tire_health_fr: getRandomBetween(0, 100), // if we can decrease them over time
        tire_health_rl: getRandomBetween(0, 100),
        tire_health_rr: getRandomBetween(0, 100),

        fuel_level: getRandomBetween(0, 110),     // kg remaining – max race allowance is 110 kg
        battery_level: getRandomBetween(0, 100),  // % of ERS battery

        brake_temperature: getRandomBetween(200, 1100),  // °C – operating range
        engine_oil_temp: getRandomBetween(90, 150),  // °C – ideal operating range

        oil_pressure: getRandomBetween(3, 8) // bar
    };

    return data;
}


function getRandomBetween(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export { assembleTelemetryData, injectCarRaceData };