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
        const headers = Object.fromEntries(request.headers.entries())['x-ms-client-principal'];
        let token = null
        token = Buffer.from(headers, "base64");
        token = JSON.parse(token.toString());
        const userId = token.userId

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
        const headers = Object.fromEntries(request.headers.entries())['x-ms-client-principal'];
        let token = null
        token = Buffer.from(headers, "base64");
        token = JSON.parse(token.toString());
        const userId = token.userId

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
        const headers = Object.fromEntries(request.headers.entries())['x-ms-client-principal'];
        let token = null
        token = Buffer.from(headers, "base64");
        token = JSON.parse(token.toString());
        const userId = token.userId

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
        const headers = Object.fromEntries(request.headers.entries())['x-ms-client-principal'];
        let token = null
        token = Buffer.from(headers, "base64");
        token = JSON.parse(token.toString());
        const userId = token.userId

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



app.http('signupUser', {
    methods: ['POST'],
    authLevel: 'function',
    handler: async (request, context) => {
        try {
            const user = await request.json();
            const collection = await connectDb('Users');

            const result = await collection.insertOne(user);
            return { status: 201, jsonBody: result };
        } catch (error) {
            return { status: 500, body: error.message };
        } finally {
            await client.close();
        }
    }
});

app.http('createRecipe', {
    methods: ['POST'],
    authLevel: 'function',
    handler: async (request, context) => {
        try {
            const recipe = await request.json();
            const collection = await connectDb('Recipes');

            const result = await collection.insertOne(recipe);
            return { status: 201, jsonBody: result };
        } catch (error) {
            return { status: 500, body: error.message };
        } finally {
            await client.close();
        }
    }
});


app.http('editRecipe', {
    methods: ['PUT'],
    authLevel: 'function',
    handler: async (request, context) => {
        try {
            const recipeId = request.params.recipeId;
            const updates = await request.json();

            // Filter out empty fields
            const filteredUpdates = Object.fromEntries(
                Object.entries(updates).filter(([key, value]) => value)
            );

            const collection = await connectDb('Recipes');
            const result = await collection.updateOne(
                { _id: new ObjectId(recipeId) },
                { $set: filteredUpdates }
            );

            return { status: 200, jsonBody: result };
        } catch (error) {
            return { status: 500, body: error.message };
        } finally {
            await client.close();
        }
    }
});



app.http('addMealPlan', {
    methods: ['POST'],
    authLevel: 'function',
    handler: async (request, context) => {
        try {
            const mealPlan = await request.json();
            const collection = await connectDb('MealPlans');

            const result = await collection.insertOne(mealPlan);
            return { status: 201, jsonBody: result };
        } catch (error) {
            return { status: 500, body: error.message };
        } finally {
            await client.close();
        }
    }
});


app.http('editMealPlan', {
    methods: ['PUT'],
    authLevel: 'function',
    handler: async (request, context) => {
        try {
            const mealPlanId = request.params.mealPlanId;
            const updates = await request.json();

            // Filter out empty fields
            const filteredUpdates = Object.fromEntries(
                Object.entries(updates).filter(([key, value]) => value)
            );

            const collection = await connectDb('MealPlans');
            const result = await collection.updateOne(
                { _id: new ObjectId(mealPlanId) },
                { $set: filteredUpdates }
            );

            return { status: 200, jsonBody: result };
        } catch (error) {
            return { status: 500, body: error.message };
        } finally {
            await client.close();
        }
    }
});