import User from '../models/user.js';
import { sendToUser } from '../config/sse.js';
import Car from '../models/car.js';

let lastRun = 0;

export async function generateNotifications(cars) {
  const now = Date.now();
  if (now - lastRun < 5000) return;
  lastRun = now;

  if (!Array.isArray(cars) || cars.length === 0) {
    console.log('[NOTIFY] cars non è array o vuoto:', cars);
    return;
  }

  const carIds = cars.map(c => c._id);
  const populatedCars = await Car.find({ _id: { $in: carIds } })
    .populate('driver', 'full_name')
    .lean();

  const driverMap = new Map(populatedCars.map(c => [
    c._id.toString(),
    c.driver?.full_name || 'Unknown'
  ]));

  const events = [];

  cars.forEach(car => {
    const driverName = driverMap.get(car._id.toString()) || car.model;

    // Lap completed
    if (car.oldProgress > 90 && car.progress < 10) {
      events.push({
        type: 'lap_completed',
        message: `Lap completed - ${driverName}`,
        carId: car._id.toString()
      });
    }

    // Pit stop
    if (Math.random() < 0.08) {
      const tireChange = Math.random() < 0.8 ? 'new tires' : 'no tire change';
      events.push({
        type: 'pit_stop',
        message: `${driverName} in pits - ${tireChange}`,
        carId: car._id.toString()
      });
    }

    // Overtake
    if (Math.random() < 0.12) {
      events.push({
        type: 'overtake',
        message: `Overtake from ${driverName}`,
        carId: car._id.toString()
      });
    }

    // Mechanical failure
    if (Math.random() < 0.05) {
      events.push({
        type: 'mechanical_failure',
        message: `Mechanical failure on ${driverName}`,
        carId: car._id.toString()
      });
    }

    // Low fuel
    if (car.fuel_level < 20) {
      events.push({
        type: 'low_fuel',
        message: `Low fuel - ${driverName} (${car.fuel_level || '?'} kg)`,
        carId: car._id.toString()
      });
    }

    // Incident + escalation
    if (Math.random() < 0.1) {
      events.push({
        type: 'incident',
        message: `Incident - ${driverName}`,
        carId: car._id.toString()
      });

      if (Math.random() < 0.5) {
        if (Math.random() < 0.7) {
          events.push({
            type: 'safety_car',
            message: 'Safety Car on track',
            carId: car._id.toString()
          });
        } else {
          events.push({
            type: 'red_flag',
            message: 'Red Flag',
            carId: car._id.toString()
          });
        }
      }
    }
  });

  if (events.length === 0) return;

  console.log('[NOTIF] Generated events:', events);

  const users = await User.find().lean().select('_id role team');

  users.forEach(user => {
    const relevant = events.filter(ev => {
      if (user.role === 'admin') return true;

      if (user.role === 'user') {
        return ['lap_completed', 'incident', 'safety_car', 'red_flag', 'pit_stop', 'overtake'].includes(ev.type);
      }

      if (user.role === 'team') {
        return ev.carId && cars.some(c => 
          c._id.toString() === ev.carId && 
          c.team?.toString() === user.team?.toString()
        );
      }

      return false;
    });

    if (relevant.length > 0) {
      relevant.forEach(ev => sendToUser(user._id.toString(), ev));
    }
  });
}