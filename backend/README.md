# Project APEX — Backend Services

This is the enterprise-grade backend foundation for **Project APEX**, containing modular routes, structured logging, a dedicated PostgreSQL database, and integration queues for compilers.

---

## 🔑 Development Admin Account Credentials

For local development and testing, a default Admin account is automatically created during database seeding.

### Local Development Defaults:
*   **Email:** `admin@apex.domain`
*   **Username:** `admin`
*   **Plaintext Password:** `admin123`

### Custom Configuration:
To customize the admin credentials, override the environment parameters in your `.env` file before executing seeds:
```ini
ADMIN_EMAIL=custom-admin@apex.domain
ADMIN_USERNAME=custom-admin
ADMIN_PASSWORD=custom_secure_password
```

> ⚠️ **SECURITY WARNING:** The default credentials are intended for local development environments only. Never commit production secrets or expose the default `admin123` password in production environments.

---

## 🛠️ Local Development Quickstart

### 1. Database Setup
Ensure your PostgreSQL container is active. Start a dedicated APEX database container:
```bash
docker run --name apex-postgres -e POSTGRES_USER=apex_user -e POSTGRES_PASSWORD=apex_password -e POSTGRES_DB=apex_db -p 5433:5432 -d postgres:16
```

### 2. Environment Configurations
Configure connection strings inside `.env` referencing the port `5433`:
```ini
DATABASE_URL=postgresql://apex_user:apex_password@localhost:5433/apex_db?schema=public
```

### 3. Database Migration & Seeding
Execute migrations and seed default languages and admin accounts:
```bash
# Apply schema changes and generate client types
npx prisma migrate dev --name init_database

# Run seeding script (idempotent upsert)
npx prisma db seed
```
