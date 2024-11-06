# Trendsgit – Historical Trending Repositories

Trending Repos Archive is a platform that lets users explore the historical popularity of repositories across various platforms.

Project website: [https://trendsgit.vercel.app](https://trendsgit.vercel.app)

![](/public/og.png)


## Why Trendsgit?

Unlike typical trending repositories pages that show only the latest trends, this site provides a historical view, capturing trending data over time so users can see how repositories have evolved in popularity. 

## Key Features

- **Historical Insights**: Dive deep into the past to see how repositories have changed over time.
- **Visual Graphs**: Enjoy intuitive visualizations that make data easy to understand.
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
  - `id`: (optional) The ID of the repository to fetch a specific repo.
  - `name`: (optional) A string to filter repositories by name.
  - `language`: (optional) A string to filter repositories by programming language.
- **Example Request**:
  ```http
  GET https://trendsgit.vercel.app/api/repos?id=123
  ```
  This request fetches the repository with ID 123.

### Get Languages
- **Endpoint**: `/api/languages`
- **Method**: `GET`
- **Response**: Returns a list of supported programming languages.
- **Example Request**:
  ```http
  GET https://trendsgit.vercel.app/api/languages
  ```
  This request retrieves all supported programming languages.