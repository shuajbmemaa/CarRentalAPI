import { db } from '../db/rent.js';
import { ObjectId } from 'mongodb';

export const genericRepository = {

    create: async (collection, data) => {
        return await db.collection(collection).insertOne(data);
    },

    updateById: async (collection, id, data) => {
        return await db.collection(collection).updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );
    },

    deleteById: async (collection, id) => {
        return await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
    },

    findById: async (collection, id, projection = {}) => {
        return await db.collection(collection).findOne({ _id: new ObjectId(id) }, { projection });
    },

    findAll: async (collection, filter = {}, sort = {}) => {
        return await db.collection(collection).find(filter).sort(sort).toArray();
    },

    findOne: async (collection, filter) => {
        return await db.collection(collection).findOne(filter);
    }
};