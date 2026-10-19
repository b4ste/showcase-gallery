# ShowCase setup

## Run the screens

From the `showcase-gallery` folder:

```powershell
npm run dev
```

Open the Vite URL printed in the terminal. The screens work in demo mode and save products in your browser until you connect MongoDB. Run `npm run build` to check the frontend build.

## Add your own MongoDB connection

1. Copy `server/.env.example` to `server/.env` and replace the example `MONGO_URI` with **your own** MongoDB Atlas connection string. Keep `server/.env` out of Git.
2. From this folder, run `npm run server:dev` in a second terminal. The Express API is in `server/server.js`; it listens on port 5000 by default.
3. Copy `client/.env.example` to `client/.env.local`. Set `VITE_API_URL=http://localhost:5000`.
4. Restart `npm run dev`. The navbar should now show **Connected to API**. Add a product, reload the page, and check that it stays.

For hosting, set `MONGO_URI` and `CLIENT_ORIGIN` on Render, and set `VITE_API_URL` to your Render service URL on Vercel. The frontend sends requests to `/api/products` on that URL. `CLIENT_ORIGIN` should be your exact Vercel site origin, such as `https://your-project.vercel.app`.

The demo API has no login or owner checks, so anyone with its public URL can add, edit, or delete products. Add authentication before using it beyond the class project.
