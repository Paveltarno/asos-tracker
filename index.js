Promise = require("bluebird");
const req = require("request-promise");
const cheerio = require("cheerio");

const product = {
  url:
    "http://us.asos.com/asos-petite/asos-petite-smock-dress-in-ponte-stripe/prd/7519285/?clr=blue&SearchQuery=981721&SearchRedirect=true"
};

async function extractProductStatus(product) {
  const $ = await req({
    uri: product.url,
    transform: cheerio.load
  });
  const sizes = $(`select[data-id="sizeSelect"]`).html();
  console.log(`Got `, sizes);
}

console.log("BEGIN EXTRACTIOn");
extractProductStatus(product).then(() => {
  console.log("DONE!!!");
}, console.error);
