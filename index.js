const express = require("express");
const puppeteer = require("puppeteer");
const app = express();

app.get("/convert", async (req, res) => {
    const url = req.query.url;

    // const browser = await puppeteer.launch({
    //     headless: true
    // });
    let browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium-browser', args: [ '--disable-gpu', '--disable-setuid-sandbox', '--no-sandbox', '--no-zygote' ] })

    const webPage = await browser.newPage();

    await webPage.goto(url, {
        waitUntil: "networkidle0"
    });
    
    const pdf = await webPage.pdf({
        printBackground: true,
        format: "Letter",
        margin: {
            top: "20px",
            bottom: "40px",
            left: "20px",
            right: "20px"
        }
    });

    await browser.close();

    res.contentType("application/pdf");
    res.send(pdf);
})
app.get('/', function(req,res){
    // res.sendFile('./index.html');
    res.sendFile('views/index.html', {root: __dirname })

});
app.listen(3000, () => {
    console.log("Server started at http://localhost:3000/");
});