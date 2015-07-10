function updateOrientation() {
    var classname = '';
	if(window.orientation == undefined){
		classname += "landscape";
	}else{
		if($(window).width() > $(window).height()){
			classname += "landscape";
		}else{
			classname += "normal";
		}
	}
    if (classname != 'landscape') {
        $('#game').hide();
        $('#loadingPage').hide();
		$('#rotate').show();
		$(".hidelayer").hide();

		if(started && !pause){
			clear();
			pause = true;
		}
    } else {
		$('#game').show();
        $('#rotate').hide();
        
		if (!dontpreload) {		    
		    preLoadImg();
		}

		if(started && pause){
			start();
			pause = false;
			dontpreload = true;
		}
    }
};

function createBubble(name, randomClicks) {
	//the screen position
	var x = Math.floor(Math.random() * (R - L) + L);
	var y = Math.floor(Math.random() * (B - T) + T);

	var bubble = document.createElement('img');
	bubble.setAttribute("src", "images/" + name + ".png");

	bubble.setAttribute("vx", Math.random() * 6 - 3);
	bubble.setAttribute("vy", Math.random() * 5 - 3);

	var offset = Math.floor(Math.random() * 20);
	//width between 40-120
	var w = Math.floor(Math.random() * (maxBubWidCeil - minBubWidFloor) + minBubWidFloor);

	var tempx = x - offset;
	if (tempx < 0) {
		tempx = 0;
	}
	else if ((tempx + w) > R) {
		tempx = R - w;
	}

	$(bubble).css("display", "none");
	$(bubble).css("width", w);
	$(bubble).css("top", y - offset);
	$(bubble).css("left", tempx);
	$(bubble).addClass('bubble');

	//small bubble just need click one time
	var clicks = 0;
	if (w <= middleBubWidFloor) {
		clicks = 1;
	}
	else if (w <= maxBubWidFloor) {
		clicks = 2;          
	}
	else {
		clicks = 3;           
	}
	
	if(clicks > randomClicks){
		//give up regenerate
		bubble = null;
		return 0;
	}
	
	$(bubble).attr("clickcount", clicks);
	$(bubble).attr("totalclick", clicks);
	$(".odor_container").append(bubble);
	$(bubble).fadeIn();

	if (isTablet) {
		$(bubble).bind('tap', function (e) {
			onBubbleClick($(this))
		});
	} else {
		$(bubble).bind('click', function (e) {
			onBubbleClick($(this));
		});
	}
	
	return clicks;
}

function onBubbleClick(bubble) {
	var position = bubble.position();
	$('#bottle').css({"left": position.left - 200, "top" : position.top + 100});

	$("#spray").stop().fadeIn('fast').fadeOut('fast');
	sprayClicks++;
	updatePercentage();

	var clickcount = bubble.attr("clickcount");
	clickcount--;
	if (clickcount == 0) {
		bubble.unbind();
		var position = bubble.position();
		explode(position.left, position.top, bubble);
	} else {
		bubble.attr("clickcount", clickcount);
		var totalclick = bubble.attr("totalclick");
		bubble.css("opacity", clickcount / totalclick);
	}
}

function updatePercentage() {
	var percent = Math.floor((sprayClicks / totalClicks) * 100);
	$("#percent").html(percent + '<sup>%</sup>');
}

function checkBubbleNum() {
	//return how many bubbles currently in the screen
	return $('img.bubble').length;
}

function explode(x, y,ball) {
	ball.animate({
		height: '200px',
		width: '200px',
		'border-radius': '400px',
		'-moz-border-radius': '400px',
		'-webkit-border-radius': '400px',
		opacity: 0,
		top: y,
		left: x
	}, 100, function () {
	    ball.remove();	    
		//$("#spray").hide();
	});
    //here to show flower		
	showFlower(x, y, 0);
}

function showFlower(x, y, _times)
{   
    var flower = document.createElement('img');
    flower.setAttribute("src", flowers[_times]);

    $(flower).css({ "left": x-50, "top": y-60, "display": "none","z-index":90 });
    $(".odor_container").append(flower);
    $(flower).fadeIn(30);

    _times++; 
    $(flower).fadeOut(10, function () {        
        if (_times < 5) {
            showFlower(x, y, _times);
        }
        $(flower).remove();
    });   
}

//get all images in style
function getallBgimages() {
    var url, B = [], A = document.getElementsByTagName('*');
    A = B.slice.call(A, 0, A.length);
    while (A.length) {
        url = document.deepCss(A.shift(), 'background-image');
        if (url) url = /url\(['"]?([^")]+)/.exec(url) || [];
        url = url[1];
        if (url && B.indexOf(url) == -1) B[B.length] = url;
    }
    return B;
}

document.deepCss = function (who, css) {
    if (!who || !who.style) return '';
    var sty = css.replace(/\-([a-z])/g, function (a, b) {
        return b.toUpperCase();
    });
    if (who.currentStyle) {
        return who.style[sty] || who.currentStyle[sty] || '';
    }
    var dv = document.defaultView || window;
    return who.style[sty] ||
    dv.getComputedStyle(who, "").getPropertyValue(css) || '';
}

Array.prototype.indexOf = Array.prototype.indexOf ||
 function (what, index) {
     index = index || 0;
     var L = this.length;
     while (index < L) {
         if (this[index] === what) return index;
         ++index;
     }
     return -1;
 }
