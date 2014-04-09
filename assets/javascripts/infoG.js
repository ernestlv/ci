$(document).ready(function(){
				var $infoG        = $('.infoG');
				var navPos        = $('#infoG').offset().top;
				var insideInfoG   = false;
				var isPhone       = false;
				var isIE8         = /ie8/.test(document.documentElement.className);
				var activeSection;

				if (window.matchMedia && window.matchMedia("max-width : 40em").matches) { //640	
					isPhone = true;
  				}

  				function parallaxScroll(){
  					if (activeSection){
						  var scrolled = $infoG.scrollTop();
						  var x, el, pos, speed;
						  for (i=0; i<activeSection.length; i++){
						  	x = activeSection[i];
						  	el = x.node;
						  	pos = x.pos;
						  	speed = x.speed;
						  	if (speed === 0){
							  	//console.log('animating', el.id, pos, scrolled, pos + scrolled );
							  	el.style.top = ( pos + scrolled ) + 'px';
							  }else{
							  	//console.log('animating', el.id, pos, scrolled, (pos - ( scrolled * speed )));  	
				  			  	el.style.top = ( pos - scrolled * speed ) + 'px';
							  }
						  }
					}
  				}

				function scrollToInfoG(callback){
					insideInfoG = true;
					$('html, body').animate({
						scrollTop: $('#infoG').offset().top
					}, 250);
					//location = '#infoG';
				}

				function enterInfoG(){
					//console.log('enter infoG', insideInfoG)
						//var winPos = $(window).scrollTop();
						//if ( winPos !== navPos ){
							//scrollToInfoG();
						//}

					insideInfoG = true;	
				}

				function exitInfoG(e){
					//console.log('exit infoG')
					insideInfoG = false;
				}

				function openInfoG(e){
					e.preventDefault();

					$('.infoG-nav').removeClass('intro');


					//highlight nav option
					var $navOption = $('.infoG-nav a.active');
					$navOption.removeClass('active');
					$navOption = $(this); //selected option
					$navOption.addClass('active');

					//show section
					id = $navOption.attr('href'); //selected section id
					var $section = $('.infoG .section.active');
					$section.removeClass('active');
					$section = $(id);
					$section.addClass('active');
					if (parallaxSections){  //mobile does not have parallaxSections
						activeSection = parallaxSections[id];
					}
					//console.log(id)
					
					$infoG.scrollTop(1);  //we need to scroll 1px so the scroller position is reset when switching sections
					parallaxScroll();     //this is suppose to be called on scrolltop but it is not so we explicitly call it
					scrollToInfoG();	  //this center the top nav at the top of the 	
				}

				function closeInfoG(e){
					e.preventDefault();
					delete activeSection;
					$('.infoG .section.active').removeClass('active');
					$('.infoG-nav a.active').removeClass('active');
					$('.infoG-nav').addClass('intro');
					location = '#infoG-Title';
				}

				function createPiece(el){
					var $node = $(el);
					var node = $node[0];
					var top = $node.data('top');
					if (top){
						node.style.top = top;
					}
					var zindex = $node.data('zindex');
					if (zindex){
						node.style.zIndex = zindex;
					}
					var speed = $node.data('speed');
					speed = isNaN( speed ) ? 1 : speed; 
					return {
						node  : node,
						pos   : node.offsetTop,
						speed : speed
					};
				}

				function createParallax(el){
					var bag = [];
					$(el).find('.parallax .layer').each(function(){
						bag.push(createPiece(this));
					});
					return bag;
				}

				function createParallaxSections(){
					var bag ={};
					//debugger
					bag['#burger']   = createParallax('#burger');
					bag['#tuna']     = createParallax('#tuna');
					bag['#med']      = createParallax('#med');
					bag['#car']      = createParallax('#car');
					bag['#building'] = createParallax('#building');
					bag['#cup']      = createParallax('#cup');

					return bag;
				}

				if (!isIE8 & !isPhone){
					$infoG.hover(enterInfoG, exitInfoG);

					$infoG.scroll(parallaxScroll);

					var parallaxSections = createParallaxSections();
				}

				$infoG.addClass('ready');

				//bind events
				$('.infoG-nav').on('click', 'li a', openInfoG);

				$('.close-infoG').on('click', closeInfoG);

				/* window.onresize = function(){
					if (insideInfoG){
						scrollToInfoG();
						$infoG.scrollTop(1);  //we need to scroll 1px so the scroller position is reset when switching sections
						parallaxScroll();
					}
				};  */

});