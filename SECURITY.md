# Security Policy

## 🛡️ Supported Versions

We actively provide security updates and patches for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

---

## 🚨 Reporting a Vulnerability

The safety of our users, students, and contributors is a top priority. If you believe you have discovered a security vulnerability in this project, please report it responsibly:

1. **Do NOT open a public GitHub issue** describing the vulnerability.
2. Email your findings directly to **sayanawari9@gmail.com** with the subject line [SECURITY VULNERABILITY] bca-department-website.
3. Include detailed steps to reproduce the vulnerability, including sample payloads, affected endpoints, or screenshots.

### Response Timeline
* **Initial Acknowledgement:** Within 24-48 hours.
* **Triage & Assessment:** Within 3-5 business days.
* **Patch & Disclosure:** A fix will be committed and released promptly following remediation.

---

## 🔒 Security Best Practices Implemented
* **Secret Isolation:** Zero credentials, API keys, or private secrets committed to version control.
* **Input Validation:** Strict runtime schema validation powered by Zod.
* **Authentication:** Strong password hashing with bcrypt (10 rounds) and short-lived JWT access tokens with refresh token rotation.
* **Network Defense:** Explicit CORS origin controls, HTTP security headers powered by Helmet, and rate limiting guards.
