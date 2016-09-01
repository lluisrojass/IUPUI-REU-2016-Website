/*=============================
===============================
* REU CSS V1
* Copyright 2015, Luis Rojas
* www.builtbyluis.com
* 7/28/2015
===============================
=============================*/

//*===============================================*//
//*============================= HEADER STICKY ===*//	
//*===============================================*//	

window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(f){return setTimeout(f, 1000/60)};	
	(function($) { 
			var $body,
			$target,
			stickyClassName = "sticky",
			$targetScrollPos
			,resizingTimer;
			
			function updateOffset(){
				$targetScrollPos = $target.offset().top
			}	
		
			function adhere(){
				var $documentScrollTop = $(document).scrollTop();
				if ($documentScrollTop >= $targetScrollPos) {
					if (!$body.hasClass(stickyClassName)) {
						$body.addClass(stickyClassName)
					}
				}
				else{
					$body.removeClass(stickyClassName)
				}
			}
		
			$(window).on("load",function(){
				$body = $(document.body)
				$target = $("#header")
				updateOffset()
				requestAnimationFrame(adhere)
				$(window).on("resize",function(){
					clearTimeout(resizingTimer)
					/* setTimeout function necessary for unnecceessary method calling.
					ensures only one method call per resize operation.*/
					resizingTimer = setTimeout(function(){
						$body.removeClass(stickyClassName)
						updateOffset()
						adhere()
					},50)
				})
				
				$(window).on("scroll",function(){
					requestAnimationFrame(adhere)
				})
				
			})
		 })(jQuery)
		
//*===============================================*//
//*===========================CONTENT SWTICHING===*//
//*===============================================*//
	var contentSelectors  = {
			"_JS-SELECTOR-COMMITTEE":"committee-outer-wrapper",
			"_JS-SELECTOR-CFP":"callforpapers-outer-wrapper",
			"_JS-SELECTOR-PUBLICATIONS":"publications-outer-wrapper",
			"_JS-SELECTOR-ABOUT":"about-outer-wrapper"
	}
	
	var currentContentByButton = "_JS-SELECTOR-PUBLICATIONS";
		
	
	$(document).ready(function(){
			$("."+currentContentByButton).addClass("highlighted")
			$("[class*='_JS-SELECTOR']").click(function(){
				$($(this).attr('class').split(" ")).each(function(){
					if (contentSelectors.hasOwnProperty(this) && (this.toString() != currentContentByButton)) {
						$("." + contentSelectors[currentContentByButton]).css("display","none")
						$("." + currentContentByButton).toggleClass("highlighted")
						currentContentByButton = this.toString()
						$("."+currentContentByButton).toggleClass("highlighted")
						$("." + contentSelectors[this]).css("display","block")
					} 
				})
			})

	});	