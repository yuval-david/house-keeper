import { Client } from 'pg';

export default async function executeQuery({ query, values }: { query: string; values?: any[] }) {
  // Create a new client instance
  const client = new Client({
    host: 'ep-silent-wave-70384248.us-east-1.postgres.vercel-storage.com',
    database: 'verceldb',
    user: 'default',
    password: 'ikNM84ScHITV',
    port: 5432, // Default port for PostgreSQL, change if necessary
    ssl: true
  });

  // Connect to the database
  await client.connect();

  try {
    // Execute the query and retrieve the data
    console.log(query, values)
    const { rows } = await client.query(query, values);

    // End the database connection
    await client.end();

    return rows;
  } catch (error) {
    // End the database connection in case of an error
    await client.end();

    return { error };
  }
}
