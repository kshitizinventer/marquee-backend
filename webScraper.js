import puppeteer from 'puppeteer'

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto(`https://www.zaubacorp.com`)
export default async function scrapeWeb(searchText){

    await page.type("#searchid",searchText)
    await page.click("#edit-submit--3")
    await page.waitForNavigation()

   let CIN = await page.evaluate(()=>{
        return Array.from(document.querySelectorAll("#results  tbody  tr  td:nth-child(1)  h5")).map(x=>x.textContent)
    })
    let companyName = await page.evaluate(()=>{
        return Array.from(document.querySelectorAll("#results  tbody  tr  td:nth-child(2) a h5")).map(x=>x.textContent)
    })

    let companyList = []
    CIN.forEach((elm,index) => {
        companyList.push({cin : elm , name : companyName[index]})
    });



    // await browser.close();

    return companyList
}

// #results  tbody  tr  td:nth-child(1)  h5