const fs = require('fs');

fs.writeFileSync('./.env', `GOOGLE_MAPS_API_KEY=${process.env.GOOGLE_MAPS_API_KEY}\nMAPBOX_ACCESS_TOKEN=${process.env.MAPBOX_ACCESS_TOKEN}\n`);
