// For the OBeautifulCode blog posts that are now redirecting to ThatButHow, we would like
// to record a pageview with Plausible before redirecting so that we can capture data such as the referrer,
// search terms, etc.
// After the redirect, Plausible records the pageview for the ThatButHow domain with OBeautifulCode
// as the referrer - it's all lumped together without any visability into the true referal data.
// This is the best approach we could come up with in collaboration with Plausible support and a bounty
// that was added to this StackOverflow question:
// https://stackoverflow.com/questions/17205850/is-it-possible-to-run-javascript-code-before-meta-refresh
// The page initiating the redirect should include a meta http-equiv="refresh" tag, but set a very high timeout.  
// This enables search engines to know, when parsing, that the page is redirected (in case it matters for SEO).
// That page should also include the manual version of Plausible's JS and finally include this file.
// This code calls Plausible to record the pageview, and registers a callback and performs the redirect.
// This ensures that the pageview is fully recorded before the refresh occurs.  If the refresh is simply inlined
// then, in FireFox, we've found that the pageview is not recorded.  We also add a 50 ms delay so that the browser
// can record a 202 for the POST (doesn't seem to be strictly required - we see the event is send to Plausible and,
// sometimes we get the 202 and other times we don't - likely just a timing issue).
window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) };
redirect = async () => { 
    await new Promise(r => setTimeout(r, 50));
    window.location = document.querySelector( '[http-equiv="refresh"]' ).content.split( 'url=' )[1]; 
}
plausible("pageview", {callback: redirect})