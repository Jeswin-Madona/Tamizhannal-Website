import https from 'https';

const SUPABASE_URL = 'https://mprurexzonwfqlsarned.supabase.co';

function checkUrlHttps(path) {
  return new Promise((resolve) => {
    const fullUrl = `${SUPABASE_URL}/storage/v1/object/public/Books/${path}`;
    const req = https.request(fullUrl, { method: 'HEAD' }, (res) => {
      console.log(`[${res.statusCode}] Books/${path} => ${res.statusCode === 200 ? 'EXISTS' : 'STATUS ' + res.statusCode}`);
      resolve(res.statusCode === 200);
    });
    req.on('error', (err) => {
      console.log(`[ERR] Books/${path}:`, err.message);
      resolve(false);
    });
    req.end();
  });
}

async function main() {
  console.log('Testing Supabase Storage Bucket "Books" via HTTPS HEAD...\n');
  await checkUrlHttps('Audio/pazhagu-thamizh-arivom.mp3');
  await checkUrlHttps('Images/Coverpage/fp1.jpg');
  await checkUrlHttps('Images/Coverpage/Parisil Vaazkkai.jpg');
  await checkUrlHttps('Images/Coverpage/parisil-vaazhkkai.jpg');
  await checkUrlHttps('Images/Coverpage/Parisil%20Vaazkkai.jpg');
  await checkUrlHttps('Images/Gallery/Aarambakaala vaazhvu1.jpg');
  await checkUrlHttps('Images/Gallery/America payanam1.jpg');
  await checkUrlHttps('Images/Remembrance/Remembrance1.jpg');
  await checkUrlHttps('Book/Ilakkiyam/Parisil Vaazkkai.pdf');
  await checkUrlHttps('Book/Ilakkiyam/parisil-vaazhkkai.pdf');
}

main();
