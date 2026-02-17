
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Service Role Key in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  const dummyUser = {
    id: 'user_dummy_' + Date.now(), // Simulating a Clerk ID
    email: 'dummy@test.com',
    created_at: new Date().toISOString(),
  };

const fs = require('fs');

  console.log('Attempting to insert:', dummyUser);

  const { data, error } = await supabase.from('users').insert(dummyUser).select();

  if (error) {
    const msg = 'Insert Error Full Object: ' + JSON.stringify(error, null, 2);
    console.error(msg);
    fs.writeFileSync('debug-output.txt', msg);
  } else {
    const msg = 'Insert Success: ' + JSON.stringify(data, null, 2);
    console.log(msg);
    fs.writeFileSync('debug-output.txt', msg);
  }
}

testInsert();
