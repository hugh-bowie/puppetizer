const { r } = require('./helpers');
const fs = require('fs');

const Accounts = [

	////////////AUSSIE SHEPS
	'https://www.instagram.com/dwightsdiary/',
	//'https://www.instagram.com/myfavaussie/',
	//'https://www.instagram.com/canilsantamariapet/',
	//'https://www.instagram.com/glossy_zodiac',

];


const Comments = [
	'I underestimated you Michael. Yea, well maybe next time, you better estimate me.  ',
	'Live and let live. Im not familiar with that expression. Its a James Bond.  ',
	'I like this chair, it offers good support and is ErckleNomickly correct.  ',
	'I went to the park tryna feed the pigeons. I guess they all flew west for the winter.  ',
	'They are in for a bitter suprise... I am not to be truffled with.  ',
	'Remember, They are trying to make me an escape goat.  ',
	'You all encouraged it! You were complissit! You are all successories!  ',
	'This is like the Blair ..Witch ..Hunt ..Project.  ',
	'Jim halpert is smudge and arrogant... I think you mean smug.  Theres that arrogance.  ',
	'And it is up to me... to get rid of the curse... that hit meredith with my car.  ',
	'Nailed it!  ',
	'Dont drop the soap! Dont drop the soap!  ',
	'And you my friend, would be... Da Bell-Of-Da-Ball  ',
	"You know, stuff like.. 'Fleece it out' and 'Going mach five.'  ",
	'Well well well, how the turntables.  ',
	"Webster's Dictionary defines wedding as.. the fusing of two metals with a hot torch.  ",
	'Who is Justice Beaver?  ',
	'I am faster than 80 percent of all snakes.  ',
	'Bears...Beats...Battlestar Galactica.  ',
	"Hi, I'm Date Mike. Nice to meet me.  ",
	'Which Bear is Best?  ',
	"Sometimes I start a sentence, without knowing where it's going. I just hope I find it along the way.  ",
	'Bread is the paper of the food industry. You write your sandwich on it.  ',
	"Ain't no party like a Scranton party cause a Scranton party don't stop!  ",
	'Bob Vance, Vance Refrigeration.   ',
	'Break me off a piece of that app-le-sauce.   ',
	"Now, let's say you and I go toe-to-toe on bird law... and see who comes out the victor.  ",
	'We are at Threat Level Midnight.  ',
	'Cause... Science is a liar, sometimes.   ',
	'I love my employees even though I hit one of you with my car.  ',
	'When the king of Nigeria emails you directly, asking for help, you help.  ',
	'Rit-dit-dit-doooo!   ',
	'This is ham, soaked in rum... RUM-HAM!   ',
	"Shadynasty's Jazz Club.   ",
	'Fight Milk! The first alcoholic dairy based protein drink for bodyguards!   ',
	'Parkor... Hardcore Parkor!  ',
	'Jim and I are great friends. We hang out a ton, mostly at work.  ',
	"White-collar and blue-collar. I don't see it that way... Cause I'm collar blind.  ",
	"I'm an early bird and a night owl. So I'm wise and have worms.  ",
	"I love inside jokes. I'd love to be a part of one someday.  ",
	'I really should have a tweeter account.  ',
	'Getting hooked on MegaDesk was my fault. All I care about is Getting More MegaDesk.  ',
	'WHERE ARE THE TURTLES!?!?!  ',
	"There's no such thing as an appropriate joke. That's why it's called a joke.  ",
	"Don't ever, for any reason, do anything to anyone, for any reason, ever, no matter what.  ",
	'The only time I set the bar low is for limbo.  ',
	'I… declare…. bankruptcy!  ',
	"You miss 100% of the shots you don't take. ",
	"Occasionally, I'll hit someone with my car. So sue me.  ",
	'Why waste time say lot word when few word do trick?  ',
	'Its all about my bonus.  ',
	'42.7 percent of all statistics are made up on the spot.  ',
	"Supposedly, Recyclops's home planet was destroyed by Polluticons.  ",
	'Get back to me ASAP as possible.  ',
	'Need an ark? I Noah guy.  ',
	"I'm not usually the butt of the joke. I'm usually the face of the joke.  ",
	'I am Beyonce, always.  ',
	'And I will travel to New Zealand. And walk the Lord of the Rings trail to Mordor.  ',
	'CharDee MacDennis 2: Electric Boogaloo.  ',
	'RUM-HAMMM!  ',
	"When I discovered YouTube, I didn't work for five days.  ",
	"I love catching people in the act. That's why I always whip open doors.  ",
	'Always the Padawan, never the Jedi.  ',
	'Three words: hardworking, alpha male, jackhammer, merciless, insatiable.  ',
	"I'm not fat... I'm cultivating mass.   ",
	"You're a master of karate and friendship for everyone.  ",
	'I say dance, they say, How high?  ',
	'The eyes are the groin of the face.  ',
	'Hey Goldenface!  ',
	'Fool me once, strike one. Fool me twice, strike three.  ',
	"This is a dream that I've had since lunch… and I'm not giving it up now.  ",
	'I have a lot of questions. Number one, how dare you? ',
	"Dwigt... Wait, who's Dwigt?  ",
	'Would I rather be feared or loved? I want people to be afraid of how much they love me.  ',
	'Identity theft is not a joke, Jim!  ',
	'Why are you the way that you are?  ',
	"I am fast. I'm somewhere between a snake and a mongoose and a panther.  ",
	"How is it possible that in five years, I've had two engagements and only one chair?",
	'An office is a place where dreams come true.  ',
	'Through concentration, I can raise and lower my cholesterol at will.  ',
	'Bears. Beets. Battlestar Galactica.   ',
	"That's what she said.  ",
	"I opened this place after I came back from Vietnam... Ooh, Vietnam. I hear it's lovely.  ",
	'Fight Milk! The first alcoholic dairy based protein drink for bodyguards!  ',
	'The D.E.N.N.I.S. system.  ',
	"When Pam gets Michaels old chair, I get Pams old chair. Then I'll have two chairs.  ",
	"Your department's just you, right? Yes, Jim, but I am not easy to manage.  ",
	'Bipity bopity, gimmie the zopity.  ',
	'Dinkin Flicka.  ',
	'Fluffy-Fingers.  ',
	'The worst thing about prison was the dementors, they were flyin all over the place and were scary.  ',
	'Oh, my resolution was to get more attention.   ',
	'When someone smiles at me, all I see is a chimpanzee begging for its life.  ',
	"I'm always thinking one step ahead, like a.. carpenter.. that makes stairs.  ",
	'What was the Dentists name Dwight?  ...Crentist.  ',
	"I talk a lot, so I've learned to tune myself out.   ",
	'I Know NOTHING!!   ',
	'The Michael Scott Paper Company.  ',
	'With great power comes a great electricity bill.  ',
	'You cheated on me? After I specifically asked you not to!?   ',
	"I'm not superstitious, but I am a little stitious.  ",
	"In the end, the greatest snowball isn't a snowball at all. It's fear. Merry Christmas.  ",
	"Beef! It's what's for dinner... Who wants some man meat?   ",
	'I overslept. Damn rooster didnt crow.  ',
	'That is quite the rap sheet Prison Mike. And I never got caught neither. ',
	'Gruel Sandwiches, Gruel Omletes, plus you can eat ya own hair. ',
];


module.exports = { Accounts, Comments };
