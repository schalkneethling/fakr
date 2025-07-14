# fakr

A simple REST-based service for generating fake data. Perfect for testing, prototyping, and development when you need realistic sample data.

## Live Demo

🌐 **Production URL**: https://verdant-puffpuff-d076f3.netlify.app

## API Endpoints

### Get User Data

Returns a complete user object with realistic fake data.

```bash
GET /fakr/user
```

**Response:**

```json
{
  "id": "1",
  "avatar": "https://fictionalfolks.netlify.app/avatars/selene.svg",
  "username": "selenefarrow",
  "firstName": "Selene",
  "lastName": "Farrow",
  "email": "selene@fakr.com",
  "role": "user",
  "createdAt": "2025-01-01",
  "updatedAt": "2025-01-01"
}
```

### Get User with Invalid Data

Returns a user object with specific fields replaced with invalid data for testing validation scenarios.

```bash
GET /fakr/user/invalid/email
```

**Response:**

```json
{
  "id": "1",
  "avatar": "https://fictionalfolks.netlify.app/avatars/selene.svg",
  "username": "selenefarrow",
  "firstName": "Selene",
  "lastName": "Farrow",
  "email": "selene@fakr",
  "role": "user",
  "createdAt": "2025-01-01",
  "updatedAt": "2025-01-01"
}
```

## Usage Examples

### Testing Form Validation

```javascript
// Test with valid data
const validUserResponse = await fetch(
  "https://verdant-puffpuff-d076f3.netlify.app/fakr/user",
);
const validUser = await validUserResponse.json();

// Test with invalid email
const invalidEmailResponse = await fetch(
  "https://verdant-puffpuff-d076f3.netlify.app/fakr/user/invalid/email",
);
const invalidEmailUser = await invalidEmailResponse.json();
```

### Frontend Development

```javascript
// Populate a user profile form
const userResponse = await fetch("/fakr/user");
const user = await userResponse.json();
document.getElementById("firstName").value = user.firstName;
document.getElementById("lastName").value = user.lastName;
document.getElementById("email").value = user.email;
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `400` - Bad request (missing required parameters)
- `404` - Not found (invalid field or endpoint)

Error responses include descriptive messages:

```json
{
  "error": "Invalid field: emails"
}
```

## Development

### Local Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `netlify dev`
4. Access locally: `http://localhost:8888`

### Deployment

The service is automatically deployed to Netlify. The production URL is available at the top of this README.

## Contributing

This is an evolving service. Feel free to contribute by:

- Adding new data types
- Expanding existing data sets
- Improving documentation
- Reporting issues

## MIT License

See [LICENSE](LICENSE) file for details.
