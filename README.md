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

### Get Images

Returns an array of high-quality images from Unsplash, perfect for testing image galleries, carousels, or any feature requiring realistic photo content.

```bash
GET /fakr/images
```

**Response:**

```json
[
  {
    "description": "A beautiful landscape with mountains",
    "height": 3168,
    "id": "abc123",
    "link": "https://unsplash.com/photos/abc123",
    "username": "John Photographer",
    "urls": {
      "full": "https://images.unsplash.com/photo-123456789?ixid=...",
      "regular": "https://images.unsplash.com/photo-123456789?ixid=...&w=1080"
    },
    "width": 4752
  }
]
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

### Testing Image Components

```javascript
// Load images for testing galleries or carousels
const imagesResponse = await fetch(
  "https://verdant-puffpuff-d076f3.netlify.app/fakr/images",
);
const images = await imagesResponse.json();

// Use in your image gallery component
images.forEach((image) => {
  const img = document.createElement("img");
  img.src = image.urls.regular;
  img.alt = image.description;
  img.width = 300; // Scale as needed
  document.getElementById("gallery").appendChild(img);
});
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

## Photo Credit

- Photo by [Oliver Sjöström](https://unsplash.com/@ollivves) on [Unsplash](https://unsplash.com/photos/man-surfboarding-during-daytime-y-GMWtWW_H8)
- Photo by [Knut Robinson](https://unsplash.com/@knut____robinson) on [Unsplash](https://unsplash.com/photos/man-in-black-shorts-surfing-on-sea-during-daytime-DTHtjyRuozs)
- Photo by [Silas Baisch](https://unsplash.com/@silasbaisch) on [Unsplash](https://unsplash.com/photos/high-angle-photography-of-man-surfing-giant-wave-L78RstAZuTY)
- Photo by [Sten Rademaker](https://unsplash.com/@stenrademaker) on [Unsplash](https://unsplash.com/photos/red-and-blue-kayaks-on-white-wooden-fence-1kXi2x9t9Fg)
- Photo by [Taweeroj Eawpanich](https://unsplash.com/@surferholiday) on [Unsplash](https://unsplash.com/photos/woman-holding-white-surfboard-walking-on-shore-uJ1fwrVerpA)
- Photo by [Jessica Wong](https://unsplash.com/@jess_adventures808) on [Unsplash](https://unsplash.com/photos/person-in-red-dress-walking-on-beach-during-sunset-a-uAZGSlS2g)
- Photo by [Mathieu CHIRICO](https://unsplash.com/@matthewchrc) on [Unsplash](https://unsplash.com/photos/black-and-white-photo-of-man-surfing-JSEn2f96rzY)
- Photo by [Vinh](https://unsplash.com/@nicolasvinh) on [Unsplash](https://unsplash.com/photos/a-woman-in-a-wet-suit-carrying-a-surfboard-VGiim2fPfmY)
- Photo by [Erick Chévez](https://unsplash.com/@vuodesign) on [Unsplash](https://unsplash.com/photos/a-man-sitting-on-a-bench-holding-a-surfboard-wMHZsFZg7oI)

## MIT License

See [LICENSE](LICENSE) file for details.
