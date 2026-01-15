
# CrimeGuard Karachi Architecture

## 1. System Design
- **Frontend**: React + Tailwind (SPA).
- **API Gateway**: Nginx for SSL termination and rate limiting.
- **Backend Service**: Node.js Express.
- **Real-time Engine**: Socket.io for broadcast alerts to users within specific Geo-hashes.
- **Database**: PostgreSQL with PostGIS extension for optimized spatial queries.
- **Encryption**: AES-256 for storing sensitive descriptions, with separate keys for each user's device.

## 2. Database Schema (PostgreSQL)

```sql
-- Enable PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- Users Table (Stored Anonymously)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_hash TEXT UNIQUE NOT NULL, -- Hashed hardware ID
    trust_score DECIMAL DEFAULT 1.0,  -- Verification level
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Incidents Table
CREATE TABLE incidents (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    description_encrypted TEXT, -- Encrypted at Rest
    location GEOGRAPHY(Point, 4326) NOT NULL, -- PostGIS Spatial Data
    fuzzed_location GEOGRAPHY(Point, 4326),   -- For public display
    reported_by UUID REFERENCES users(id),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Geospatial Index for Fast Queries
CREATE INDEX incidents_geo_idx ON incidents USING GIST (location);
```

## 3. Backend Implementation Snippets (Node.js/Express)

### POST /report
```javascript
app.post('/api/report', async (req, res) => {
    const { type, description, lat, lng, deviceId } = req.body;
    
    // 1. Privacy Masking: Fuzz location by ~50m
    const fuzzedLat = lat + (Math.random() - 0.5) * 0.0008;
    const fuzzedLng = lng + (Math.random() - 0.5) * 0.0008;

    // 2. Security: Rate Limiting check per deviceId
    // 3. Database Insert
    const query = `
        INSERT INTO incidents (type, description_encrypted, location, fuzzed_location) 
        VALUES ($1, $2, ST_MakePoint($3, $4), ST_MakePoint($5, $6))
        RETURNING *;
    `;
    // ... execution
});
```

### GET /incidents-nearby
```javascript
app.get('/api/incidents-nearby', async (req, res) => {
    const { lat, lng, radius_km = 5 } = req.query;
    
    const query = `
        SELECT id, type, created_at, 
        ST_AsText(fuzzed_location) as location 
        FROM incidents 
        WHERE ST_DWithin(location, ST_MakePoint($1, $2)::geography, $3 * 1000)
        ORDER BY created_at DESC;
    `;
    // ... execution
});
```

## 4. Deployment Guide (AWS)
1. **EC2/ECS**: Host the Node.js application. Use an ALB (Application Load Balancer) to handle traffic.
2. **RDS (PostgreSQL)**: Use Managed RDS with Multi-AZ for high availability.
3. **ElastiCache (Redis)**: For real-time user-location-to-geohash mapping and rate limiting.
4. **WAF (Web Application Firewall)**: Protect against SQLi, XSS, and DDoS.
5. **AWS Secrets Manager**: Store API keys and encryption master keys.
6. **CloudFront**: Edge caching for the React frontend and map assets to speed up loading on mobile data in Karachi.
