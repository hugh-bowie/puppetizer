# puppetizer
Puppeteer automation scripts

## ig.js

This script automates instagram engagement without use of the restrictive instagram/fb API by using the Puppeteer Library.<br>
To avoid instagrams robust bot-detection the script uses the [puppeteer-extra-plugin-stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth) plugin, as well human-like browsing with randomly generated pauses.<br>

1. The script will login to your existing account (<b>set your credentials in .env file locally</b>) and log your profiles follower/following count.
2. The script will navigate to a page from the list of accounts with the desired demographic you provide located in <b>/src/accountList.js</b>.
3. From the starting account the script will find a random post to make a list of <b>public users with active stories</b> who liked it.
4. Using that list the script will engage (<b>View story, Like one photo and leave a comment</b>) each user account in a loop until finished. <br>

- You decide how many accounts you wish to engage (under 25 per hour is best practice to avoid detection).
- You may schedule this script to run as often as youd like using the node-schedule package by adjusting the file "src/schedule.js".
- Please test the stealth before each run using this site. [https://bot.sannysoft.com/](https://bot.sannysoft.com/).

### demo gif

![ig.js](/assets/ig-demo.gif)


