# CS Charan portfolio for GitHub Pages

React, JavaScript, HTML, and plain CSS. The `docs/` folder contains the built website ready to publish. No Express server is needed. The resume download, portrait, and fonts use paths that work in a GitHub Pages project folder such as `/Cscharan/`.

## Publish using the GitHub website

1. Extract this ZIP.
2. Open https://github.com/CSCHARAN/Cscharan and sign in.
3. Select **Add file > Upload files**. Drag the `docs` folder from this package into the upload area. Commit the upload. If a `docs` folder already exists, replace its matching files.
4. Open **Settings > Pages**. Set **Source** to **Deploy from a branch**, select your default branch (usually `main`) and **/docs**, then **Save**.
5. Open the site address shown by GitHub after deployment succeeds. For this repository, the expected address is https://cscharan.github.io/Cscharan/.

Upload `docs` as a folder, preserving `docs/index.html` and its `assets` and `fonts` folders. Do not upload the ZIP itself. The existing root files can stay because Pages will publish the selected `/docs` folder. GitHub Pages makes the website public.

## Edit in VS Code

Install Node.js 22.13 or newer. Open this project folder in VS Code and run:

```sh
npm install
npm run dev
```

- `data/profile.js`: personal details and portfolio content.
- `src/App.jsx`: React components and page sections.
- `src/styles.css`: colors, typography, and responsive layouts.
- `public/S-Charan-resume.pdf`: downloadable resume; replace this file to update it.
- `public/charan-portrait.png`: portrait.
- `public/fonts/`: Inter fonts and license.

After an edit, run `npm run build`, then upload the rebuilt `docs` folder to GitHub. Commit the source files as well if you want to keep editable code in the repository. Do not upload `node_modules`.

## Regenerate the resume

The bundled PDF is already ready. To generate it again from profile data, install Python 3 and ReportLab, then run:

```sh
python3 -m pip install reportlab
python3 scripts/generate-resume.py
npm run build
```

Regenerate after changing profile information; the PDF does not update automatically.

## Contact form

The form opens an email draft or copies a message. It does not send or store submissions. External links preserve their supplied destinations.

## References

- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://vite.dev/guide/static-deploy.html
