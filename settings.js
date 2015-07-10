var createTM, timingTM, moveTM; //timers
var gameSeconds = 30, totalClicks = 20, minBubblesOnScreen = 6, maxIncreaseClicks = 20;
var cateNameArr = ['cat', 'fish', 'socks'];

//bubble area
var window_width = 0;
if(window.screen.height>window.screen.width)
	window_width = window.screen.height;
else
	window_width = window.screen.width;
var T = 200; 
var B = 400;
var L = (window_width/2) - (950/2) + 93; //screen size divide by 2 minus sofa size divide by 2 + the biggest bubble size
var R = (window_width/2) + (850/2) - 93; //screen size divide by 2 plus sofa size divide by 2 - biggest bubble size
var minBubWidFloor = 35, middleBubWidFloor = 65, maxBubWidFloor = 95, maxBubWidCeil = 110;

var isTablet = false;
var bottlePosition = null;
var remainingSeconds = 0, remainingClicks = 0, sprayClicks = 0;
var started = false, pause = false,dontpreload=false;
var step = 1;

var fbUrl = "http://m.facebook.com/sharer.php?u=";
//var twUrl = "http://twitter.com/home?status=";
//var ggUrl = "https://plus.google.com/share?url=";

var agent = navigator.userAgent.toLowerCase();
var iOS = (navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPad") != -1) ? true : false;
var android = false;
if(agent.indexOf("android") != -1)
	android = true;
if(agent.indexOf("linux") != -1)
	android = true;

if (iOS || android) {
	isTablet = true;
}

//var imgNum = 0;
var images = [];
var flowers = ["images/f_01.png", "images/f_02.png", "images/f_03.png", "images/f_04.png", "images/f_05.png"];

