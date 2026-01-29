import NotificationEvent from "./events/notification-events.js";

const generateAndEmitNotifications = (io, cars) => {
  const events = [];
  const now = new Date();

  cars.forEach(car => {
    // --- LAP COMPLETED ---
    if (!car.lastNotifiedLap) car.lastNotifiedLap = 0;
    if (!car.lapCount) car.lapCount = 0;

    if (car.lapCount > car.lastNotifiedLap) {
      events.push({
        type: 'lap_completed',
        message: `Giro completato da ${car.model || 'una vettura'}`,
        carId: car._id,
        timestamp: now,
        roles: ['user', 'admin']
      });
      car.lastNotifiedLap = car.lapCount;
    }

    // --- TELEMETRY EVENTS (team + admin) ---
    const telemetry = car.telemetry;
    if (!telemetry) return;

    const teamId = car.team?.toString();
    if (!teamId) return;

    // Fuel low
    if (telemetry.fuel_level < 20 && !car._fuelWarned) {
      events.push({
        type: 'fuel_low',
        message: `Carburante basso (${car.model})`,
        carId: car._id,
        timestamp: now,
        roles: ['team', 'admin'],
        teamId
      });
      car._fuelWarned = true;
    }

    // Engine temperature high
    if (telemetry.engine_oil_temp > 180 && !car._tempWarned) {
      events.push({
        type: 'temperature_high',
        message: `Temperatura olio elevata (${car.model})`,
        carId: car._id,
        timestamp: now,
        roles: ['team', 'admin'],
        teamId
      });
      car._tempWarned = true;
    }

    // Tire wear
    const minTire = Math.min(
      telemetry.tire_health_fl, telemetry.tire_health_fr,
      telemetry.tire_health_rl, telemetry.tire_health_rr
    );
    if (minTire < 30 && !car._tireWarned) {
      events.push({
        type: 'tire_wear',
        message: `Usura gomme elevata (${car.model})`,
        carId: car._id,
        timestamp: now,
        roles: ['team', 'admin'],
        teamId
      });
      car._tireWarned = true;
    }
  });

  // --- EMISSIONE EVENTI ---
  events.forEach(ev => {
    if (ev.roles.includes('admin')) {
      io.to('admin').emit(NotificationEvent.NEW, ev);
    }
    if (ev.roles.includes('user')) {
      io.to('users').emit(NotificationEvent.NEW, ev);
    }
    if (ev.roles.includes('team') && ev.teamId) {
      io.to(`team-${ev.teamId}`).emit(NotificationEvent.NEW, ev);
    }
  });
};

export { generateAndEmitNotifications };
