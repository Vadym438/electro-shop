require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcryptjs');

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg(connectionString);
const db = new PrismaClient({ adapter });

async function main(){
  const email = `localtest+${Date.now()}@example.com`;
  const password = 'pass1234';
  const name = 'Local Test';

  const hashed = await bcrypt.hash(password, 10);

  try{
    const user = await db.user.create({ data: { email, password: hashed, name } });
    console.log('Created user:', { id: user.id, email: user.email, name: user.name });

    // Verify password check
    const found = await db.user.findUnique({ where: { email } });
    const ok = await bcrypt.compare(password, found.password);
    console.log('Password verification result:', ok);
  }catch(e){
    console.error('Error:', e.message);
  }finally{
    await db.$disconnect();
  }
}

main();
