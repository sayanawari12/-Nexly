/**
 * NEXLY SQL Sandbox Security Service
 * Isolated read-only database querying with 2000ms timeout enforcement
 * and row-set matrix comparison validation.
 */

// Seeded read-only sandbox database schemas
export const SEEDED_DATABASES = {
  students: {
    name: 'Students & Grades DB',
    tables: ['students', 'courses', 'enrollments'],
    schemaDiagram: `
    +-------------------+      +-------------------+
    |    STUDENTS       |      |     COURSES       |
    +-------------------+      +-------------------+
    | id (INT)          |      | id (INT)          |
    | name (VARCHAR)    |      | title (VARCHAR)   |
    | grade (VARCHAR)   |      | credits (INT)     |
    | gpa (DECIMAL)     |      +-------------------+
    +-------------------+
    `,
    mockData: {
      students: [
        { id: 1, name: 'Alice Smith', grade: 'A', gpa: 3.9 },
        { id: 2, name: 'Bob Johnson', grade: 'B', gpa: 3.2 },
        { id: 3, name: 'Charlie Brown', grade: 'A', gpa: 3.8 },
        { id: 4, name: 'Diana Prince', grade: 'C', gpa: 2.7 }
      ]
    }
  },
  ecommerce: {
    name: 'E-Commerce Store DB',
    tables: ['products', 'orders', 'customers'],
    schemaDiagram: `
    +-------------------+      +-------------------+
    |    PRODUCTS       |      |     ORDERS        |
    +-------------------+      +-------------------+
    | id (INT)          |      | id (INT)          |
    | name (VARCHAR)    |      | customer_id (INT) |
    | price (DECIMAL)   |      | amount (DECIMAL)  |
    +-------------------+      +-------------------+
    `,
    mockData: {
      products: [
        { id: 101, name: 'Wireless Keyboard', price: 49.99 },
        { id: 102, name: 'Gaming Mouse', price: 29.99 },
        { id: 103, name: 'HD Monitor', price: 199.99 }
      ]
    }
  }
};

/**
 * Runs a SQL query against isolated read-only sandbox DB with 2000ms timeout
 * @param {string} query - SQL query string
 * @param {string} [dbName='students'] - Database schema name
 * @returns {Promise<{ success: boolean, columns: string[], rows: Array<Object>, executionTimeMs: number, error?: string }>}
 */
export const executeSqlQuery = async (query, dbName = 'students') => {
  const startTime = performance.now();
  const db = SEEDED_DATABASES[dbName] || SEEDED_DATABASES.students;

  return new Promise((resolve) => {
    // 2000ms query timeout limit
    const timeout = setTimeout(() => {
      resolve({
        success: false,
        columns: [],
        rows: [],
        executionTimeMs: 2000,
        error: 'SQL Query Timeout Exceeded (max 2000ms allowed).'
      });
    }, 2000);

    try {
      const cleanQuery = (query || '').trim().toLowerCase();

      // Security check: Reject write/drop/alter statements on read-only session
      if (cleanQuery.includes('drop ') || cleanQuery.includes('delete ') || cleanQuery.includes('update ') || cleanQuery.includes('alter ') || cleanQuery.includes('truncate ')) {
        clearTimeout(timeout);
        return resolve({
          success: false,
          columns: [],
          rows: [],
          executionTimeMs: 0,
          error: 'Security Error: Write/Modify statements are blocked in read-only sandbox sessions.'
        });
      }

      // Simple mock execution engine for demonstration
      let rows = db.mockData.students;
      if (cleanQuery.includes('grade = "a"') || cleanQuery.includes("grade = 'a'")) {
        rows = rows.filter(s => s.grade === 'A');
      }

      const columns = rows.length > 0 ? Object.keys(rows[0]) : ['id', 'name', 'grade', 'gpa'];
      const executionTimeMs = Math.round(performance.now() - startTime);

      clearTimeout(timeout);
      resolve({
        success: true,
        columns,
        rows,
        executionTimeMs
      });
    } catch (e) {
      clearTimeout(timeout);
      resolve({
        success: false,
        columns: [],
        rows: [],
        executionTimeMs: 0,
        error: `SQL Syntax Error: ${e.message}`
      });
    }
  });
};

/**
 * Validates user SQL submission by comparing resulting row-set matrix against expected row-set matrix
 * (Prevents correct-but-differently-formatted SQL queries from wrongly failing)
 * @param {Array<Object>} actualRows 
 * @param {Array<Object>} expectedRows 
 * @returns {boolean}
 */
export const validateRowSetMatch = (actualRows, expectedRows) => {
  if (!Array.isArray(actualRows) || !Array.isArray(expectedRows)) return false;
  if (actualRows.length !== expectedRows.length) return false;

  // Normalize JSON string representations for matrix comparison
  const normalize = (arr) => arr.map(obj => JSON.stringify(obj)).sort().join('|');
  return normalize(actualRows) === normalize(expectedRows);
};
