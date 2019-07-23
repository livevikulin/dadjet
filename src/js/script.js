import "jquery";
import "slick-slider";

$(document).ready(function () {

	//Инициализация слайдера на главной
	$('.main-slider').slick({
		dots: true,
		arrows: false,
		// autoplay: true,
		// autoplaySpeed: 4000
	});
	
	//Анимация текстового блока в слайде
	$('.slick-active').find('.slide-box').addClass('slide-box__anim');
	$('.main-slider').on('afterChange', function(){
		if ($('.slick-slide').hasClass('slick-active')) {
			$('.slide-box__anim').removeClass('slide-box__anim');
			$('.slick-active').find('.slide-box').addClass('slide-box__anim');
		} else {
			$('.slide-box__anim').removeClass('slide-box__anim');
		}
	}); 
		
});