import { sendToUser } from '../config/sse.js';
import User from '../models/user.js';

let lastRun = 0;

export async function generateNotifications(cars) {
    const now = Date.now();
    if (now - lastRun < 5000) return;
    lastRun = now;

  if (!Array.isArray(cars) || cars.length === 0) {
    console.log('[NOTIFY] cars non è array o vuoto:', cars);
    return;
  }

  const events = [];
    cars.forEach(car => {
        if (car.oldProgress > 90 && car.progress < 10) {
            events.push({
                type: 'lap_completed',
                message: `Lap completed - ${car.model}`,
                carId: car._id.toString()
            });
        }

        // Pit stop / sosta ai box
        if (Math.random() < 0.08) {
            events.push({
                type: 'pit_stop',
                message: `${car.model} in pit lane`,
                carId: car._id.toString()
            });
        }

        // Overtake / sorpasso
        if (Math.random() < 0.12) {
            events.push({
                type: 'overtake',
                message: `Overtake from ${car.model}`,
                carId: car._id.toString()
            });
        }

        // Problema meccanico grave
        if (Math.random() < 0.05) {
            events.push({
                type: 'mechanical_failure',
                message: `Mechanical failure on ${car.model}`,
                carId: car._id.toString()
            });
        }

        // Low fuel (generale, ma legato a car)
        if (car.fuel_level < 20) {  // assumi che car abbia fuel_level o prendi da telemetry
            events.push({
                type: 'low_fuel',
                message: `Low fuel - ${car.model} (${car.fuel_level || '?'} kg)`,
                carId: car._id.toString()
            });
        }

        // Nel pit stop: specifica cambio gomme
        if (Math.random() < 0.08) {
            const tireChange = Math.random() < 0.8 ? 'new tires' : 'no tire change';
            events.push({
                type: 'pit_stop',
                message: `${car.model} in pits - ${tireChange}`,
                carId: car._id.toString()
            });
        }

        // incidente con possibile red flag o safety car
        if (Math.random() < 0.4) {
            if (Math.random() < 0.5) {
                events.push({ type: 'yellow_flag', message: 'Yellow Flag', carId: car._id.toString() });
            } else if (Math.random() < 0.7) {
                events.push({
                    type: 'safety_car',
                    message: 'Safety Car on track (Just an "inchident on the race" of ' + car.model + ')',
                    carId: car._id.toString()
                });
            } else {
                events.push({
                    type: 'red_flag',
                    message: 'Red Flag - (Just an "inchident on the race" of ' + car.model + ')',
                    carId: car._id.toString()
                });
            }
        }
    });

    if (events.length === 0) return;

  console.log('[NOTIF] Generated events:', events);  // ← aggiungi qui

    const users = await User.find().lean().select('_id role team');

    users.forEach(user => {
        const relevant = events.filter(ev => {
            if (user.role === 'admin') return true;
            if (user.role === 'user' && ev.type === 'lap_completed') return true;
            if (user.role === 'team' && user.team?.toString() === car.team?.toString()) return true;
            return false;
        });

    if (relevant.length > 0) {
      console.log(`[NOTIF] Sending to ${user.role} (${user._id}):`, relevant);
    }
    

        relevant.forEach(ev => sendToUser(user._id.toString(), ev));
    });
}