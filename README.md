# Dlalas General Dealer

Next.js (App Router) + Tailwind CSS + Appwrite.

## Setup
1. `npm install`
2. Copy `.env.local.example` to `.env.local` and fill in your values.
   The home page can load without Appwrite settings, but order submissions require valid values; restart the dev server after changing them.
3. In Appwrite, create a Database and a Collection with these String attributes (all required except selectedProduct):
   `customerName` (size 100), `phoneNumber` (size 30), `selectedProduct` (size 200, optional), `message` (size 2000).
4. In the Collection's Settings > Permissions, give role `Any` the **Create** permission only.
5. In Project > Platforms, add a Web platform for `localhost` and your deployed domain.
6. Add your hero photo as `public/hero-bg.jpg` (a green gradient shows until you do).
7. `npm run dev`
