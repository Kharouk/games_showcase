# Started a basic tutorial on Godot, ended up building a Games Showcase
## Date: April 25th, 2020

I was having a shower yesterday, and I started thinking about a present to get for my young 9 year old brother. His birthday is coming up in the shower, and I wanted to get him something nice. Not another book or lego set, since I'm not even sure if I'll be able to see him during this quarantine. Him being out of the country makes it harder. So I thought about games; he's always enjoyed playing games that I had on my phone, and I personally believe the right video game can really help you cognatively and tell a great story. So I thought, why not build him a game where he saves the world?

## Choosing the Game Engine
Immediately I was excited myself, I always wanted to learn game development and thought this would be an awesome win/win situation, where he would get a game dedicated to him for his birthday, and I would learn to start building games. It's a big task, but I've got a couple of months. First I spent some time analyzing some game engine choices. 

### Phaser
I started looking at Phaser, as I'm quite familiar with Javascript. I wondered if I could build something using Phaser, React, Typescript, and potentially Electron. However as I got deeper in the research, I've learned that frameworks like React or Electron, whilst can do it, will take me some time getting set up. Although projects like [TwilioQuest]() are inspirational, I decided to hold off replicating a project like that.

I thought about just using static html pages with Phaser's framework, but I wanted to move away from Javascript for the time being, as it's something I already use daily at work. 

### Unity
Now in the last year, I would occasionally dip into Unity, following some random tutorial here and there. Since I've never stuck to those tutorials, times have changed and they soon were deprecated and required more setting up. Now I could've just learned myself through the docs, but I thought to myself that since I'm just beginning getting into Game Dev, that I will eventually use Unity constantly. Also it's a powerhouse for what I wanted to do. Whilst Unity is a great choice, I'm going to hold off using it. That day will come.

### Godot
I've had an eye on Godot since it's open source release. Monitoring the community, it seems like a fantastic free game engine that excels at 2D Game Design and the GDScript looks similar to Python, a language I'm keen to master sooner than later. Luckily, a youtuber by the name of [Heartbeast] recently released a course on Godot in its modern state, alongside a free Action-RPG tutorial that looks perfect to follow along with as I build my brother's game. It felt like the right tool, and a great option to use as my first Game project. So, I chose Godot.

## Building Hello World with Rocketman
I followed along the course, learning the basics of Godot. Introduced myself to the language, as well as basic understanding of what is a Node in Godot. About 'calling down' to a child, or 'signalling up' to the parent. After following the [basic tutorial](), I built RocketMan, a simple game where you press a launch button to let the rocket blast off into the air. Not completely satisfied with the tutorial, I decided to explore a bit more of Godot, adding sound, importing animated sprites using Aseprite, and adding a simple title.

In the end, it was the tutorial game with my own added twist, the story of that Summer in 1969 where humankind touched foot on the moon. Whilst the game is stupidly simple, I was proud to give it a bit of a story.

Now, you must be thinking, (as was a part of my brain), that I would continue to the next tutorial. Nope. I diverged. Went off the track. I instead thought *wouldn't it be cool to build a site to host dev logs and my journey to Game Development?* Which is fine, but I took it a step further. I wanted to ignore sites like Netlify or Heroku. At the same time, I wanted to explore AWS a bit more, as well as learn to set up free HTTPS certificates with LetsEncrypt. Not only that, but Google's `.dev` domain has been released for a while now, and I was keen on getting a domain name. I wanted to set up a new express server, with a backend managing my game uploads (if ported to the web), and a frontend managing presentation and this blog. Well, good news I did just that. Bad news, there were major hurdles I had to jump over to get here.

## Lost Memories and Rookie Mistakes
I have a website (on hiatus) for my portfolio. It's at kharo.uk. It uses Gatsby, Netlify, and a few other extreme solutions to a basic site. It's not done, and I'm not sure if it will ever be done. Maybe I could've used this time building that? Maybe, but when I have a drive, I tend to go all systems throttle.

Anyways I tried adding RocketMan's static files into that project, figuring out how the hell can I use React and Gatsby to display the content. It was near impossible with my current knowledge, and I know it will be a hassle to learn. I eventually realised that the tech stack for that website just isn't suited for what I want to do with this site. I just want a backend server hosting the games, and I decided not to convert kharo.uk to have a node server; *keep it simple, stupid* is the quote, and I'd go on to add *keep it separate, dummy.*

So I decided to go back to my web dev learning roots, and just use express, and have an optimized react build as my frontend. I set up a new project, and all it's using is React and Typescript, as well as Express with experimental modules and Typescript.

Boy, it took me a while to set up Express. I remember building AirBnB clones with tutorials or Instagram with Rails following tutorials or during my time at Makers Bootcamp, but when I got down to it, I forgot everything. 

*How Do I load static files?* 
*How do routes work again?*
*Why do I need bodyParser required?*

Anyways, eventually memories came back as I browsed Express' docs. I managed to host all the files needed for the Godot exported game for the web (which uses wasm, which I thought was cool). Great; now the super familiar and easy part of setting up React in the project with `create-react-app` (I could've done it manually, and set up my own babel/webpack config but at this point I already spent a lot of time exploring and setting up, that I just wanted to go back to the tutorial and code games again).

Great, the game runs locally, and node is set up to display both my React app and the routes for the game. Next, I had to host it all.

## The Great Search for the Correct Setup: NGINX, Node, PM2, AWS EC2, Google Domains, CertBot
This was the longest step, spanning yesterday and this morning. I started with setting up a server on the cloud. Beforehand I used digital ocean, where my kharo.uk site is hosted. It would've been easier for me to just set it up there again, but I want to explore more of AWS. I decided to set up a Ubuntu server version 20.04 (Although it's the latest version, it would come back to haunt me) and launched. Great.

I sshed into the server and git cloned my project. I did all the setup, installing node, npm, nginx, pm2, etc. This was my first experience with nginx and it was a bit overwhelming at first glance, but shortly I understood it's purpose and how it disguises the connection to port 80 by reverse proxying to whatever port is open that's running the node server. Great, I thought. *Easy*. I got the page live and I could see it on my EC2 Ip address, but it wasn't connected to my Google Domain yet.

I then added the correct hostnames for `@` and `www` in the google domain settings, but I did see a warning. Google doesn't allow http connection to their `.dev` domains, so I had to serve it with an SSL certificate. I knew this already, and begun looking into CertBot. Now here is where the problems started.

I ran into multiple issues. When I tried installing `python-certbot-nginx` it would have trouble finding it, recommending me to use the python3 version. I tried that but would be bombarded with the same error that `module 'acme.challenges' has no attribute 'TLSSNI01'`. I learned that acme doesn't [support that TLS anymore](https://www.digitalocean.com/community/questions/let-s-encrypt-acme-tls-sni-01-end-of-life), but it's being called somewhere in my packages. It would be rough trying to find out how to fix that, and the issues posted all around github weren't very helpful. I briefly skimmed over something related to Ubuntu 20.04, but I thought surely there must be a fix. I spent the evening pondering, until finally I called it quits. 

I ran into an issue this morning where I wasn't able to ssh into my instance, and I realised I set up a firewall last night where I didn't enable OpenSSH. *Fantastic*. So I had to essentially terminate that instance and set everything up again from scratch. Again, I used 20.04 version of Ubuntu. I spent a lot of time just trying to debug why it wasn't working. I tried different methods but eventually gave up. I also started having trouble with NGINX configs because I was following a few different threads of fixing the issue. Eventually I scrapped this, and decided that maybe that brief mention of 20.04 was worth investigating.

## Third time's the charm.
So I set up another EC2 instance, this time using Ubuntu 18.04, and did the whole shebang. Downloaded the packages, set up nginx files, and tried installing that certbot package again, with crossed fingers. It worked! No warnings telling me there was no Release info. So I tried to run the `certbot --nginx`, crossing my toe fingers as well. It worked like a charm, even updating my nginx config for me! I was over the moon. Lastly, I changed the ip address on Google to point to this new ec2 instance, patiently waiting for the DNS to update, by rapidly hitting refresh. Finally I saw the React app logo appear! I was so excited, I raised my fist up in the air, like I just finished Breakfast Club. Finally, I got a node server set up using React, learned a lot about nginx and certbot/letsencrypt, how to set it all up with ec2 and google domains, and now you can play the game over a secure connection. 

Maybe I should go back to that tutorial now..

## Uber helpful links that helped me get this set up:
- [Certbot's site](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx)
- [Blog on setting up NGINX](https://medium.com/@utkarsh_verma/configure-nginx-as-a-web-server-and-reverse-proxy-for-nodejs-application-on-aws-ubuntu-16-04-server-872922e21d38)
- [Digital Ocean Blog on setting up SSL](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04#step-5-%E2%80%94-verifying-certbot-auto-renewal)
- [Traversy Gist for High Level setting up](https://gist.github.com/bradtraversy/cd90d1ed3c462fe3bddd11bf8953a896)

## Further Actions 
- [] Set up Autorenewal for LetsEncrypt
- [] Fix RocketMan sound glitch
- [] Get this blog live..
- [] Look into NGINX caching