const mongoose = require('mongoose');
const URI = 'mongodb://127.0.0.1:27017/aabha_impex';

async function test() {
    try {
        console.log('Connecting to', URI);
        await mongoose.connect(URI, { serverSelectionTimeoutMS: 5000 });
        console.log('Connected!');
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

test();
