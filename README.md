# Trendsgit – Historical Trending Repositories

Trending Repos Archive is a platform that lets users explore the historical popularity of repositories across various platforms.

Project website: [https://trendsgit.vercel.app](https://trendsgit.vercel.app)

![](/public/og.png)


## Why Trendsgit?

Unlike typical trending repositories pages that show only the latest trends, this site provides a historical view, capturing trending data over time so users can see how repositories have evolved in popularity. 

## Key Features

- **Historical Insights**: Dive deep into the past to see how repositories have changed over time.
- **API Endpoints**: Utilize our API endpoints to integrate historical trending data into your applications.
- **Category Trends**: Explore shifts in popularity across different categories like languages, tags, or topics.
- **Developer Interest**: Track how interest in certain technologies has evolved, helping you stay ahead of the curve.

## Who Is It For?

Perfect for developers, tech enthusiasts, and industry analysts, Trending Repos Archive provides a unique window into the evolution of open-source projects. Identify long-term popular tools, emerging frameworks, and important trends in software development.

## Get Started

Ready to explore? Visit our website and start uncovering the trends in open-source repositories today!

## API Endpoints

### Get Repositories
- **Endpoint**: `/api/repos`
- **Method**: `GET`
- **Query Parameters**:
  - `created_at`: (optional) Filter repositories by date
- **Description**: Returns repositories grouped by days ago (within the last week)
- **Example Request**:
  ```http
  GET https://trendsgit.vercel.app/api/repos
  ```
- **Response Format**:
  ```json
  {
    "data": [
      {
        "daysAgo": 0,
        "repos": [/* array of repositories */]
      },
      {
        "daysAgo": 1,
        "repos": [/* array of repositories */]
      }
    ]
  }
  ```

### Get Single Repository
- **Endpoint**: `/api/repos/[id]`
- **Method**: `GET`
- **Parameters**:
  - `id`: Repository ID (required)
- **Example Request**:
  ```http
  GET https://trendsgit.vercel.app/api/repos/123
  ```
- **Response Format**:
  ```json
  {
    "data": {
      "id": "123",
      "name": "repository-name",
      // ... other repository details
    }
  }
  ```

### Search Repositories
- **Endpoint**: `/api/repos/search/[query]`
- **Method**: `GET`
- **Query Parameters**:
  - `language`: Filter by programming language
  - `full_name`: Filter by repository full name
- **Example Request**:
  ```http
  GET https://trendsgit.vercel.app/api/repos/search?language=JavaScript&full_name=example
  ```

### Get Languages
- **Endpoint**: `/api/languages`
- **Method**: `GET`
- **Description**: Returns a list of all supported programming languages
- **Example Request**:
  ```http
  GET https://trendsgit.vercel.app/api/languages
  ```
- **Response Format**:
  ```json
  {
    "data": ["TypeScript", "JavaScript", "Python", /* ... */]
  }
  ```