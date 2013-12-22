(function(moduleName, window) {
	var from = function(selectorOrElement, selectedPlugins) {
			var parent = selectorOrElement.blur ? selectorOrElement : document.querySelector(selectorOrElement),
				slides = [].slice.call(parent.children, 0),
				activeSlide = slides[0],
				listeners = {},

				activate = function(index, customData) {
					if (!slides[index]) {
						return;
					}

					fire('deactivate', createEventData(activeSlide, customData));

					activeSlide = slides[index];

					slides.map(deactivate);

					fire('activate', createEventData(activeSlide, customData));

					addClass(activeSlide, 'active');
					removeClass(activeSlide, 'inactive');
				},

				deactivate = function(slide, index) { 
					var offset = index - slides.indexOf(activeSlide),
						offsetClass = offset > 0 ? 'after' : 'before';

					['before(-\\d+)?', 'after(-\\d+)?', 'active',  'inactive'].map(removeClass.bind(0, slide));

					slide != activeSlide &&
						['inactive', offsetClass, offsetClass + '-' + Math.abs(offset)].map(addClass.bind(0, slide));
				},

				slide = function(index, customData) {
					fire('slide', createEventData(slides[index], customData)) && activate(index, customData);
				},

				step = function (offset, customData) {
				    var slideIndex = slides.indexOf(activeSlide) + offset;
				    var prevSlideIndex = slides.indexOf(activeSlide) - offset;
				    var nextSlideIndex = slideIndex + offset;

				        if (slideIndex > 0 && slideIndex < slides.length - 1) {
				            if (activeSlide.clientWidth != slides[prevSlideIndex].clientWidth || activeSlide.clientWidth != slides[nextSlideIndex].clientWidth) {
				                adjustNav();
				            }

				            fire(offset > 0 ? 'next' : 'prev', createEventData(activeSlide, customData)) && activate(slideIndex, customData);

				            if (activeSlide.clientWidth != slides[prevSlideIndex].clientWidth || activeSlide.clientWidth != slides[nextSlideIndex].clientWidth) {
				                adjustCss();
				            }
				        }
				},

				on = function(eventName, callback) {
					(listeners[eventName] || (listeners[eventName] = [])).push(callback);

					return function() {
						listeners[eventName] = listeners[eventName].filter(function(listener) {
							return listener != callback;
						});
					};
				},

				fire = function(eventName, eventData) {
					return (listeners[eventName] || [])
						.reduce(function(notCancelled, callback) {
							return notCancelled && callback(eventData) !== false;
						}, true);
				},

				createEventData = function(slide, eventData) {
					eventData = eventData || {};
					eventData.index = slides.indexOf(slide);
					eventData.slide = slide;
					return eventData;
				},

				deck = {
					on: on,
					fire: fire,
					slide: slide,
					next: step.bind(0, 1),
					prev: step.bind(0, -1),
					parent: parent,
					slides: slides
				};

			addClass(parent, 'parent');

			slides.map(function(slide) {
				addClass(slide, 'slide');
			});

			for (var pluginName in selectedPlugins) {
				plugins[pluginName](deck, selectedPlugins[pluginName]);
			}

			activate(1);

			decks.push(deck);

			return deck;
		},

		decks = [],

		addClass = function(el, cls) {
			el.classList.add(moduleName + '-' + cls);
		},

		removeClass = function(el, cls) {
			el.className = el.className
				.replace(RegExp(moduleName + '-' + cls +'(\\s|$)', 'g'), ' ')
				.trim();
		},

		callOnAllDecks = function(method) {
			return function(arg) {
				decks.map(function(deck) {
					deck[method](arg);
				});
			};
		},

		bindPlugin = function(pluginName) {
			return {
				from: function(selectorOrElement, selectedPlugins) {
					(selectedPlugins = selectedPlugins || {})[pluginName] = true;
					return from(selectorOrElement, selectedPlugins);
				}
			};
		},

		makePluginForAxis = function(axis) {
			return function(deck) {
				var startPosition,
					delta;

				document.addEventListener('keydown', function(e) {
					(
						e.which == 34 || // PAGE DOWN
						e.which == 32 || // SPACE
						axis == 'X' && e.which == 39 || // RIGHT
						axis == 'Y' && e.which == 40 // BOTTOM
					) && deck.next();
					(
						e.which == 33 || // PAGE UP
						axis == 'X' && e.which == 37 || // LEFT
						axis == 'Y' && e.which == 38 // TOP
					) && deck.prev();
				});

				deck.parent.addEventListener('touchstart', function(e) {
					if (e.touches.length == 1) {
						startPosition = e.touches[0]['page' + axis];
						delta = 0;
					}
				});

				deck.parent.addEventListener('touchmove', function(e) {
					if (e.touches.length == 1) {
						e.preventDefault();
						delta = e.touches[0]['page' + axis] - startPosition;
					}
				});

				deck.parent.addEventListener('touchend', function() {
					Math.abs(delta) > 50 && (delta > 0 ? deck.prev() : deck.next());
				});
			};
		},

		plugins = {
			horizontal: makePluginForAxis('X'),
			vertical: makePluginForAxis('Y')
		};

	window[moduleName] = {
		from: from,
		slide: callOnAllDecks('slide'),
		next: callOnAllDecks('next'),
		prev: callOnAllDecks('prev'),
		horizontal: bindPlugin('horizontal'),
		vertical: bindPlugin('vertical'),
		plugins: plugins
	};

}('bespoke', window));



        function adjustCss() {
            var activeSlideWidth = parseInt($(".bespoke-active").children().width());
            var before1SlideWidth = parseInt($(".bespoke-before-1").children().width());
            var before2SlideWidth = parseInt($(".bespoke-before-1").children().width());
            var beforeSlideWidth = parseInt($(".bespoke-before").last().children().width());
            var after1SlideWidth = parseInt($(".bespoke-after-1").children().width());
            var after2SlideWidth = parseInt($(".bespoke-after-2").children().width());

            $.rule('.classic section.bespoke-before', 'link').remove();
            $.rule('.classic section.bespoke-before-2', 'link').remove();
            $.rule('.classic section.bespoke-before-1', 'link').remove();
            $.rule('.classic section.bespoke-after', 'link').remove();
            $.rule('.classic section.bespoke-after-2', 'link').remove();
            $.rule('.classic section.bespoke-after-1', 'link').remove();

            $.rule('.classic section.bespoke-before{}').appendTo('link')
            .css("-webkit-transform", "translate3d(" + ((before1SlideWidth + before2SlideWidth + beforeSlideWidth) * -1).toString() + "px, 0, 0)")
            .css("-moz-transform", "translate3d(" + ((before1SlideWidth + before2SlideWidth + beforeSlideWidth) * -1).toString() + "px, 0, 0)")
            .css("-ms-transform", "translate3d(" + ((before1SlideWidth + before2SlideWidth + beforeSlideWidth) * -1).toString() + "px, 0, 0)")
            .css("-o-transform", "translate3d(" + ((before1SlideWidth + before2SlideWidth + beforeSlideWidth) * -1).toString() + "px, 0, 0)")
            .css("transform", "translate3d(" + ((before1SlideWidth + before2SlideWidth + beforeSlideWidth) * -1).toString() + "px, 0, 0)");
            $.rule('.classic section.bespoke-before-2{}').appendTo('link')
            .css("-webkit-transform", "translate3d(" + ((before1SlideWidth + before2SlideWidth) * -1).toString() + "px, 0, 0)")
            .css("-moz-transform", "translate3d(" + ((before1SlideWidth + before2SlideWidth) * -1).toString() + "px, 0, 0)")
            .css("-ms-transform", "translate3d(" + ((before1SlideWidth + before2SlideWidth) * -1).toString() + "px, 0, 0)")
            .css("-o-transform", "translate3d(" + ((before1SlideWidth + before2SlideWidth) * -1).toString() + "px, 0, 0)")
            .css("transform", "translate3d(" + ((before1SlideWidth + before2SlideWidth) * -1).toString() + "px, 0, 0)")
            .css("opacity", "0.3");
            $.rule('.classic section.bespoke-before-1{}').appendTo('link')
            .css("-webkit-transform", "translate3d(" + (before1SlideWidth * -1).toString() + "px, 0, 0)")
            .css("-moz-transform", "translate3d(" + (before1SlideWidth * -1).toString() + "px, 0, 0)")
            .css("-ms-transform", "translate3d(" + (before1SlideWidth * -1).toString() + "px, 0, 0)")
            .css("-o-transform", "translate3d(" + (before1SlideWidth * -1).toString() + "px, 0, 0)")
            .css("transform", "translate3d(" + (before1SlideWidth * -1).toString() + "px, 0, 0)")
            .css("opacity", "0.3");
            $.rule('.classic section.bespoke-after{}').appendTo('link')
            .css("-webkit-transform", "translate3d(" + (activeSlideWidth + after1SlideWidth + after2SlideWidth).toString() + "px, 0, 0)")
            .css("-moz-transform", "translate3d(" + (activeSlideWidth + after1SlideWidth + after2SlideWidth).toString() + "px, 0, 0)")
            .css("-ms-transform", "translate3d(" + (activeSlideWidth + after1SlideWidth + after2SlideWidth).toString() + "px, 0, 0)")
            .css("-o-transform", "translate3d(" + (activeSlideWidth + after1SlideWidth + after2SlideWidth).toString() + "px, 0, 0)")
            .css("transform", "translate3d(" + (activeSlideWidth + after1SlideWidth + after2SlideWidth).toString() + "px, 0, 0)");
            $.rule('.classic section.bespoke-after-2{}').appendTo('link')
            .css("-webkit-transform", "translate3d(" + (activeSlideWidth + after1SlideWidth).toString() + "px, 0, 0)")
            .css("-moz-transform", "translate3d(" + (activeSlideWidth + after1SlideWidth).toString() + "px, 0, 0)")
            .css("-ms-transform", "translate3d(" + (activeSlideWidth + after1SlideWidth).toString() + "px, 0, 0)")
            .css("-o-transform", "translate3d(" + (activeSlideWidth + after1SlideWidth).toString() + "px, 0, 0)")
            .css("transform", "translate3d(" + (activeSlideWidth + after1SlideWidth).toString() + "px, 0, 0)")
            .css("opacity", "0.3");
            $.rule('.classic section.bespoke-after-1{}').appendTo('link')
            .css("-webkit-transform", "translate3d(" + (activeSlideWidth).toString() + "px, 0, 0)")
            .css("-moz-transform", "translate3d(" + (activeSlideWidth).toString() + "px, 0, 0)")
            .css("-ms-transform", "translate3d(" + (activeSlideWidth).toString() + "px, 0, 0)")
            .css("-o-transform", "translate3d(" + (activeSlideWidth).toString() + "px, 0, 0)")
            .css("transform", "translate3d(" + (activeSlideWidth).toString() + "px, 0, 0)")
            .css("opacity", "0.3");
        }

        function adjustNav() {
            var activeSlideRect = document.getElementsByClassName("bespoke-active").item(0).getBoundingClientRect();
            $("#prevNav").css("left", (activeSlideRect.left + (parseInt($("#firstImg").css("width")) * 1 / 15)).toString() + "px")
            $("#nextNav").css("left", (activeSlideRect.left + (parseInt($("#firstImg").css("width")) * 14 / 15) - $("#nextNav").width()).toString() + "px")
        }