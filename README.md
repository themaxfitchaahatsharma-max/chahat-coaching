# Chahat Coaching Centre — Static Website

A lightweight, responsive, single-page website for **Chahat Coaching Centre**, Kudia, Bihar. Built with pure **HTML, CSS and vanilla JavaScript** — no frameworks, no build tools, no backend. Ready to host on **GitHub Pages** in minutes.

---

## Project Structure

```
/
├── index.html          # Main page (Hero, Topics, Search, Contact, Footer)
├── style.css           # Blue + cream editorial styling, animations
├── script.js           # Vanilla JS — reveals, smooth scroll, search, etc.
├── topics.js           # ← edit this file to update running topics
├── images/
│   ├── banner.jpg      # Hero classroom photo
│   ├── classroom.jpg   # Contact section image
│   └── books.jpg       # Reserved for future use
└── README.md
```

---

## 1. How to edit `topics.js` (change the running topics)

Open `topics.js` in any text editor. You will see something like:

```js
const topics = {
  batchA: "Python",
  batchB: "Java Script",
  batchC: "Developer",
  batchD: "Mobile Software"
};
```

- Replace the text inside the double quotes with the current topic for each batch.
- **Keep** the double quotes `"…"` around the text.
- **Do not** change the property names (`batchA`, `batchB`, `batchC`, `batchD`).

Example — after editing:

```js
const topics = {
  batchA: "Exponents",
  batchB: "Photosynthesis",
  batchC: "Simple Equations",
  batchD: "Grammar - Tenses"
};
```

Save the file. That is all.

You can also edit the small grade / subject labels in the same file (`batchMeta`) if you ever want to.

---

## 2. How to upload the project to GitHub

You only need to do this **once**.

1. Create a free account at [https://github.com](https://github.com) if you don't already have one.
2. Click the **"+"** in the top right → **New repository**.
3. Give it a name, e.g. `chahat-coaching`. Leave **Public** selected. Click **Create repository**.
4. On the new repo page, click **"uploading an existing file"**.
5. Drag & drop **every file and the `images` folder** from this project into the browser.
6. Scroll down and click **Commit changes**.

That's it — your files are on GitHub.

---

## 3. How to enable GitHub Pages

1. In your repository, click the **Settings** tab.
2. On the left sidebar, click **Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, pick **`main`** (or `master`) and folder **`/ (root)`**, then click **Save**.
5. Wait ~1 minute. Refresh the page — GitHub will show a green box with your live URL, e.g.
   ```
   https://<your-username>.github.io/chahat-coaching/
   ```

Open that URL in your browser — your site is live.

---

## 4. How to update the website after changing topics

Whenever you want to change the running topics:

**Option A — Directly on GitHub (easiest, phone-friendly)**

1. Open your repository on GitHub.
2. Click **`topics.js`**.
3. Click the **pencil ✏️** (Edit) icon in the top right.
4. Change the text between the quotes.
5. Scroll down → **Commit changes**.
6. Wait ~1 minute. Refresh your live site — new topics appear.

**Option B — On your computer**

1. Edit `topics.js` in any text editor.
2. Push the change to GitHub (drag-drop upload works too — just overwrite the old `topics.js`).
3. Wait ~1 minute for GitHub Pages to rebuild.

---

## Editing the WhatsApp number or email

- **WhatsApp**: open `index.html`, use Find (Ctrl / Cmd + F) to search for `8825132545` and replace both occurrences (link and displayed number). The link starts with `https://wa.me/91...`.
- **Email**: search for `contact@chahatcoaching.in` in `index.html` — replace both places (the visible text and the `mailto:` link).

---

## Editing the hero image

Replace `images/banner.jpg` with any classroom / education photo you like (keep the same filename). Recommended size: 1200×1500 px or larger, under 500&nbsp;KB after compression.

---

## Tech notes

- **No build step.** Just static HTML/CSS/JS. Works out of the box on GitHub Pages, Netlify, Vercel, or even opened locally by double-clicking `index.html`.
- **Lenis** (smooth scroll) and **FontAwesome** (icons) are loaded from CDNs — no installation needed.
- **Fonts** — Fraunces (editorial serif) + Inter (body) — loaded from Google Fonts.
- **Reduced-motion friendly** — respects the OS accessibility setting.
- **SEO-ready** — meta description, Open Graph tags and semantic HTML.

---

## License

Content and photography © Chahat Coaching Centre. Feel free to reuse the code structure for your own school or coaching centre.

---

Made with ❤️ for students of Kudia, Bihar.
