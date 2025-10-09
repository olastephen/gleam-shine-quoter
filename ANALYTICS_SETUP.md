# Analytics & Search Console Setup Guide

This guide will help you set up Google Analytics, Google Search Console, and Bing Webmaster Tools for your Freshshine Solutions website.

## 1. Google Analytics Setup

### Steps:
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property for your website
3. Copy your **Measurement ID** (format: G-XXXXXXXXXX)
4. Open `index.html` in your project
5. Replace both instances of `G-XXXXXXXXXX` with your actual Measurement ID

```html
<!-- Find this line and replace G-XXXXXXXXXX -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX'); <!-- Replace here too -->
</script>
```

## 2. Google Search Console Setup

### Steps:
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property: `https://www.freshshine-solutions.com`
3. Choose **HTML tag** verification method
4. Copy the verification code from the meta tag
5. Open `index.html` in your project
6. Replace `YOUR_GOOGLE_VERIFICATION_CODE` with your actual code

```html
<!-- Find this line and replace YOUR_GOOGLE_VERIFICATION_CODE -->
<meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
```

7. Deploy your changes
8. Go back to Search Console and click **Verify**
9. Submit your sitemap: `https://www.freshshine-solutions.com/sitemap.xml`

## 3. Bing Webmaster Tools Setup

### Steps:
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site: `https://www.freshshine-solutions.com`
3. Choose **Add a meta tag to your website** verification method
4. Copy the verification code from the meta tag
5. Open `index.html` in your project
6. Replace `YOUR_BING_VERIFICATION_CODE` with your actual code

```html
<!-- Find this line and replace YOUR_BING_VERIFICATION_CODE -->
<meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
```

7. Deploy your changes
8. Go back to Bing Webmaster Tools and click **Verify**
9. Submit your sitemap: `https://www.freshshine-solutions.com/sitemap.xml`

## Important Notes

- **Do not commit your actual verification codes to public repositories** if your repo is public
- All three services are now set up in your HTML, but you need to replace the placeholder values
- After verification, you can monitor your site's performance and search rankings
- The sitemap is already created at `/public/sitemap.xml` and will be automatically accessible

## Deployment Checklist

- [ ] Replace Google Analytics Measurement ID (2 places)
- [ ] Replace Google Search Console verification code
- [ ] Replace Bing Webmaster Tools verification code
- [ ] Deploy to production
- [ ] Verify ownership in Google Search Console
- [ ] Verify ownership in Bing Webmaster Tools
- [ ] Submit sitemap to both search consoles
- [ ] Check Google Analytics is tracking (may take 24-48 hours to show data)

## Testing

After deployment, you can test if Google Analytics is working by:
1. Visit your website
2. Open browser DevTools (F12)
3. Go to Network tab
4. Look for requests to `googletagmanager.com` and `google-analytics.com`

If you see these requests, Analytics is working correctly!

