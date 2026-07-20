# Copy this file to .env and fill in the connection details for your
# EXISTING Postgres server. This file stays on the server; never put
# these values in the HTML or share them.

# Option A: one connection string (use this if that's what you were given)
# DATABASE_URL=postgres://username:password@host:5432/databasename

# Option B: separate pieces
PGHOST=your-postgres-host-or-ip
PGPORT=5432
PGUSER=your-username
PGPASSWORD=your-password
PGDATABASE=your-database-name

# If your Postgres requires SSL connections, uncomment this line:
# PGSSL=require
