import connectToDatabase from '@/lib/db';

export async function GET(request) {
    try {
        await connectToDatabase(); // Connect to the database
        return new Response(JSON.stringify({ 
            text:'hello',
            description:'this is mongo db server alt'
         }), { status: 200, });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Database connection failed', error: error.message }), {
            status: 500,
        });
    }
}