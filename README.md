# NextStore

NextStore is a beginner-friendly online store built with Next.js App Router and styled-components. It uses local product data, custom reusable components, dynamic product routes, and a responsive layout.

Repository: [nextjs-store](https://github.com/mohadesehesmaeilzadeh/nextjs-store)

## Features

- Store homepage with hero section and product grid
- About page
- Contact page with frontend validation
- Dynamic product detail pages
- Local product data
- Local product images in `public/images/products`
- Responsive layout for desktop, tablet, and mobile
- CSS-in-JS styling with `styled-components`
- Custom header, footer, mobile menu, and product cards

## Tech Stack

- Next.js 16
- React 19
- JavaScript
- styled-components
- ESLint

No backend, authentication, Redux, database, Tailwind, Bootstrap, Material UI, or component library is used.

## Project Structure

```text
src/
  app/
    about/
      page.js
    contact/
      page.js
    products/
      [id]/
        page.js
    layout.js
    page.js
    providers.js

  components/
    AboutPageContent.jsx
    ContactForm.jsx
    Footer.jsx
    Header.jsx
    MobileMenu.jsx
    ProductCard.jsx
    ProductDetailsPage.jsx
    StorePage.jsx

  data/
    products.js

  lib/
    registry.js

  styles/
    GlobalStyles.js
    theme.js

public/
  images/
    products/
      bluetooth-speaker.jpg
      ceramic-travel-mug.jpg
      cotton-throw-blanket.jpg
      desk-organizer.jpg
      everyday-backpack.jpg
      minimal-watch.jpg
      smart-desk-lamp.jpg
      wireless-headphones.jpg
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

If port `3000` is already in use, Next.js will show another local URL such as `http://localhost:3001`.

## Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server after a successful build.

```bash
npm run lint
```

Runs ESLint.

## Product Data

Products are stored in:

```text
src/data/products.js
```

Each product has:

- `id`
- `name`
- `price`
- `category`
- `image`
- `shortDescription`
- `description`

The store page maps over this array and renders a `ProductCard` for each product.

## Dynamic Routes

Product detail pages use the App Router dynamic route:

```text
src/app/products/[id]/page.js
```

The page reads the route `id`, finds the matching product with `find()`, and renders the product details. If no product exists for that `id`, the page shows a clean `Product not found` state instead of crashing.

Example routes:

```text
/products/1
/products/2
/products/999
```

## styled-components Setup

The project uses `styled-components` for component styling and global styles.

The compiler option is enabled in:

```text
next.config.js
```

Server-side style collection for the App Router is handled in:

```text
src/lib/registry.js
```

The theme and global styles are provided through:

```text
src/app/providers.js
src/styles/theme.js
src/styles/GlobalStyles.js
```

## Images

Product images are local `.jpg` files inside:

```text
public/images/products
```

Product data references them with public paths such as:

```text
/images/products/wireless-headphones.jpg
```

This keeps the project reliable during local development because the UI does not depend on loading remote images at runtime.

## Notes for Learners

This project is intentionally simple. It focuses on core Next.js and React ideas:

- file-based routing
- shared layouts
- dynamic routes
- reusable components
- props
- local data
- client components only where state or events are needed
- CSS-in-JS with styled-components

The contact form only handles data on the frontend. It logs successful submissions to the browser console and does not send anything to a backend.
