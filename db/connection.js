import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const client = new MongoClient(process.env.MONGO_URL || 'mongodb://localhost:27017');
let db;

async function connect() {
    await client.connect();
    db = client.db('carRental');
    console.log('Connected to MongoDB');
}

export { db, connect };