const { app } = require('@azure/functions');
const { MongoClient, ObjectId } = require('mongodb');
const uri = process.env.AZURE_MONGO_DB;
const client = new MongoClient(uri);

const connectDb = async () => {
    await client.connect();
    return client.db('FoodieMateDB').collection('UserShoppingLists');
};

// Get all shopping list items
app.http('getShoppingList', {
    methods: ['GET'],
    authLevel: 'function',
    route: 'shopping-list',
    handler: async (request, context) => {
        const userId = request.headers['x-ms-client-principal-id'];
        const collection = await connectDb();
        const items = await collection.find({ userId }).toArray();
        await client.close();
        return {
            status: 200,
            jsonBody: items
        };
    }
});

// Add a new item to the shopping list
app.http('addShoppingListItem', {
    methods: ['POST'],
    authLevel: 'function',
    route: 'shopping-list',
    handler: async (request, context) => {
        const userId = request.headers['x-ms-client-principal-id'];
        const { item, quantity } = await request.json();
        const collection = await connectDb();
        const result = await collection.insertOne({ userId, item, quantity });
        await client.close();
        return {
            status: 201,
            jsonBody: { _id: result.insertedId, item, quantity }
        };
    }
});

// Update an existing shopping list item 
app.http('updateShoppingListItem', {
    methods: ['PUT'],
    authLevel: 'function', 
    route: 'shopping-list/{id}',
    handler: async (request, context) => {
        const userId = request.headers['x-ms-client-principal-id'];
        const { id } = request.params;
        const { item, quantity } = await request.json();
        const collection = await connectDb();
        const result = await collection.updateOne(
            { _id: new ObjectId(id), userId }, 
            { $set: { item, quantity } }
        );
        await client.close();
        return {
            status: result.matchedCount > 0 ? 200 : 404,
            jsonBody: { message: 'Updated successfully' }
        };
    }
});


// Delete a shopping list item
app.http('deleteShoppingListItem', {
    methods: ['DELETE'],
    authLevel: 'function',  
    route: 'shopping-list/{id}',
    handler: async (request, context) => {
        const userId = request.headers['x-ms-client-principal-id'];
        const { id } = request.params;
        const collection = await connectDb();
        const result = await collection.deleteOne(
            { _id: new ObjectId(id), userId }  
        );
        await client.close();
        return {
            status: result.deletedCount > 0 ? 200 : 404,
            jsonBody: { message: 'Deleted successfully' }
        };
    }
});
