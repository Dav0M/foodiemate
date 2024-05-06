const { app } = require('@azure/functions');
const { MongoClient, ObjectId } = require('mongodb');
const uri = process.env.AZURE_MONGO_DB;
const client = new MongoClient(uri);

const connectDb = async (collection) => {
    await client.connect();
    return client.db('FoodieMateDB').collection(collection);
};

const connectRecipes = async () => {
    await client.connect();
    return client.db('FoodieMateDB').collection('recipes');
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

        const collection = await connectDb('UserShoppingLists');
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
        const collection = await connectDb('UserShoppingLists');
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
        const collection = await connectDb('UserShoppingLists');
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
        const collection = await connectDb('UserShoppingLists');
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
            const user = await request.headers['x-ms-client-principal-id'];
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
        const headers = Object.fromEntries(request.headers.entries())['x-ms-client-principal'];
        let token = null
        token = Buffer.from(headers, "base64");
        token = JSON.parse(token.toString());
        const userId = token.userId

        try {
            const recipe = await request.json();
            recipe['userId'] = userId
            const collection = await connectDb('recipes');

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

            const collection = await connectDb('recipes');
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
            const collection = await connectDb('mealplans');

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

            const collection = await connectDb('mealplans');
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

// get all recipes in the "recipes" collection
app.http('getRecipes', {
    methods: ['GET'],
    authLevel: 'function',
    route: 'recipes',
    handler: async (request, context) => {
        const headers = Object.fromEntries(request.headers.entries())['x-ms-client-principal'];
        let token = null
        token = Buffer.from(headers, "base64");
        token = JSON.parse(token.toString());
        const userId = token.userId

        const collection = await connectRecipes();
        const recipes = await collection.find({ userId }).toArray();

        await client.close();
        return {
            status: 200,
            jsonBody: { data: recipes }
        };
    }
});

// get one single recipe from the "recipes" collection for the About Recipe Page
app.http('getOneRecipe', {
    methods: ['GET'],
    authLevel: 'function',
    route: 'recipe/{id}',
    handler: async (request, context) => {
        const headers = Object.fromEntries(request.headers.entries())['x-ms-client-principal'];
        let token = null
        token = Buffer.from(headers, "base64");
        token = JSON.parse(token.toString());
        const userId = token.userId;
        const recipeId = request.params.id;

        // const body = await request.json();
        // const recipeId = body.recipeId ?? request.params.id;

        const collection = await connectRecipes();
        const recipe = await collection.findOne({ _id: new ObjectId(recipeId), userId: userId });

        await client.close();
        return {
            status: 200,
            jsonBody: recipe
        };
    },
});

// get all Tags of recipes
app.http('getTags', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'tags',
    handler: async (request, context) => {
        const headers = Object.fromEntries(request.headers.entries())['x-ms-client-principal'];
        let token = null
        token = Buffer.from(headers, "base64");
        token = JSON.parse(token.toString());
        const userId = token.userId

        const collection = await connectDb('tags');
        const tags = await collection.find({ deleted: false }).toArray();

        await client.close();
        return {
            status: 200,
            jsonBody: { data: tags }
        };
    }
});


app.http('searchRecipes', {
    methods: ['GET'],
    authLevel: 'function',
    handler: async (request, context) => {
        const headers = Object.fromEntries(request.headers.entries())['x-ms-client-principal'];
        let token = null
        token = Buffer.from(headers, "base64");
        token = JSON.parse(token.toString());
        const userId = token.userId;

        const query = request.query.q || '';
        const collection = await connectRecipes();
        const filter = { userId: userId };
        if (query) {
            filter.name = { $regex: query, $options: 'i' }; // Use regex for case-insensitive partial matching
        }
        const recipes = await collection.find(filter).toArray();

        await client.close(); // Make sure the connection is managed correctly
        return {
            status: 200,
            jsonBody: { data: recipes }
        };  
    }
});