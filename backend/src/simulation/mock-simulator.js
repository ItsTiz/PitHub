const injectCarRaceData = (cars) => {
    if (!Array.isArray(cars) || cars.length === 0) {
        console.log("[ERROR] Invalid cars object.");
        return [];
    }

    cars.forEach(element => {
        if (element.progress === undefined || element.progress === null) {
            element.progress = 0;
            element.lapCount = 0;
            element.speed = 0;
        }
        else {
            const oldProgress = element.progress;
            const newProgress = (element.progress + getRandomBetween(3, 4)) % 100;
            if (oldProgress > 80 && newProgress < 20) { // detecting the "lap wrap-around"
                element.lapCount++;
            }
            element.progress = newProgress
            element.speed = getRandomBetween(150, 378) 
        }
    });

    return cars;

}

const sortCars = (cars) => {
     if (!Array.isArray(cars) || cars.length === 0) {
        console.log("[ERROR] Invalid cars object.");
        return [];
    }

    return cars.sort((a, b) => {
        const totalProgressA = ((a.lapCount || 0) + ((a.progress || 0) / 100)) ?? 0; 
        const totalProgressB = ((b.lapCount || 0) + ((b.progress || 0) / 100)) ?? 0;

        return totalProgressB - totalProgressA;
    });
}

const assembleTelemetryData = () => {

    const data = {
        speed: getRandomBetween(0, 378), // km/h – 0 (pit/standstill) to ~378 (absolute top speed record)
        rpm: getRandomBetween(3000, 15000), // Current engines limited to 15,000 rpm redline

        tire_health_fl: getRandomBetween(0, 100),
        tire_health_fr: getRandomBetween(0, 100),
        tire_health_rl: getRandomBetween(0, 100),
        tire_health_rr: getRandomBetween(0, 100),

        fuel_level: getRandomBetween(0, 110),     // kg remaining – max race allowance is 110 kg
        battery_level: getRandomBetween(0, 100),  // % of ERS battery

        brake_temperature: getRandomBetween(200, 1100),  // °C – operating range
        engine_oil_temp: getRandomBetween(90, 200),  // °C – ideal operating range

        oil_pressure: getRandomBetween(3, 8), // bar
        tire_type: getRandomBetween(0, 4)
    };

    return data;
}


function getRandomBetween(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export { assembleTelemetryData, injectCarRaceData, sortCars };