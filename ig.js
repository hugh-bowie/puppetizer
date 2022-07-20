require('dotenv').config();
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const { r, log, iPhone13, badAccounts, r15, r23 } = require('./src/helpers');
const { Accounts } = require('./src/accountList.js');


(async () => {
  try {

    //----initialize
    const browser = await puppeteer.launch({ headless: false, args: [`--incognito `] });
    const page = await browser.newPage();
    await page.emulate(iPhone13);

    //----login
    await page.goto('https://www.instagram.com/accounts/login/?source=auth_switcher', { waitUntil: 'networkidle2' });

    await page.waitForSelector("input[name='username']", { visible: true });
    await page.tap("input[name='username']");
    await page.type("input[name='username']", process.env.HB, { delay: r(50, 100) });
    await page.type("input[name='password']", process.env.PW, { delay: r(50, 100) });
    await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.tap("[type='submit']")]);
    await page.waitForTimeout(r15);

    //----click no notifications
    const notifyBtn = await page.$x('//*[contains(text(), "Not Now")]');
    if (notifyBtn) {
      await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), notifyBtn[0].tap()]);
      await page.waitForTimeout(r15);
    }

    //----click no to homescreen
    const cancelBtn = await page.$x('//*[contains(text(), "Cancel")]');
    if (cancelBtn) {
      await cancelBtn[0].tap();
      await page.waitForTimeout(r15);
    }

    //----- Close the 'use the App' button
    const closeBtn = await page.$x('//*[@aria-label="Close"]');
    if (closeBtn) {
      await closeBtn[0].tap();
      await page.waitForTimeout(r15);
    }

    //---- got to home and screenshot the follower count
    await page.goto('https://www.instagram.com/' + process.env.DKS, { waitUntil: 'networkidle2' });
    const user = await page.$eval('h1', use => use.innerText);
    const flws = await page.$$eval('a[href$="/followers/"]', flw => flw.map(fl => fl.children[0].innerText.replace(`\nfollowers`, ``)));
    const flwg = await page.$$eval('a[href$="/following/"]', flg => flg.map(fg => fg.children[0].innerText.replace(`\nfollowers`, ``)));
    log(`\n${user}  Followers: ${flws} Following: ${flwg}`);

    //----go to one of the target accounts
    let farmAccount = await Accounts[r(0, Accounts.length)];
    await page.goto(farmAccount, { waitUntil: 'networkidle2' });
    log(`Farming this Acct: ${farmAccount}`);
    await page.keyboard.press('PageDown');
    await page.waitForTimeout(r15);
    await page.keyboard.press('PageDown');
    await page.waitForTimeout(r15);

    //----goto one random post
    let postHrefs = await page.$$eval('a[href^="/p/"]', href => href.map(hre => hre.getAttribute('href')));
    if (postHrefs) {
      let rPost = r(1, postHrefs.length);
      await page.goto('https://www.instagram.com' + postHrefs[rPost], { waitUntil: 'networkidle2' });
      log(`Getting Likers of photo #${rPost} href: ` + (await page.url()));
      await page.waitForTimeout(r15);
    }

    //----click the Likes number on the photo
    let likedByBtn = await page.$('[href$="liked_by/"]'); // $x('//*[contains(@href, "/liked_by/")]')    
    if (likedByBtn) {
      await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.tap('[href$="liked_by/"]')]);
      await page.waitForTimeout(r15);
      await page.waitForSelector('h1', { visible: true });
    }

    //---- get all the likers with public accounts and active stories
    let likesH1 = await page.$x('//h1[contains(text(), "Likes")]');
    if (likesH1) {
      //----pagedown 20 times = 90 followers
      for (let i = 0; i < 20; i++) {
        await page.keyboard.press('PageDown');
        await page.waitForTimeout(r(333, 555));
      }
    }

    // ---- get only public likers posts -----///// 'div.RR-M-.h5uC0' or '$x('//*[@aria-disabled="false"]')
    let publicHrefs = await page.$$eval('div[aria-disabled="false"]', pub => pub.map(pu => pu.parentNode.nextSibling.children[0].children[0].children[0].getAttribute('href')));
    log(`Array of ${publicHrefs.length} active users created`);
    await page.waitForTimeout(r15);
    //--- loop over each profile [y]-timeslet rNum = r(); 
    let rNum = r(3, 5);//  ♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻
    log(`Engaging ${rNum} users this round`);
    if (publicHrefs) {
      for (let x = 0; x < rNum; x++) {
        await page.goto('https://www.instagram.com' + publicHrefs[x], { waitUntil: 'networkidle0' }); //>>>>>>>> USER WITH ZERO POSTS >>>>>'https://www.instagram.com/jasminee.hampton/'
        await page.waitForTimeout(r15);
        await page.waitForSelector('h1', { visible: true });
        let currentURL = await page.url();
        let searchBool = badAccounts.includes(currentURL);
        let postCount = await page.$x('//*[contains(text(), "No Posts Yet")]');
        if (postCount.length === 0) {
          if (!searchBool) {
            // view their story
            let viewStoryBtn = await page.$('[aria-disabled="false"]');
            if (viewStoryBtn) {
              await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.tap('[aria-disabled="false"]')]);
              await page.waitForTimeout(r(3000, 5000));
              log(`  ★ ${x} viewing this story ` + await page.url());
              let closeBtn = await page.$('[aria-label="Close"]');
              if (closeBtn.length === 1) {
                await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.tap('[aria-label="Close"]')]);
                await page.waitForTimeout(r15);
              } else {
                await page.goBack({ waitUntil: 'networkidle2' }); // >>>>>>>> USER WITH ZERO POSTS >>>>>'https://www.instagram.com/jasminee.hampton/'
                await page.waitForTimeout(r15);
              }
              //----- get top 24 posts
              let posts = await page.$$eval('a[href^="/p/"]', hrefs => hrefs.map(ref => ref.getAttribute('href')));// let posts = await page.$x('//*[@class="FFVAD"]');
              if (posts) {
                //---- pick a post to like
                let p = r(0, posts.length);
                //----click One random Public post to like
                await page.goto('https://www.instagram.com' + posts[p], { waitUntil: 'networkidle2' });
                await page.waitForTimeout(r15);
                await page.waitForSelector('svg[aria-label="More options"]');
                //----the Like button to hit // await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), posts[p].tap()]);
                let likeBtn = await page.$x('//*[@aria-label="Like"]');
                if (likeBtn) {
                  //----Smash that Like btn
                  log(`    ♥ Liked post number ${p} ` + (await page.url()));
                  await page.waitForTimeout(r(500, 1000));
                  await likeBtn[1].tap();
                  await page.waitForTimeout(r(500, 1000));
                  //add comment method one
                  // const commentURL = (await page.url()) + 'comments/';
                  // await page.goto(commentURL, { waitUntil: 'networkidle2' });
                  // await page.waitForTimeout(r15);
                  // await page.tap('textarea.Ypffh');
                  // await page.waitForTimeout(r15);
                  // const thisComment = memeComments[r(0, memeComments.length)];
                  // logD(`			✎ Comment: ${thisComment}\n`);
                  // await page.type('textarea.Ypffh', thisComment);
                  // await page.waitForTimeout(r15);
                  // const postBTN = await page.$x('//button[contains(text(), "Post")]');
                  // if (postBTN) {
                  // 	await postBTN[0].tap();
                  // 	await page.waitForTimeout(r15);
                  // }
                }
              }
            }
          }
        }
      }
    }
    //BACK AND CLOSE BROWSER
    await browser.close();
    process.exit(1);
  } catch (e) {
    console.log(`--ERROR--ERROR--ERROR--ERROR\n${e}\nERROR--ERROR--ERROR--ERROR`);
    //process.exit(1);
  }
})();
