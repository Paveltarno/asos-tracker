Promise = require("bluebird");
const phantom = require("phantom");
const WAIT_FOR_LOAD_MS = 1000 * 3;
let _instance;
let _page;

function sleep(timeout) {
  return new Promise(res => setTimeout(() => res(), timeout));
}

async function extractProductStatus(page, product) {
  const status = await page.open(product.url);
  console.info(`Server returned ${status}`);
  if (status === "success") {
    //await page.includeJs("https://code.jquery.com/jquery-3.2.1.slim.min.js");
    console.log(`Waiting for page to load (${WAIT_FOR_LOAD_MS} ms)`);
    await sleep(WAIT_FOR_LOAD_MS);
    const elem = await page.evaluate(function() {
      var optionsHTML = document
        .querySelector('[data-id="sizeSelect"]')
        .getElementsByTagName("option");
      var options = [];
      for (var index = 1; index < optionsHTML.length; index++) {
        var element = optionsHTML[index];
        options.push({
          name: element.text.split("-")[0],
          isAvailable: element.hasAttribute("disabled") ? false : true
        });
      }
      return options;
    });
    console.log("MY OPTIONS ARE", elem);
  }
}

const product = {
  url:
    "http://us.asos.com/asos-petite/asos-petite-smock-dress-in-ponte-stripe/prd/7519285/?clr=blue&SearchQuery=981721&SearchRedirect=true"
};

async function cleanup() {
  console.info("Shutting down, closing stuff 💤");

  if (page) {
    await page.close();
  }

  if (instance) {
    await instance.exit();
  }
  console.log("Bye [=");
}

(async function() {
  const instance = await phantom.create([], {});
  const page = await instance.createPage();

  await extractProductStatus(page, product);
})();

process.on("unhandledRejection", err => {
  console.error(err);
  process.exit(666);
});
process.on("exit", cleanup);
process.on("SIGINT", cleanup);
