/* * RUN WITH: node src/config/db-seed.js
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// --- 1. CONFIGURATION ---
const MONGO_URI = 'mongodb://root:pithub@localhost:27017/pithub?authSource=admin';

// --- 2. SCHEMAS (Strictly matching your provided definitions) ---

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    name_slug: { type: String },
    full_name: { type: String, required: true },
    joined_year: { type: Number, required: true },
    nationality: { type: String, required: true },
    headquarters: { type: String },
    team_principal: { type: String }
});

const driverSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    dob: { type: Number, required: true, min: 1901, max: 2026 }, // Year of birth
    nationality: { type: String, required: true },
    height: { type: Number },
    weight: { type: Number },
    number: { type: Number, required: true},
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
});

const carSchema = new mongoose.Schema({
    model: { type: String, required: true },
    engine_manufacturer: { type: String, required: true },
    base_weight_kg: { type: Number, default: 798 },
    fuel_capacity_kg: { type: Number, default: 110 },
    specs: {
        max_speed_kmh: { type: Number, default: 340 },
        acceleration_0_100_s: { type: Number, default: 2.5 },
        downforce_rating: { type: Number, min: 0, max: 100 },
        reliability_rating: { type: Number, min: 0, max: 100 }
    },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' } // <--- The only addition
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    email: {type: String, required: true, unique: true, lowercase: true, trim: true},
    password: {type: String, required: true, minlength: 6, select: false},
    role: {type: String, enum: ['user', 'admin', 'team'], default: 'user'},
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
});

teamSchema.pre('save', async function() {
    if (this.isModified('name')) {
        this.name_slug = this.name.toLowerCase().replace(/\s+/g, '');
    }
});

// --- 3. MODELS ---
const Team = mongoose.model('Team', teamSchema);
const Driver = mongoose.model('Driver', driverSchema);
const Car = mongoose.model('Car', carSchema);
const User = mongoose.model('User', userSchema);

// --- 4. DATA (2026 Grid - 11 Teams, 22 Cars) ---
const gridData = [
    {
        // Ferrari
        team: { name: 'Ferrari', full_name: 'Scuderia Ferrari HP', joined_year: 1950, nationality: 'Italian', headquarters: 'Maranello', team_principal: 'Frédéric Vasseur' },
        car: { model: 'SF-26', engine: 'Ferrari' },
        drivers: [
            { full_name: 'Charles Leclerc', number: 16, dob: 1997, nationality: 'Monegasque', height: 180, weight: 69 },
            { full_name: 'Lewis Hamilton', number: 44, dob: 1985, nationality: 'British', height: 174, weight: 73 }
        ],
        perf: { speed: 350, accel: 2.3, down: 96, rel: 92 }
    },
    {
        // Red Bull
        team: { name: 'Red Bull', full_name: 'Oracle Red Bull Racing', joined_year: 2005, nationality: 'Austrian', headquarters: 'Milton Keynes', team_principal: 'Christian Horner' },
        car: { model: 'RB22', engine: 'Red Bull-Ford' },
        drivers: [
            { full_name: 'Max Verstappen', number: 1, dob: 1997, nationality: 'Dutch', height: 181, weight: 72 },
            { full_name: 'Liam Lawson', number: 30, dob: 2002, nationality: 'New Zealander', height: 174, weight: 68 }
        ],
        perf: { speed: 348, accel: 2.3, down: 97, rel: 89 }
    },
    {
        // McLaren
        team: { name: 'McLaren', full_name: 'McLaren Formula 1 Team', joined_year: 1966, nationality: 'British', headquarters: 'Woking', team_principal: 'Andrea Stella' },
        car: { model: 'MCL40', engine: 'Mercedes' },
        drivers: [
            { full_name: 'Lando Norris', number: 4, dob: 1999, nationality: 'British', height: 170, weight: 68 },
            { full_name: 'Oscar Piastri', number: 81, dob: 2001, nationality: 'Australian', height: 178, weight: 68 }
        ],
        perf: { speed: 349, accel: 2.35, down: 95, rel: 94 }
    },
    {
        // Mercedes
        team: { name: 'Mercedes', full_name: 'Mercedes-AMG PETRONAS F1 Team', joined_year: 2010, nationality: 'German', headquarters: 'Brackley', team_principal: 'Toto Wolff' },
        car: { model: 'W17', engine: 'Mercedes' },
        drivers: [
            { full_name: 'George Russell', number: 63, dob: 1998, nationality: 'British', height: 185, weight: 70 },
            { full_name: 'Kimi Antonelli', number: 12, dob: 2006, nationality: 'Italian', height: 172, weight: 65 }
        ],
        perf: { speed: 352, accel: 2.3, down: 93, rel: 95 }
    },
    {
        // Aston Martin
        team: { name: 'Aston Martin', full_name: 'Aston Martin Aramco F1 Team', joined_year: 2021, nationality: 'British', headquarters: 'Silverstone', team_principal: 'Mike Krack' },
        car: { model: 'AMR26', engine: 'Honda' },
        drivers: [
            { full_name: 'Fernando Alonso', number: 14, dob: 1981, nationality: 'Spanish', height: 171, weight: 68 },
            { full_name: 'Lance Stroll', number: 18, dob: 1998, nationality: 'Canadian', height: 182, weight: 70 }
        ],
        perf: { speed: 345, accel: 2.4, down: 90, rel: 91 }
    },
    {
        // Alpine
        team: { name: 'Alpine', full_name: 'BWT Alpine F1 Team', joined_year: 1986, nationality: 'French', headquarters: 'Enstone', team_principal: 'Oliver Oakes' },
        car: { model: 'A526', engine: 'Mercedes' },
        drivers: [
            { full_name: 'Pierre Gasly', number: 10, dob: 1996, nationality: 'French', height: 177, weight: 70 },
            { full_name: 'Jack Doohan', number: 7, dob: 2003, nationality: 'Australian', height: 176, weight: 69 }
        ],
        perf: { speed: 340, accel: 2.5, down: 85, rel: 80 }
    },
    {
        // Williams
        team: { name: 'Williams', full_name: 'Williams Racing', joined_year: 1977, nationality: 'British', headquarters: 'Grove', team_principal: 'James Vowles' },
        car: { model: 'FW48', engine: 'Mercedes' },
        drivers: [
            { full_name: 'Alex Albon', number: 23, dob: 1996, nationality: 'Thai', height: 186, weight: 73 },
            { full_name: 'Carlos Sainz', number: 55, dob: 1994, nationality: 'Spanish', height: 178, weight: 66 }
        ],
        perf: { speed: 346, accel: 2.45, down: 86, rel: 88 }
    },
    {
        // Audi (Kick Sauber)
        team: { name: 'Audi', full_name: 'Audi F1 Team', joined_year: 2026, nationality: 'German', headquarters: 'Neuburg', team_principal: 'Mattia Binotto' },
        car: { model: 'E-Tron F1', engine: 'Audi' },
        drivers: [
            { full_name: 'Nico Hulkenberg', number: 27, dob: 1987, nationality: 'German', height: 184, weight: 78 },
            { full_name: 'Gabriel Bortoleto', number: 5, dob: 2004, nationality: 'Brazilian', height: 175, weight: 68 }
        ],
        perf: { speed: 342, accel: 2.5, down: 84, rel: 78 }
    },
    {
        // VCARB
        team: { name: 'VCARB', full_name: 'Visa Cash App RB F1 Team', joined_year: 2006, nationality: 'Italian', headquarters: 'Faenza', team_principal: 'Laurent Mekies' },
        car: { model: 'VCARB 03', engine: 'Red Bull-Ford' },
        drivers: [
            { full_name: 'Yuki Tsunoda', number: 22, dob: 2000, nationality: 'Japanese', height: 159, weight: 54 },
            { full_name: 'Isack Hadjar', number: 6, dob: 2004, nationality: 'French', height: 174, weight: 65 }
        ],
        perf: { speed: 341, accel: 2.4, down: 87, rel: 89 }
    },
    {
        // Haas
        team: { name: 'Haas', full_name: 'MoneyGram Haas F1 Team', joined_year: 2016, nationality: 'American', headquarters: 'Kannapolis', team_principal: 'Ayao Komatsu' },
        car: { model: 'VF-26', engine: 'Ferrari' },
        drivers: [
            { full_name: 'Esteban Ocon', number: 31, dob: 1996, nationality: 'French', height: 186, weight: 66 },
            { full_name: 'Oliver Bearman', number: 87, dob: 2005, nationality: 'British', height: 184, weight: 70 }
        ],
        perf: { speed: 344, accel: 2.5, down: 83, rel: 85 }
    },
    {
        // Cadillac (11th Team)
        team: { name: 'Cadillac', full_name: 'Cadillac Andretti F1 Team', joined_year: 2026, nationality: 'American', headquarters: 'Fishers', team_principal: 'Michael Andretti' },
        car: { model: 'V-Series.R', engine: 'Cadillac' },
        drivers: [
            { full_name: 'Colton Herta', number: 26, dob: 2000, nationality: 'American', height: 176, weight: 69 },
            { full_name: 'Valtteri Bottas', number: 77, dob: 1989, nationality: 'Finnish', height: 173, weight: 69 }
        ],
        perf: { speed: 340, accel: 2.55, down: 82, rel: 80 }
    }
];


// --- 5. EXECUTION ---
const seedDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('Connected.');

        await Car.deleteMany({});
        await Driver.deleteMany({});
        await Team.deleteMany({});
        await User.deleteMany({});
        console.log('Database cleared.');

        let totalTeams = 0, totalDrivers = 0, totalCars = 0, totalUsers = 0;

        const admin = {
            name: 'Admin',
            email: 'admin@f1.com',
            password: await bcrypt.hash('password', 10),
            role: 'admin'
        };

        await User.create(admin);
        for (const data of gridData) {
            // 1. Create Team
            const team = await Team.create(data.team);
            totalTeams++;

            // Logic: Convert "Toto Wolff" -> "toto.wolff@pithub.com"
            const principalEmail = data.team.team_principal.toLowerCase().replace(/\s+/g, '.') + '@pithub.com';
            const principalName = data.team.team_principal;
            
            const teamPassword = await bcrypt.hash(data.team.name.toLowerCase().replaceAll(' ', '').concat(data.team.joined_year.toString()),10);

            await User.create({
                name: principalName,
                email: principalEmail,
                password: teamPassword,
                role: 'team',
                team: team._id // Connect User to Team ID
            });
            totalUsers++;

            // 2. Loop Drivers
            for (const driverInfo of data.drivers) {

                // Create Driver linked to Team
                const driver = await Driver.create({
                    ...driverInfo, // full_name, dob, nationality, height, weight
                    team: team._id
                });
                totalDrivers++;

                // Create Car linked to Team AND Driver
                await Car.create({
                    model: data.car.model,
                    engine_manufacturer: data.car.engine,
                    team: team._id,
                    driver: driver._id,
                    // Use default weights from Schema, set specific specs
                    specs: {
                        max_speed_kmh: data.perf.speed,
                        acceleration_0_100_s: data.perf.accel,
                        downforce_rating: data.perf.down,
                        reliability_rating: data.perf.rel
                    }
                });
                totalCars++;
            }
        }
        console.log(`\nReady.`);
        console.log(`Stats: ${totalTeams} Teams | ${totalDrivers} Drivers | ${totalCars} Cars | ${totalUsers} Users`);
        mongoose.connection.close();

    } catch (err) {
        console.error('Error:', err);
    }
};

seedDB();