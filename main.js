$(document).ready(function () {
    if (android) {
        $(".sofa").css("top", "210px");
        $(".table").css("top", "313px");
        $("#rebandDiv")
        $(".sprayBottle").css("bottom", "-300px");

        var height = $(window).height();
        $('.loadpagea').css("height", (height+40)+"px");
    }

    //bottlePosition = $("#bottle").position(); 
    bottlePosition = { left: $("#bottle").css("left"), top: $("#bottle").css("top") };
	updateOrientation();
	$(window).bind("resize", function (e) {
		updateOrientation();
	});	

	$('a#play').click(function(){
	    $('#howtoplay').fadeOut(function () {	        
	        $(".hidelayer").hide();
			play();
		});
	});
	
	$('a#replay1').click(function(){
	    $('#unlucky').fadeOut(function () {	       
			play();
		});
	});
	
	$('a#replay2').click(function(){
	    $('#welldone').fadeOut(function () {	        
			play();
		});
	});

	$(".facebook").click(function () {	    

	    var u = location.href;
	    var t = document.title;
	    var url =fbUrl + encodeURIComponent(u) + '&t=' + encodeURIComponent(t);
	    
	    window.open(url,"_blank");
	});

	$(".twitter").click(function () {
	    var u = location.href;
	    var t = document.title;
	    var url = twUrl + encodeURIComponent(u) + ' ' + encodeURIComponent(t);

	    window.open(url, "_blank");
	});
	
	$(".googleplus").click(function () {
	    var u = location.href;	    
	    var url = ggUrl + encodeURIComponent(u);

	    window.open(url, "_blank");
	});

	//$(".close").click(function () {
	//    window.close();
	//});
});

function play() {
    started = true;
    dontpreload = true;

	$("#secondsId").html(gameSeconds + "<sup>sec</sup>");
	$("#percent").html('0<sup>%</sup>');
	$("#spray").hide();

	remainingSeconds = gameSeconds;
	remainingClicks = totalClicks;     
	sprayClicks = 0;
	
	start();
}

function start(){
	loadBubbles();
	startTiming();
	moveBubble();
}

function loadBubbles() {
	//game is over when no seconds or no bubble any more
	if (remainingSeconds <= 0 || sprayClicks >= totalClicks) {
		gameOver();
		return;
	}
	
	var currentBubbleNum = checkBubbleNum();
	if(currentBubbleNum >= minBubblesOnScreen || remainingClicks <= 0){
		//we dont' add more
	}else{
		var randomClicks = Math.floor(Math.random() * maxIncreaseClicks);
		if(randomClicks > remainingClicks){
			randomClicks = remainingClicks;
		}	
		remainingClicks -= randomClicks;
		console.log(remainingClicks);
		while(randomClicks > 0){
			var j = Math.floor(Math.random() * (cateNameArr.length));
			var clicks = createBubble(cateNameArr[j], randomClicks);
			randomClicks = randomClicks - clicks;
		}
	}
	createTM = window.setTimeout('loadBubbles()', 1000);
}

function clear() {
	clearTimeout(createTM);
	clearTimeout(timingTM);
	clearTimeout(moveTM);
}

function gameOver() {
	started = false;
	clear();
	$(".odor_container").html("");

	//The bottle back to its original position  
	$("#bottle").css({ "left": bottlePosition.left, "top": bottlePosition.top });
	if(sprayClicks >= totalClicks){
	    $('#result').text(gameSeconds - remainingSeconds-1);
		$('#welldone').fadeIn();
	}else{
		$("#unlucky").fadeIn();
	}
}

function moveBubble() {
	$("img.bubble").each(function () {
		var vx = $(this).attr("vx");
		var vy = $(this).attr("vy");

		var num = parseInt(Math.random() * 10);
		var isOdd = num % 2 == 0 ? false : true;

		moveIt($(this), vx, vy, isOdd);
	});

	moveTM = window.setTimeout("moveBubble()", 400);
}

function moveIt(bubble, vx, vy, isOdd) {
	//bubble move
	vy = parseFloat(vy) + (Math.random() * 4 - 2);
	vx = parseFloat(vx) + (Math.random() * 4 - 2);
	var position = bubble.position();
	var left = position.left;
	var top = position.top;
	var width = bubble.width();

	if (isOdd) {
		left = left + vx;
		top = top + vy;
	}
	else {
		left = left - vx;
		top = top - vy;
	}

	//check border			
	var bc = Math.random()
	if (left + width > R) {
		left = R - width;
		vx *= bc;
	} else if (left < L) {
		left = L;
		vx *= bc;
	}
	if (top + width / 2 > B) {
		top = B - width / 2;
		vy *= bc;

	} else if (top < T) {
		top = T;
		vy *= bc;
	}

	bubble.css({ 'left': left + 'px', 'top': top + 'px' });

	bubble.attr("vx", vx);
	bubble.attr("vy", vy);

}

function startTiming() {
	if (remainingSeconds > 1) {
		remainingSeconds--
	}
	else {
		remainingSeconds = 0;
		clearTimeout(timingTM);
	}
	$("#secondsId").html(remainingSeconds + "<sup>sec</sup>");
	timingTM = window.setTimeout('startTiming()', 1000);
}

function preLoadImg() {
    /*get all imgs those tag is <img>
    var imgs = document.images;
    for (var i = 0; i < imgs.length; i++) {
        images.push(imgs[i].src);
    }
    //get all images in style
    var cssImages = getallBgimages();
    for (var j = 0; j < cssImages.length; j++) {
        images.push(cssImages[j]);
    }*/

    //load percentage's bg image first
    $.imgpreload(['images/logo.jpg', 'images/bg2.jpg', 'images/load_b.png', 'images/rotate.png',
        'images/load-pic.png', 'images/header2-bg.png', 'images/header-logo.png', 'images/header-bg.png'], function () {        
    });

    //then push all other images in array to load    
    images.push("images/teachbox.png");
    images.push("images/txt.png");
    images.push("images/sprite.png");
    images.push("images/txt2.png");
    images.push("images/btn.png");
    images.push("images/teachbox01.png");    
    //images.push("images/bg.jpg");
    images.push("images/load_a.png");
    images.push("images/get_started.png");
    images.push("images/share.png");
    images.push("images/footer.png");
    //images.push("images/line.png");
    images.push("images/fish.png");
    images.push("images/cat.png");
    images.push("images/socks.png");

    images.push("images/survey.png");
    images.push("images/f_01.png");
    images.push("images/f_02.png");
    images.push("images/f_03.png");
    images.push("images/f_04.png");
    images.push("images/f_05.png");
    images.push("images/fb.png");

    images.push("images/painting.png");
    images.push("images/footer-txt2.png");
    images.push("images/footer-txt1.png");
    images.push("images/bg02.jpg");
    images.push("images/bg01.jpg");
    images.push("images/sofa.png");
    images.push("images/table.png"); 
    images.push("images/hand.png");    

    var imgNum = 0;

    /*imgs preload*/
    $.imgpreload(images,
    {
        each: function () {
            /*this will be called after each image loaded*/
            var status = $(this).data('loaded') ? 'success' : 'error';
            if (status == "success") {                
                var v = (parseFloat(++imgNum) / images.length).toFixed(2);
                var per = (v > 1 ? 1 : v);
                $("#loadshow").html(Math.round(per * 100) + "<sup>%</sup>");                
            }
        },
        all: function () {
            /*this will be called after all images loaded*/
            $("#loadshow").html("100<sup>%</sup>");
			
            $("#loadingPage").fadeOut(100, function () {
                $("#howtoplay").show();
                $(".main").show();
                $(".hidelayer").show();
            });                     
        }
    });
}

    //var t = window.setTimeout("preLoad()", 100);
    function preLoad() {
        $("#loading div").animate({ width: step + "px" }, 50).text(step + "%");
        step += 1;
        if (step <= 100) {
            //t = window.setTimeout("preLoad()", 100);
        } else {
            clearTimeout(t);
            $("#loading").fadeOut(1000);
            $("#preloadImg").fadeOut(1000);
            $("#howtoplay").show();
            $(".main").show();
    }
}
