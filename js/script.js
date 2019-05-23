jQuery(function($) {

    var cardToRemove, done, answer, parent, correctAnswers, btnClicked, date,
    	today = new Date(),
        dd = String(today.getDate()),
        mm = String(today.getMonth() + 1),
        yyyy = today.getFullYear(),
        today = mm + '/' + dd + '/' + yyyy,
        dateFrom = "09/13/2019",
        dateTo = "09/15/2019",
        dateCheck = "09/13/2019",
        d1 = dateFrom.split("/"),
        d2 = dateTo.split("/"),
        c = dateCheck.split("/"),
        from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]),
        to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]),
        check = new Date(c[2], parseInt(c[1]) - 1, c[0]),
        //check if vip login
        VIP = false,
        // amt prize
        prizeAmt = {
            vip: ['88', '108', '128'],
            nonvip: ['68', '88', '108']
        },
        login = false;


    // BGM
    $('<embed id="bgm" src="audio/bgm.mp3"></embed>').prependTo('body');
    var bgm = setInterval(function() {
        $("#bgm").remove();
        $('<embed id="bgm" src="audio/bgm.mp3"></embed>').prependTo('body');
    }, 203000);

    $(".sounds").on('click', function(event) {
        $("embed#bgm").remove();
        clearInterval(bgm);
        if ($(this).hasClass('soundOn')) {
            $(this).addClass('soundOff');
            $(this).removeClass('soundOn');
            $("audio").get(0).pause();
        } else {
            $(this).addClass('soundOn');
            $(this).removeClass('soundOff');
            $("audio").get(0).play();
        }
    });




    var arrCardPath = [],
        arrCardPathBack = [];

    // cards animations
    var card1Path = {
            start: {
                x: 145,
                y: 5,
                angle: 75.057,
                length: 2.129
            },
            end: {
                x: -44,
                y: -155,
                angle: 238.350,
                length: 0.679
            }
        },
        card1PathBack = {
            start: {
                x: -44,
                y: -155,
                angle: 75.057,
                length: 2.129
            },
            end: {
                x: 145,
                y: 5,
                angle: 238.350,
                length: 0.679
            }
        },
        card2Path = {
            start: {
                x: 145,
                y: 5,
                angle: 75.057,
                length: 2.129
            },
            end: {
                x: 324,
                y: -154,
                angle: 238.350,
                length: 0.679
            }
        },
        card2PathBack = {
            start: {
                x: 324,
                y: -154,
                angle: 75.057,
                length: 2.129
            },
            end: {
                x: 145,
                y: 5,
                angle: 238.350,
                length: 0.679
            }
        },
        card3Path = {
            start: {
                x: 145,
                y: 5,
                angle: 75.057,
                length: 2.129
            },
            end: {
                x: 690,
                y: -154,
                angle: 238.350,
                length: 0.679
            }
        },
        card3PathBack = {
            start: {
                x: 690,
                y: -154,
                angle: 75.057,
                length: 2.129
            },
            end: {
                x: 145,
                y: 5,
                angle: 238.350,
                length: 0.679
            }
        },
         path = {
        start: {
            x: 270,
            y: -300,
            angle: 55.665,
            length: 1.563
        },
        end: {
            x: -88,
            y: 95,
            angle: 229.519,
            length: 0.559
        }
    };


    // card array
    arrCardPath.push(card1Path);
    arrCardPath.push(card2Path);
    arrCardPath.push(card3Path);
    arrCardPathBack.push(card1PathBack);
    arrCardPathBack.push(card2PathBack);
    arrCardPathBack.push(card3PathBack);


    // animations
    $(".c-btn").css({ 'pointer-events': 'none' });
    $('.game-cards').delay(2000).queue(function(next) {
        $(this).css({ 'z-index': '5' });
        next();
    });

    $('.gc-wrapper').addClass('scale-in-center');
    $('.gc-wrapper').animate({
        path: new $.path.bezier(path)
    }, 2000);


    // objects in page animations

    $(".gc-wrapper").delay(4200).queue(function(next) {
        $(this).removeClass('scale-in-center');
        $(this).find(".lady").addClass('float');
        $(this).find(".game-cards").addClass('float');
    });

    $(".title").addClass('bounce-in-top');
    // box shadow for cards upon showing
    $(".btn-act").on('click', function(event) {
        $(".pop,.pop-details").fadeIn();
    });

    $(".pop-close").on('click', function(event) {
        $(".pop,.pop-details,.pop-prize").fadeOut();
    });

    $(".closePrize").on('click', function(event) {
        // if last card dont throw
        removeCard(cardToRemove);

    });


    $(".loginbtn").on('click', function(event) {
        $("#Login>div:first-child, #Login>div:nth-child(2)").hide();
        $("#acct-user").delay(100).show();
        login = true;
    });

    $(".logoutbtn").on('click', function(event) {
        $("#Login>div:first-child, #Login>div:nth-child(2)").delay(100).show();
        $("#acct-user").hide();
        login = false;
    });


    // checking day to show active and inactive cards

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    var dateTentative = parseInt(getUrlParameter('date'));


    if (check >= from && check <= to) {
        if (dateTentative >= 13 && dateTentative <= 15) {
            switch (dateTentative) {
                case 13:
                    cardInitialAnimations();
                    $(".card1").css({ 'z-index': '10' });
                    cardActivation($(".card2,.card3"));
                    $(".card1").find(".c-btn").delay(6000).queue(function(next) {
                        $(this).css({ 'pointer-events': 'auto' });
                    });
                    break;
                case 14:
                    cardInitialAnimations();
                    $(".card2").css({ 'z-index': '10' });
                    cardActivation($(".card1,.card3"));
                    $(".card2").find(".c-btn").delay(6000).queue(function(next) {
                        $(this).css({ 'pointer-events': 'auto' });
                    });
                    break;
                case 15:
                    cardInitialAnimations();
                    $(".card3").css({ 'z-index': '10' });
                    cardActivation($(".card1,.card2"));
                    $(".card3").find(".c-btn").delay(6000).queue(function(next) {
                        $(this).css({ 'pointer-events': 'auto' });
                    });
                    break;
            }
        } else {

            cardActivation($(".card1,.card2,.card3"));
            comingSoonAnimation();
            $(".coming-soon").show();
            $(".coming-soon").css({ 'z-index': '15' });

        }
    }


    $(".conf-btn").on('click',  function(event) {
    	var confirm = $(this).attr("confirm-click");
    	console.log(parent);
    	if(confirm == 'true'){
    		$("."+btnClicked).css({
	            'background-image': 'url("img/btn-bg-inactive.png")',
	            // 'pointer-events': 'none'
	        });
	       $("."+btnClicked).children().css({
            'text-shadow': '4px 3px 2px #738294'
       		 });
    		$(".confirmation").fadeOut();
	            $('.card1,.card2,.card3').removeClass('counter-rotate-in-center rotate-in-center');
	            cardToRemove = parent;
	                if (check >= from && check <= to) {
	                    switch (parent) {
	                        case 'card1':
	                            getPrize(answer, correctAnswers.firstCard, parent);
	                            break;
	                        case 'card2':
	                            getPrize(answer, correctAnswers.secondCard, parent);
	                            break;
	                        case 'card3':
	                            getPrize(answer, correctAnswers.thirdCard, parent);
	                            break;
	                    }
	                }
    	}else{
    		$(".confirmation,.pop").fadeOut();
    	}
    });


    // on click of answer check if correct and if within date
    $(".c-btn").on('click', function(event) {

    	   if (login) {
		    	if ($(this).parent().parent().hasClass('cardFinish')) {
			            alert("您今日已经挑战过灯谜!");
			        } else {
			        btnClicked = $(this).attr('class');	
			        btnClicked = btnClicked.slice(0, 12);
			    	answer = $(this).attr('choice-letter');
				    parent = $(this).attr('class');
				    parent = parent.slice(0, 5);
				    // set correct answers
				    correctAnswers = {
				        firstCard: 'c',
				        secondCard: 'b',
				        thirdCard: 'a'
				    };
			    	$(".confirmation,.pop").fadeIn();
			    	
			     }
	       } else {
	           alert("请先登入帐号");
	        }
    });


    // functions

    function comingSoonAnimation() {
        $(".card1,.card2,.card3").hide();
        $(".details").delay(1000).queue(function(next) {
            $(this).slideDown("slow");
            $(this).siblings().fadeIn("slow");
            next();
        });

        $(".lady").css({ 'z-index': '10' });



    }


    function cardInitialAnimations() {
        $('.bg-overlay').delay(2000).fadeIn();
        $('.bg-overlay').delay(1500).fadeOut();
        $(".lady").delay(4200).queue(function(next) {
            $(this).css({ 'z-index': '10' });
            next();
        });


        $(".details").delay(4200).queue(function(next) {
            $(this).slideDown("slow");
            $(this).siblings().fadeIn("slow");
            next();
        });

            $('.card1').delay(2000).animate({
            path: new $.path.bezier(card1Path)
        }, 1000).addClass('rotate-in-center').delay(1000).queue(function(next) {
            $(this).removeClass('rotate-in-center');
            $(this).animate({
                path: new $.path.bezier(card1PathBack)
            }, 1000);

            $(this).addClass('counter-rotate-in-center');
            next();
        })

        $('.card2').delay(2000).animate({
            path: new $.path.bezier(card2Path)
        }, 1000).addClass('rotate-in-center').delay(1000).queue(function(next) {
            $(this).animate({
                path: new $.path.bezier(card2PathBack)
            }, 1000);
            $(this).removeClass('rotate-in-center');
            $(this).addClass('counter-rotate-in-center');
            next();
        });


        $('.card3').delay(2000).animate({
            path: new $.path.bezier(card3Path)
        }, 1000).addClass('rotate-in-center').delay(1000).queue(function(next) {
            $(this).animate({
                path: new $.path.bezier(card3PathBack)
            }, 1000);
            $(this).removeClass('rotate-in-center');
            $(this).addClass('counter-rotate-in-center');
            next();
        });

        // for (var i = 0; i < 3; i++) {
        //     var k = i + 1;
        //     console.log(arrCardPath[i], arrCardPathBack[i].start);
        //     $('.card' + k).delay(2000).animate({
        //         path: new $.path.bezier(arrCardPath[i])
        //     }, 1000).addClass('rotate-in-center')

        //     $('.card' + k).delay(1000).animate({
        //         path: new $.path.bezier(arrCardPathBack[i])
        //     }, 1000);
        //     $('.card' + k).delay(1000).queue(function(next) {
        //         $(this).removeClass('rotate-in-center').addClass('counter-rotate-in-center');
        //     })
        // }

    }


    function cardActivation(cardName) {
        cardName.css({
            'background-image': 'url("img/card-bg-inactive.png")'
        });
        cardName.find(".card-date > p").css({
            'color': '#7a8195'
        });
        cardName.find(".card-date").css({
            'border': '2px solid #888ea1'
        });
        cardName.find(".card-content > p").css({
            'color': '8e99aa'
        });
        cardName.find(".card-buttons > div").css({
            'background-image': 'url("img/btn-bg-inactive.png")',
            'pointer-events': 'none'
        });
        cardName.find(".c-btn > p").css({
            'text-shadow': '4px 3px 2px #738294'
        });

    }


    function getPrize(answer, correctAnswer, parent) {
        if (answer == correctAnswer) {
            winner(parent);
            // $(".c-btn").css({ 'pointer-events': 'none' });
        } else {
            loser(parent);
            // $(".c-btn").css({ 'pointer-events': 'none' });
        }
    }


    // winner pop up
    function winner(parent) {
        var pv = $(".prize-value");
        $(".pop-prize").removeClass('pop-lose');
        $(".pop-prize").addClass('pop-win');
        pv.removeClass('prize-val-lose');
        pv.addClass('prize-val-win');
        if (VIP) {
            switch (parent) {
                case 'card1':
                    pv.text(prizeAmt.vip[0] + '元奖金');
                    break;
                case 'card2':
                    pv.text(prizeAmt.vip[1] + '元奖金');
                    break;
                case 'card3':
                    pv.text(prizeAmt.vip[2] + '元奖金');
                    break;
            }
        } else {
            switch (parent) {
                case 'card1':
                    pv.text(prizeAmt.nonvip[0] + '元奖金');
                    break;
                case 'card2':
                    pv.text(prizeAmt.nonvip[1] + '元奖金');
                    break;
                case 'card3':
                    pv.text(prizeAmt.nonvip[2] + '元奖金');
                    break;
            }
          
        }
         $(".pop-prize").fadeIn().addClass('scale-in-center2');
          $(".prize-value").addClass('heartbeat');
    }

    // loser pop up
    function loser(parent) {
        var pv = $(".prize-value");
        $(".pop-prize").removeClass('pop-win');
        $(".pop-prize").addClass('pop-lose');
        pv.removeClass('prize-val-win');
        pv.addClass('prize-val-lose');
        if (VIP) {
            switch (parent) {
                case 'card1':
                    pv.text('88积分');
                    break;
                case 'card2':
                    pv.text('88积分');
                    break;
                case 'card3':
                    pv.text('88积分');
                    break;
            }
        } else {
            switch (parent) {
                case 'card1':
                    pv.text('88积分');
                    break;
                case 'card2':
                    pv.text('88积分');
                    break;
                case 'card3':
                    pv.text('88积分');
                    break;
            }
            
        }
        $(".pop-prize").fadeIn().addClass('scale-in-center2');
        $(".prize-value").addClass('heartbeat');
    }

    function removeCard(card) {
    		console.log(card);
        if (cardToRemove != 'card3') {
            // cards animations
            var card1PathThrow = {
                start: {
                    x: 145,
                    y: 5,
                    angle: 125.077,
                    length: 0.895
                },
                end: {
                    x: -880, //   x: -880
                    y: 852, //  y: 552
                    angle: 234.454,
                    length: 1.066
                }
            };

            	console.log(card1PathThrow);

                $("." + card).addClass('cardFinish');
                $("." + card).animate({
                    path: new $.path.bezier(card1PathThrow)
                }, 1000).addClass('counter-rotate-in-center');
                $(".coming-soon").children().hide();
                $(".coming-soon").show().css({ 'z-index': '12' });



            // cardActivation($('.' + card));
            setTimeout(function() {
                $("." + card).attr("style", "");
                $("." + card).css({
                    'z-index': '15',
                    'left': '145px',
                    'top': '5px'
                }).hide().slideDown();
            }, 1000);

            // $(".c-btn").css({ 'pointer-events': 'auto' });

        } else {
        	$(".coming-soon").children().hide();
                $(".coming-soon").show().css({ 'z-index': '12' });
            $("." + card).addClass('cardFinish');
            $("." + card).attr("style", "").fadeOut();
            $("." + card).css({
                'z-index': '20',
                'left': '145px',
                'top': '5px'
            }).hide().slideDown();

            // cardActivation($('.' + card));
            // $(".c-btn").css({ 'pointer-events': 'auto' });


        }


    }

});


// fairy dust animation


var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    canvasWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth),
    canvasHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight),
    requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
var persons = [],
    numberOfFirefly = 30,
    birthToGive = 10;

var colors = [];
/* Galactic Tea - http://www.colourlovers.com/palette/1586746/Galactic_Tea*/
colors[2] = [];
colors[2]['background'] = '#2F294F';
colors[2][1] = 'rgba(248,201,58,'; //58,201,248
colors[2][2] = 'rgba(199,176,72,'; //72,176,199
colors[2][3] = 'rgba(134,128,93,'; //93,128,134
colors[2][4] = 'rgba(244,244,158,'; //158,244,244

var colorTheme = 2, //getRandomInt(0,colors.length-1);
    mainSpeed = 1;

function getRandomInt(min, max, exept) {
    var i = Math.floor(Math.random() * (max - min + 1)) + min;
    if (typeof exept == "undefined") return i;
    else if (typeof exept == 'number' && i == exept) return getRandomInt(min, max, exept);
    else if (typeof exept == "object" && (i >= exept[0] && i <= exept[1])) return getRandomInt(min, max, exept);
    else return i;
}

function isEven(n) {
    return n == parseFloat(n) ? !(n % 2) : void 0;
}

function degToRad(deg) {
    return deg * (Math.PI / 180);
}

function Firefly(id) {
    this.id = id;
    this.width = getRandomInt(3, 6);
    this.height = this.width;
    this.x = getRandomInt(0, (canvas.width - this.width));
    this.y = getRandomInt(0, (canvas.height - this.height));
    this.speed = (this.width <= 10) ? 2 : 1;
    this.alpha = 1;
    this.alphaReduction = getRandomInt(1, 3) / 1000;
    this.color = colors[colorTheme][getRandomInt(1, colors[colorTheme].length - 1)];
    this.direction = getRandomInt(0, 360);
    this.turner = getRandomInt(0, 1) == 0 ? -1 : 1;
    this.turnerAmp = getRandomInt(1, 2);
    this.isHit = false;
    this.stepCounter = 0;
    this.changeDirectionFrequency = getRandomInt(1, 200);
    this.shape = 2; //getRandomInt(2,3);
    this.shadowBlur = getRandomInt(5, 25);
}

Firefly.prototype.stop = function() {
    this.update();
}

Firefly.prototype.walk = function() {
    var next_x = this.x + Math.cos(degToRad(this.direction)) * this.speed,
        next_y = this.y + Math.sin(degToRad(this.direction)) * this.speed;

    // Canvas limits
    if (next_x >= (canvas.width - this.width) && (this.direction < 90 || this.direction > 270)) {
        next_x = canvas.width - this.width;
        this.direction = getRandomInt(90, 270, this.direction);
    }
    if (next_x <= 0 && (this.direction > 90 && this.direction < 270)) {
        next_x = 0;
        var exept = [90, 270];
        this.direction = getRandomInt(0, 360, exept);
    }
    if (next_y >= (canvas.height - this.height) && (this.direction > 0 && this.direction < 180)) {
        next_y = canvas.height - this.height;
        this.direction = getRandomInt(180, 360, this.direction);
    }
    if (next_y <= 0 && (this.direction > 180 && this.direction < 360)) {
        next_y = 0;
        this.direction = getRandomInt(0, 180, this.direction);
    }

    this.x = next_x;
    this.y = next_y;

    this.stepCounter++;

    if (this.changeDirectionFrequency && this.stepCounter == this.changeDirectionFrequency) {
        this.turner = this.turner == -1 ? 1 : -1;
        this.turnerAmp = getRandomInt(1, 2);
        this.stepCounter = 0;
        this.changeDirectionFrequency = getRandomInt(1, 200);
    }

    this.direction += this.turner * this.turnerAmp;

    this.update();
}

Firefly.prototype.takeOppositeDirection = function() {
    // Right -> Left
    if ((this.direction >= 0 && this.direction < 90) || (this.direction > 270 && this.direction <= 360)) {
        this.direction = getRandomInt(90, 270);
        return;
    }
    // Left -> Right
    if (this.direction > 90 && this.direction < 270) {
        var exept = [90, 270];
        this.direction = getRandomInt(0, 360, exept);
        return;
    }
    // Down -> Up
    if (this.direction > 0 && this.direction < 180) {
        this.direction = getRandomInt(180, 360);
        return;
    }
    // Up -> Down
    if (this.direction > 180) {
        this.direction = getRandomInt(0, 180);
    }
}

Firefly.prototype.update = function() {

    context.beginPath();

    context.fillStyle = this.color + this.alpha + ")";
    context.arc(this.x + (this.width / 2), this.y + (this.height / 2), this.width / 2, 0, 2 * Math.PI, false);
    context.shadowColor = this.color + this.alpha + ")";
    context.shadowBlur = this.shadowBlur;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.fill();

    if (this.id > 15) {
        this.alpha -= this.alphaReduction;
        if (this.alpha <= 0) this.die();
    }

}

Firefly.prototype.die = function() {
    persons[this.id] = null;
    delete persons[this.id];
}

window.onload = function() {
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);

    start();
}

function start() {
    instantiatePopulation();
    animate();
}

function instantiatePopulation() {
    var i = 0;
    while (i < numberOfFirefly) {
        persons[i] = new Firefly(i);
        i++;
    }
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();

    // Création d'une copie de l'array persons
    persons_order = persons.slice(0);
    // Tri par ordre de position sur l'axe y (afin de gérer les z-index)
    persons_order.sort(function(a, b) {
        return a.y - b.y
    });

    // Paint les instances dans l'ordre trié
    for (var i in persons_order) {
        var u = persons_order[i].id;
        persons[u].walk();
    }

    requestAnimationFrame(animate);
}

canvas.onclick = function(e) {
    giveBirth(e, birthToGive);
}

function giveBirth(e, u) {
    var i = persons.length;
    persons[i] = new Firefly(i);
    persons[i].x = e.layerX;
    persons[i].y = e.layerY;

    if (u > 1) giveBirth(e, u - 1);
}

// stars animation

$(document).ready(function() {

    //背景星星控制
    (function() {
        var starListBox = $('.mod-star-list');
        var sectionBox = $('.ns-main-wrap .ns-section-box');
        starListBox.height(sectionBox.eq(0).height() * sectionBox.length);
        $(window).on('resize', function() {
            starListBox.height(sectionBox.eq(0).height() * sectionBox.length);
        });

        var starListInner = starListBox.find('.inner');
        var meteorSeed = 40;
        var meteorHTML = '<div class="meteor"><div class="box"></div></div>';
        var starSeed = 100;
        var starHTML = '<div class="star"><div class="box"></div></div>'
        var starListHeight = starListBox.height();
        var starListWidth = starListBox.width();

        for (var i = 0; i < starSeed; i++) {
            var starEl = $(starHTML);
            var scaleRandom = Math.random() * 1.2 + 0.3;
            starEl.css({
                '-webkit-transform': 'scale(' + scaleRandom + ')',
                '-moz-transform': 'scale(' + scaleRandom + ')',
                'transform': 'scale(' + scaleRandom + ')',
                'top': Math.random() * starListHeight + 'px',
                'left': Math.random() * starListWidth + 'px'
            });
            starEl.find('.box').css({
                '-webkit-animation-delay': Math.random() * 2 + 's',
                '-moz-animation-delay': Math.random() * 2 + 's',
                'animation-delay': Math.random() * 2 + 's',
                '-webkit-animation-duration': Math.random() * 1 + 1 + 's',
                '-moz-animation-duration': Math.random() * 1 + 1 + 's',
                'animation-duration': Math.random() * 1 + 1 + 's'
            });
            starEl.appendTo(starListInner).waypoint(function(direction) {
                $(this).find('.box').addClass('action');
            }, {
                offset: '100%',
                triggerOnce: true
            });
        }

        for (var i = 0; i < meteorSeed; i++) {
            var meteorEl = $(meteorHTML);
            var scaleRandom = Math.random() * 0.9 + 0.3;
            var rotateRandom = -100 - 5 + 'deg';
            meteorEl.css({
                '-webkit-transform': 'scale(' + scaleRandom + ') rotate(' + rotateRandom + ')',
                '-moz-transform': 'scale(' + scaleRandom + ') rotate(' + rotateRandom + ')',
                'transform': 'scale(' + scaleRandom + ') rotate(' + rotateRandom + ')',
                'top': Math.random() * starListHeight + 'px',
                'left': Math.random() * starListWidth + 'px'
            });
            meteorEl.find('.box').css({
                '-webkit-animation-delay': Math.random() * 10 + 's',
                '-moz-animation-delay': Math.random() * 10 + 's',
                'animation-delay': Math.random() * 10 + 's',
                '-webkit-animation-duration': Math.random() * 2 + 3 + 's',
                '-moz-animation-duration': Math.random() * 2 + 3 + 's',
                'animation-duration': Math.random() * 2 + 3 + 's'
            });
            meteorEl.appendTo(starListInner).waypoint(function(direction) {
                $(this).find('.box').addClass('action');
            }, {
                offset: '100%',
                triggerOnce: true
            });
        }

    })();

});