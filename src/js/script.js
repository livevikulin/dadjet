import "jquery";
import "@fancyapps/fancybox";
import "jquery-ui";
import "jquery-ui-bundle";
import "slick-slider";

$(document).ready(function () {

	//Инициализация слайдера на главной
	$('.main-slider').slick({
		dots: true,
		arrows: true,
		// autoplay: true,
		// autoplaySpeed: 4000
	});
	
	//Инициализация слайдера с партнерами
	$('.partners-slider').slick({
		slidesToShow: 6,
		slidesToScroll: 3,
		arrows: true,
		variableWidth: true,
		// autoplay: true,
		// autoplaySpeed: 4000
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 580,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: true
				}
			}
		]
	});
	
	//Инициализация слайдера в карточке с товаром
	$('.product-slider__for').slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		speed: 500,
		asNavFor: '.product-slider__nav'
	});
	$('.product-slider__nav').slick({
		infinite: false,
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: '.product-slider__for',
		// centerMode: true,
		arrows: true,
		vertical: true,
		verticalSwiping: true,
		focusOnSelect: true
	});
	
	//Инициализация табов
	$('#tabs').tabs({
		hide: { 
			effect: "fade", 
			duration: 75 
		},
		show: { 
			effect: "fade", 
			duration: 75 
		}
	});
	
	$('#login-tabs').tabs({
		hide: { 
			effect: "fade", 
			duration: 300 
		},
		show: { 
			effect: "fade", 
			duration: 300 
		}
	});
	
	//Инициализация fancybox
	$('[data-fancybox]').fancybox({
		helpers : {
            media : {}
        },
        speed : 400,
	});

	//Анимация прокрутки страницы
	$(".navbar-menu, .mobile-menu").on("click","a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();
		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),
		//узнаем высоту от начала страницы до блока на который ссылается якорь
		top = $(id).offset().top;
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 700);
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
		
	//Активация кнопки "Получить КОД"
	$('#reg_phone').on('change', function() {
		if ($(this).val() != '') {
			$('.login-phone__submit').removeClass('login-phone__none');
		} else {
			$('.login-phone__submit').addClass('login-phone__none');
		}
	})
	
	//Убираем лэйбл, если инпут заполнен
	$('#input_user, #input_pass, #reg_name, #reg_phone, #reg_message, #reg_pass, #reg_repeatPass, #feedback_name, #feedback_phone, #feedback_mail, #feedback_textarea, #textarea_comment, #input_address, #input_pass, #input_e, #input_p, #input_o, #input_n, #input_f').on('change', function() {
		if ($(this).val() != '') {
			$(this).next().css('display', 'none')
		} else {
			$(this).next().css('display', 'block')
		}
	});
	
	//Счетчик для инпута
	$('.basket-availability__minus').click(function () {
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 0 ? 0 : count;
		$input.val(count);
		$input.change();
		return false;
	});
	$('.basket-availability__plus').click(function () {
		var $input = $(this).parent().find('input');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
		return false;
	});
	
	//Меню при скролле
	$(window).scroll(function () {
		var navFix = $('.navbar-fixed');
		$(window).scroll(function () {
			if ($(this).scrollTop() > 150 && $(this).width() > 992) {
				navFix.slideDown();
			} else {
				navFix.css('display', 'none');
			}
		});
	});
	
	//Меню в мобильном
	$('.header-burger').on('click', function(e) {
		e.preventDefault();
		$('.mobile-menu').addClass('menu-active');
	});
	$('.mobile-menu__close, .mobile-menu a').on('click', function(e) {
		e.preventDefault();
		$('.mobile-menu').removeClass('menu-active');
	});
	
	//Скрываем меню, если клик был вне блока
	$(document).on('mouseup', function (e){
		var block = $(".mobile-menu");
		if (!block.is(e.target)
			&& block.has(e.target).length === 0) {
			block.removeClass('menu-active');
		}
	});
});