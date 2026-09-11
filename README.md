# portfolio

My portfolio site. It is the URL I paste into the Portfolio field on a job
application, so the page itself is part of what is being read.

Next.js with TypeScript and Tailwind, exported static, hosted on Vercel. Two
routes: the home page, and a case study on SentryQuery.

## Running it

```bash
npm install
npm run dev
```

`npm run build` writes the static export to `out/`. There is no server anywhere
in this, so `out/` can be served by anything.

## How it is put together

`src/content/` holds the words. Project copy is a data file rather than markup,
because it gets read back against the five repos it describes and that is much
easier when it all sits in one place.

Every project carries a `note`, which is the short statement of what the project
is not. SentryQuery is not hosted. The booking platform takes requests and does
not hold a calendar. Those lines are there on purpose. A portfolio is the
easiest place in the world to let a claim drift past what the code actually
does, and it is public, so it is also the easiest place to get caught.

The theme lives on the root element as `data-theme`, set before the first paint
by a small inline script in the document head. The toggle writes it and reads it
back through `useSyncExternalStore`, so the DOM stays the source of truth and
there is no flash of the wrong theme on load.

Both colour palettes are defined as the same set of CSS variable names in
`globals.css`, so no component ever names a colour twice.
