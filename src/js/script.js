import "jquery";
import "@fancyapps/fancybox";
import "jquery-ui";
import "jquery-ui-bundle";
import "slick-slider";

$(document).ready(function () {

	//Инициализация слайдера на главной
	$(".main-slider").slick({
		dots: true,
		arrows: true,
		autoplay: true,
		autoplaySpeed: 4000,
	});

	//Инициализация слайдера с партнерами
	$(".partners-slider").slick({
		slidesToShow: 6,
		slidesToScroll: 1,
		arrows: true,
		variableWidth: true,
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
	
	//Инициализация слайдера с плюсами
	if ($(window).width() < 768) {
		$('.main-feautures__block').slick({
			infinite: false,
			dots: true
		});
	};



	$('.js-modal-product-slider-nav .product-slider__slide').on('click', (e) => {
		const $el = $(e.target);
		$el.trigger('click');
	});

	$('.js-product-slider-for').on('click', () => {
		$('.js-modal-product-slider-for').css('opacity', 0);
		$('.js-modal-product-slider-nav').css('opacity', 0);

		$.fancybox.open({
			src  : '#modal_photo',
			type : 'inline',
			opts : {
				touch : false,
				afterShow : function( instance, current ) {
					$('.js-modal-product-slider-for').slick("getSlick").refresh();
					$('.js-modal-product-slider-nav').slick("getSlick").refresh();
					$(".js-modal-product-slider-for").fadeTo("slow", 1);
					$(".js-modal-product-slider-nav").fadeTo("slow", 1);
				}
			}
		});
	});

	//Инициализация слайдера в карточке с товаром
	$('.js-product-slider-nav').on('afterChange', function (event, slick, currentSlide, nextSlide) {
		let i = currentSlide ? currentSlide : 0;
		$('.js-modal-product-slider-nav').slick('slickGoTo', i);
	});
	
	$(".js-product-slider-for").slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		speed: 500,
		asNavFor: ".js-product-slider-nav"
	});
	$(".js-product-slider-nav").slick({
		infinite: false,
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: ".js-product-slider-for",
		arrows: true,
		vertical: true,
		verticalSwiping: true,
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 3,
					vertical: false,
					verticalSwiping: false
				}
			},
			{
				breakpoint: 580,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 3,
					vertical: false,
					verticalSwiping: false,
				}
			},
			{
				breakpoint: 400,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 3,
					vertical: false,
					verticalSwiping: false,
					adaptiveHeight: true,
				}
			}
		]
	});

	$(".js-modal-product-slider-for").slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		speed: 500,
		asNavFor: ".js-modal-product-slider-nav"
	});

	$(".js-modal-product-slider-nav").slick({
		infinite: false,
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: ".js-modal-product-slider-for",
		arrows: true,
		vertical: true,
		verticalSwiping: true,
		focusOnSelect: true,
		swipe: false,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					vertical: false,
					verticalSwiping: false
				}
			},
			{
				breakpoint: 580,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					vertical: false,
					verticalSwiping: false,
					focusOnSelect: false,
				}
			},
			{
				breakpoint: 400,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					vertical: false,
					verticalSwiping: false,
					adaptiveHeight: true,
					focusOnSelect: false,
				}
			}
		]
	});

	//Инициализация табов
	$("#tabs").tabs({
		hide: {
			effect: "fade",
			duration: 75
		},
		show: {
			effect: "fade",
			duration: 75
		}
	});

	$("#login-tabs").tabs({
		hide: {
			effect: "fade",
			duration: 300
		},
		show: {
			effect: "fade",
			duration: 300
		}
	});
	
	//Инициализация слайдера в табах
	$(".tabs-slider").slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		variableWidth: true,
		responsive: [
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
				}
			}
		]
	});
	
	//Инициализация fancybox
	$("[data-fancybox]").fancybox({
		helpers: {
			media: {}
		},
		speed: 400,
	});
	
	//Инициализация маски для телефона
	$.mask.definitions['9'] = '';
	$.mask.definitions['d'] = '[0-9]';
	$("#feedback_phone, #input_p").mask("+7 (9dd) ddd-dd-dd");
	
	//Валидация
	$(".feedback-form input, .basket-form input").on("change", function() {
		if ($(this).val() == "") {
			$(this).parent().addClass("errors");
			$(this).parent().removeClass("succsess");
		} else {
			if ($(this).val() == "") {
				return;
			}
			$(this).parent().addClass("succsess");
			$(this).parent().removeClass("errors");
		}
	});


	//Анимация прокрутки страницы
	$(".navbar-menu, .navbar-fixed").on("click", "a", function (event) {
		//забираем идентификатор бока с атрибута href
		$('.navbar-fixed').addClass('nav-active');
		var id = $(this).attr("href"),
			//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;
		//анимируем переход на расстояние - top за 1500 мс
		$("body,html").animate({scrollTop: top - 60}, 700);
	});
	
	$(".mobile-menu a").on("click", function (event) {
		//забираем идентификатор бока с атрибута href
		$('.navbar-fixed').addClass('nav-active');
		var id = $(this).attr("href"),
			//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;
		//анимируем переход на расстояние - top за 1500 мс
		$("body,html").animate({scrollTop: top - 115}, 700);
	});

	//Анимация текстового блока в слайде
	$(".slick-active").find(".slide-box").addClass("slide-box__anim");
	$(".main-slider").on("afterChange", function () {
		if ($(".slick-slide").hasClass("slick-active")) {
			$(".slide-box__anim").removeClass("slide-box__anim");
			$(".slick-active").find(".slide-box").addClass("slide-box__anim");
		} else {
			$(".slide-box__anim").removeClass("slide-box__anim");
		}
	});

	//Активация кнопки "Получить КОД"
	$("#reg_phone").on("change", function () {
		if ($(this).val() != "") {
			$(".login-phone__submit").removeClass("login-phone__none");
		} else {
			$(".login-phone__submit").addClass("login-phone__none");
		}
	});

	//Убираем лэйбл, если инпут заполнен
	const $inputs = $("#input_user, #input_pass, #reg_name, #reg_phone, #reg_message, #reg_pass, #reg_repeatPass, #feedback_name, #feedback_phone, #feedback_mail, #feedback_textarea, #textarea_comment, #input_address, #input_pass, #input_e, #input_p, #input_o, #input_n, #input_f, .form-control, [name='name'], [name='phone'], .js-lawyer, [data-mask='phone-rus']");
	
	$inputs.each( (i, el) => {
		const $el = $(el);

		if ($el.val() != "") {
			$el.next().css("display", "none");
		} else {
			$el.next().css("display", "block");
		}
	});
	
	$inputs.on("change", function (e) {
		const $el = $(e.target);

		if ($el.val() != "") {
			$el.next().css("display", "none");
		} else {
			$el.next().css("display", "block");
		}
	});

	$inputs.on("blur", function (e) {
		const $el = $(e.target);
		console.log($el);

		if ($el.val() != "") {
			$el.next().css("display", "none");
		} else {
			$el.next().css("display", "block");
		}
	});
	


	//Меню при скролле
	$(window).scroll(function () {
		var navFix = $(".navbar-fixed");
		if ($(this).scrollTop() > 150 && $(this).width() > 992) {
			navFix.addClass('nav-visible');
		} else {
			navFix.removeClass('nav-visible');
		}
	});

	//Меню в мобильном
	$(".header-burger").on("click", function (e) {
		e.preventDefault();
		$(".mobile-menu").addClass("menu-active");
	});
	$(".mobile-menu__close, .mobile-menu a").on("click", function (e) {
		$(".mobile-menu").removeClass("menu-active");
	});

	//Скрываем меню, если клик был вне блока
	$(document).on("mouseup", function (e) {
		var block = $(".mobile-menu");
		if (!block.is(e.target)
			&& block.has(e.target).length === 0) {
			block.removeClass("menu-active");
		}
	});

	//Дропы в мобиле на странице с карточкой товара
	$(".product-tab__item").on("click", "a", function (e) {
		e.preventDefault();
		$(this).next().slideToggle();
		$(this).children().toggleClass("product-tab__active");
	});

	//Поле для промокода в корзине
	$(".basket-total__promo").on("change input", "input", function () {
		if ($(this).val() != "") {
			$(this).next().css({
				background: "#F73859",
				color: "#FFF"
			});
		} else {
			$(this).next().css({
				background: "#F0F0F0",
				color: "#000"
			});
		}
	});
	
	//Оплата для юр. лиц в корзине
	$('#lawyer').on('click', function() {
		$('.non-active').removeClass('non-active');
	});
	$('#lawyer').parent().prev().find('input').click(function() {
		$('.lawyer').addClass('non-active');
	});
	
	$('#lawyer_checkbox').on('click', function() {
		$(this).parent().next('.basket-form__input').toggleClass('non-active');
	});


	$(".js-delivery-link-open").on("click", ()=>{
		$("#tabs").tabs( "option", "active", 4 );
		$(".js-delivery-link ").click();
	});

});


