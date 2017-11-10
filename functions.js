// Browser detection for when you get desparate. A measure of last resort.
// http://rog.ie/post/9089341529/html5boilerplatejs

// var b = document.documentElement;
// b.setAttribute('data-useragent',  navigator.userAgent);
// b.setAttribute('data-platform', navigator.platform);

// sample CSS: html[data-useragent*='Chrome/13.0'] { ... }

//add extra parameters to the search url 
// $(function() {
//   $('#search input[type="submit"]').click(function(e){
//     var excludedCats = ' AND -vendor:Archive AND -tag:Insurance&type=product'
//     var new_val = $('#search input[name="q"]').val();
//     e.preventDefault();
//     location.href = '/search?q=' + new_val + excludedCats;
//   });
// });

function mycarousel_initCallback(carousel)
{
    // Disable autoscrolling if the user clicks the prev or next button.
    carousel.buttonNext.bind('click', function() {
        carousel.startAuto(0);
    });

    carousel.buttonPrev.bind('click', function() {
        carousel.startAuto(0);
    });

    // Pause autoscrolling if the user moves with the cursor over the clip.
    carousel.clip.hover(function() {
        carousel.stopAuto();
    }, function() {
        carousel.startAuto();
    });
};

cart_note={
    load:function(){
        var lines=document.getElementById('cart_note').value.match(/(^|\n)([^:]+: .*)/g)||[];
        var data={};
        for(var i=0;i<lines.length;i++){
            var match;
            if(match=lines[i].match(/^([^:]+): (.*)/))
                data[match[1].replace(/^\s+|\s+$/g,'')]=match[2];
        }
        return data;
    },
    save:function(data){
        var lines=[];
        for(name in data){
            lines.push(name+': '+data[name]);
        }
        document.getElementById('cart_note').value=lines.join('\n');
    },
    get:function(name){

        name=name.replace(/^\s+|\s+$/g,'').replace(/:/g,'_');
        var data=this.load();
        return data[name];
    },
    set:function(name,value){
        name=name.replace(/^\s+|\s+$/g,'').replace(/:/g,'_');
        var data=this.load();
        if(value==null)
            delete data[name];
        else
            data[name]=value;
        this.save(data);
    }
};

var product_mode_current='image';

function product_mode(action,href){
    if(action!='image'&&action==product_mode_current)
        return product_mode('image');
    else{
        if(action=='image')
            $('.gallery-image .image').stop(true).fadeIn();
        else
            $('.gallery-image .image').stop(true).hide();

        if(action=='rotate')
            $('.gallery-image > div > #rotate').parent().stop(true).fadeIn();
        else
            $('.gallery-image > div > #rotate').parent().stop(true).hide();

        if(action=='video'){
            var id;id=href.match(/[\?&]v=(.+?)(?:&|#|$)/i);
            if(id){
                id=id[1];
                $('.gallery-image > div.video').html(
                    '<iframe width="470" height="274" src="http://www.youtube.com/embed/'+id+'?start=3&autoplay=1" frameborder="0" allowfullscreen></iframe>'
                ).fadeIn();
            }else
                return false;
        }else
            $('.gallery-image > div.video').html('').hide();

        product_mode_current=action;

        return true;
    }
}

// remap jQuery to $
(function($){


/* trigger when page is ready */
$(document).ready(function (){
  
  	// Collection filters
    $('.filters-sidebar .filter h5').click(function(){
		$(this).parent().toggleClass('active');
    });
  
    $('#show-filters-btn').click(function() {
		$(this).toggleClass('active');
      	$('.filters-container').toggleClass('active');
    }); 
  	
  
	//Sticky filter sidebar
    if($('#filters-sidebar').length) {
      var $offsetTop = $('#filters-sidebar').offset().top - 60;
      var $filters = $('#filters-sidebar');
      
      var $footer = $('#connect-with-us-full-width');
      
      $(window).scroll(function() {
        var $curScroll = $(window).scrollTop(); 
        var $scrollBottom = $(window).scrollTop() + $(window).height();

        if($curScroll > $offsetTop) {
          $('#filters-sidebar').addClass('sticky');
          $('#collection-list-container').addClass('sticky-filters');
          
          if($footer.offset().top < ($('#filters-sidebar .filters-container').offset().top + $('#filters-sidebar .filters-container').height())) {
            $filters.addClass('reached-footer');
          }
          
          if($('#filters-sidebar.reached-footer').length) {
            if($footer.offset().top > $scrollBottom) {
              $filters.removeClass('reached-footer');
            }
          }
        } else {
          $('#filters-sidebar').removeClass('sticky');
          $('#collection-list-container').removeClass('sticky-filters');
          
          
        }
        
        // Scroll to filters button
        //if($curScroll > ($filtersBtn.offset().top + 50)) {
        if($curScroll > (($filters.offset().top + $filters.height())) - 40) {
          $('#mobile-filters-btn').addClass('active'); 
        } else {
          $('#mobile-filters-btn').removeClass('active');
        }
      });
      
      
      // Scroll to filters button   
      $('#mobile-filters-btn').click(function() {
       	  var pos = $filters.offset().top - 60;
        
          $('html, body').animate({
            scrollTop: pos
          }, 500);
      });
    }
  
  
  	// Sticky header - Desktop
    $(window).scroll(function() {
      $curScroll = $(window).scrollTop();

      if($curScroll > 126) {
        $('#nav-full-width').addClass('sticky');
        $('#header-bottom-full-width').addClass('sticky-header');
      } else {
        $('#nav-full-width').removeClass('sticky'); 
        $('#header-bottom-full-width').removeClass('sticky-header');
      }
    });  
  
  	// Sticky header - Mobile
  	$(window).scroll(function() {
      $curScroll = $(window).scrollTop();

      if($curScroll > 132) {
        $('#mobile-header').addClass('sticky');
        $('#main-wrapper').addClass('sticky-mobile-header');
      } else {
        $('#mobile-header').removeClass('sticky');
        $('#main-wrapper').removeClass('sticky-mobile-header');
      }
    });
  
  	

	$('#slider').bxSlider({
		mode: 'fade',
		auto: true,
      	responsive: true,
      	onSliderLoad: function(){
          //$("#slider > div").css("visibility", "visible");
          $('#slider').css({'visibility': 'visible', 'height': 'auto'});
        }
	}); 
  
  	// Home links slider
    /*$('#home-links-slider').bxSlider({
      mode: 'fade',
      auto: true,
      responsive: true
    });*/
  
  	/* News slider */
  	$('#article-slider').bxSlider({
        mode: 'fade',
        auto: true,
        responsive: true,
    });
  
  	// Product carousel
  	$('#product-carousel').jcarousel({
		scroll: 4,
		animation: 'slow',
		auto: 5,
		wrap: 'last',
    initCallback: mycarousel_initCallback
	});
  
    if($(window).width() < 991) {
		$('#product-carousel').jcarousel({
            scroll: 2,
            animation: 'slow',
            auto: 5,
            wrap: 'last',
        	initCallback: mycarousel_initCallback
        });
    }
  
    if($(window).width() < 767) {
		$('#product-carousel').jcarousel({
            scroll: 1,
            animation: 'slow',
            auto: 5,
            wrap: 'last',
        	initCallback: mycarousel_initCallback
        });
    }
  
  
	// Brand carousel
	$('#brand-carousel').jcarousel({
		scroll: 4,
		animation: 'slow',
		auto: 5,
		wrap: 'last',
    initCallback: mycarousel_initCallback
	});
  
    if($(window).width() < 991) {
		$('#brand-carousel').jcarousel({
            scroll: 2,
            animation: 'slow',
            auto: 5,
            wrap: 'last',
        	initCallback: mycarousel_initCallback
        });
    }
  
    if($(window).width() < 767) {
		$('#brand-carousel').jcarousel({
            scroll: 1,
            animation: 'slow',
            auto: 5,
            wrap: 'last',
        	initCallback: mycarousel_initCallback
        });
    }
  
  
  	// home stocklist
	$('.more-logos a').click(function() {
		$('.hidden-logos').slideToggle();
		$(this).toggleClass('clicked');
		if ( $(this).hasClass('clicked') ) {
			$(this).html('View Less BRANDS');
		} else {
			$(this).html('View ALL BRANDS');
		};
		return false;
	});
  

    // $('.megamenu').megamenu({
    //     'show_method':'fadeIn',
    //     'hide_method': 'fadeOut',
    //     'activate_action' : 'click',
    //     'enable_js_shadow': false
    // });

    // Drop Down
    $('div.dd').hide();
    $('nav > ul > li').hover(function(){
        $(this).find('div.dd:eq(0)').stop(true,true).show();//slideDown();
        $(this).find('a:eq(0)').addClass('hover');
     },
     function(){
        $(this).find('div.dd').stop(true,true).hide();//slideUp();
        $(this).find('a:eq(0)').removeClass('hover');
    });

    // Tabs
    $('#tabs').each(function() {
        $(' .tab-item:eq(0)').fadeIn();
        $(this).find('.tab-nav ul li a').on('click', function() {
            if ( !$(this).hasClass('active') ) {
                var tabIndex = $(this).parents('#tabs:eq(0)').find('.tab-nav ul li a').index(this);
                $(this).parents('#tabs:eq(0)').find('.tab-content .tab-item').hide();
                $(this).parents('#tabs:eq(0)').find('.tab-nav ul li a').removeClass('active');
                $(this).addClass('active');
                $(this).parents('#tabs:eq(0)').find('.tab-content .tab-item:eq('+tabIndex+')').fadeIn();
            };
            return false;
        });
    });

    $('a[href="#tab_finance"]').on('click',function(){
        //$('.tabs .tab-nav ul li a').eq(2).click();
        if ( !$('#tabs .tab-nav ul li:eq(3) a').hasClass('active') ) {
                var tabIndex = 3;
                $('#tabs .tab-nav ul li:eq(3) a').parents('#tabs:eq(0)').find('.tab-content .tab-item').hide();
                $('#tabs .tab-nav ul li:eq(3) a').parents('#tabs:eq(0)').find('.tab-nav ul li a').removeClass('active');
                $('#tabs .tab-nav ul li:eq(3) a').addClass('active');
                $('#tabs .tab-nav ul li:eq(3) a').parents('#tabs:eq(0)').find('.tab-content .tab-item:eq('+tabIndex+')').fadeIn();
            };
    });

    // Single product gallery
    $('.gallery-thumbs a').click(function(e) {
        e.preventDefault();
        $('.gallery-image img:not(.zoom)').attr('src',this.href);
        var url=this.href.replace(/_large(?=.jpe?g(\?|$))/,'');
        $('.gallery-image a.image').hide().attr('href',url);
        $('.gallery-image img.zoom').attr('src',url);
        product_mode('image');
        return false;
    });

    (function(){
        var visible=false;
        $('.gallery-image .image').hover(function(){if(!visible){
            $(this).click(function(){return false;}).css({cursor:'default'});
            $(this).find('.zoom').stop(true,true).fadeIn();
            visible=true;
        }},function(){if(visible){
            $(this).find('.zoom').stop(true,true).fadeOut();
            visible=false;
        }}).mousemove(function(event){
            var
                offset=$(this).offset(),
                size=$(this).size(),
                width=$(this).innerWidth(),
                height=$(this).innerHeight(),
                x=(event.pageX-offset.left)/width,
                y=(event.pageY-offset.top)/height
            ;
            var zoom = $(this).find('.zoom');
            zoom.css({
                left:-x*(zoom.outerWidth()-width),
                top :-y*(zoom.outerHeight()-height)
            });

        });
    })();

    // $( "#slider-range" ).slider({
    //             range: true,
    //             min: 0,
    //             max: 1000,
    //             values: [ 0, 1000 ],
    //             slide: function( event, ui ) {
    //             $( "#amount" ).val( "£" + ui.values[ 0 ] + " - £" + ui.values[ 1 ] );
    //         }
    //         });
    //         $( "#amount" ).val( "£" + $( "#slider-range" ).slider( "values", 0 ) +
    //             " - £" + $( "#slider-range" ).slider( "values", 1 ) );


  	// Mobile navigation
    $('#mobile-menu-btn').click(function() {
		//$('#nav-full-width nav ul').toggleClass('active');
      	//$('#nav-full-width').toggleClass('menu-active');
      	$('#mobile-navigation > ul').toggleClass('active');
      	$('#mobile-navigation').toggleClass('menu-active');
      	$('#mobile-search').removeClass('active');
    });
  
  	// Mobile navigation sub menu
    $('#mobile-navigation .sub-menu-btn').click(function() {
		$(this).parent().toggleClass('sub-menu-active');
    });
  
  	// Mobile search
    $('#mobile-search-btn').click(function() {
		$('#mobile-search').toggleClass('active');
      	$('#mobile-navigation > ul').removeClass('active');
    });
  
  	$('#mobile-home-menu li a.sub-menu').click(function() {
		$(this).parent().toggleClass('active');
    });
  
  	// Discover more
    $('#discover-more h3').click(function() {
		$('#discover-more ul').toggleClass('active');
     	$(this).toggleClass('active');
    });
  
  	// Mobile brand subcat list
    $('#collections-header').click(function() {
		$('#collections-list').toggleClass('active');
      	$(this).toggleClass('active');
    });
  
  	// Diamond collection show more
    $('#collections-btn').click(function() {
		$('#brand-description-container .image ul.more-collections li').toggleClass('active');
    });
  
  	// jQuery UI mobile fix
  	$('#finance_slider').draggable();
  
  
  
  	// New collection header
    $('#coll-read-more-btn').click(function() {
		$(this).addClass('inactive');
      	$('.description.has-gradient').removeClass('has-gradient');
      	$('.description .gradient').addClass('inactive');
      	$('#coll-read-less-btn').removeClass('inactive');
    });
  
  	$('#coll-read-less-btn').click(function() {
        $(this).addClass('inactive');
      	$('.description').addClass('has-gradient');
      	$('.description .gradient').removeClass('inactive');
      	$('#coll-read-more-btn').removeClass('inactive');
    });
  
    $('#close-services-btn').click(function() {
		$('.shop-services').addClass('inactive');
    });
  
  
});


/* optional triggers

$(window).load(function() {

});

$(window).resize(function() {

});

*/


})(window.jQuery);
