# Private internship blog

The public portfolio stays on GitHub Pages. Full weekly entries belong to a separate private GitHub repository deployed to Vercel. Pages CMS edits that private repository.

## Prepared locally

`private-blog/` contains the separate application, CMS configuration, ten initial entries, and authentication tests. This folder is ignored by the public portfolio Git repository. Do not force-add it to that repository.

The public portfolio no longer fetches weekly JSON. Its cards will link to the protected server once `BLOG_ORIGIN` is set in `blog-config.js`. Until then they continue to show “coming soon”.

## Activate hosting

1. Create a **private** GitHub repository for the contents of `private-blog/`. The files inside that folder should be at the new repository root.
2. Import that private repository into Vercel. Use the Other framework preset, no build command, and `public` as the output directory. The included `vercel.json` configures the function and content bundle. Do not deploy the entire public portfolio repository as this application.
3. In Vercel's project environment settings, add `BLOG_PASSWORD` as a sensitive variable with a unique random password of at least 16 characters. It is mandatory: the server refuses to operate without it. Add optional `BLOG_USERNAME` (default: `supervisor`). Do not put these credentials in code, Pages CMS, GitHub files, or chat.
4. Add `PORTFOLIO_URL` as the complete live URL of your public `blog.html` for the back link. Deploy production after setting the variables.
5. Check the production `/week?week=1` URL in a private browser window. It must request credentials, reject a wrong password, and show “coming soon” with valid credentials. Check `/content/weeks/week-1.json` does not expose an entry. Preview deployments need the same credentials configured or must remain inaccessible.
6. Set `window.BLOG_ORIGIN` in the public `blog-config.js` to that production HTTPS origin, then publish the public portfolio update. Never put the password in this file.

Visitors use the browser's username/password prompt. Share both values privately with your supervisor. Browsers may remember HTTP Basic credentials until the session is closed; use a private window on shared computers. Rotate the password in Vercel and redeploy to revoke the old one.

## Edit without code

Open https://app.pagescms.org, sign in with GitHub, and grant access only to the **private blog repository**. Select its deployment branch. The `.pages.yml` configuration supplies a form for each week.

Edit the date range and introduction. Add dated Weekly Log rows, each with a spontaneous log and a reflection log. Add gallery images with captions, and learning objectives with a description and an Improve field. Finish with Takeaways & Looking Ahead. Gallery uploads are stored under content/media and served through the authenticated image endpoint. Enable “Show as published” when ready and save. The resulting Git commit triggers Vercel's deployment. Share the protected week link with your supervisor once that deployment finishes.

Drafts are hidden from the rendered pages, but remain accessible to collaborators with private repository access. All full entry text must stay in the private repository. Public card titles and “coming soon” previews remain in the public portfolio.

## Local verification

From `private-blog/`, run `npm test`. Tests cover missing configuration, missing/wrong credentials, authentication before content reads, authorized rendering, HTML escaping, invalid week numbers, drafts, and password rotation. Live Vercel routing and authentication still require the deployment checks above.

## Week design sample

The public `week.html` is a design sample using teacher-provided examples and existing portfolio imagery, not real internship entries. `week-preview.js` contains that sample only. The authenticated app renders the same layout with private CMS content. Never copy actual private entries into the public sample.
