"use strict";

(function () {
  'use strict';

  var getData = function getData() {
    return $.getJSON('data.json');
  };

  getData().then(function (data) {
    var app = {
      init: function init() {
        var self = this;
        this.$window = $(window);
        this.$container = $('.container');
        this.$sliderWiew = $('.gallery__view');
        this.$viewImg = $('.gallery__img');
        this.$sliderThumbs = $('.gallery__thumbs-wrapper');
        this.$thumbsImg = $('.gallery__thumbs');
        this.$scrollBtn = $('.scroll__btn');
        this.$rightBtn = $(".right__btn");
        this.$leftBtn = $(".left__btn");
        this.showImages(data);
        this.$thumbWrapper = $('.thumb');
        this.$thumbnail = $('.thumb__link');
        this.$thumbImg = $('.thumb__img');
        this.$spinner = $('.spinner');
        this.changeBackImage(data);
        this.$thumbImg.on('load', this.showContent.bind(this));
        this.$rightBtn.on('click', this.rightScroll.bind(this));
        this.$leftBtn.on('click', this.leftScroll.bind(this));
        setTimeout(this.scrollBtn.bind(this), 300);
        this.$window.on('mouseenter resize', this.scrollBtn.bind(this));
      },
      scrollBtn: function scrollBtn() {
        var self = this;
        var btnHeight = this.$sliderThumbs.height();
        this.$scrollBtn.css('height', btnHeight);

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          this.$scrollBtn.fadeIn(300);
        } else {
          this.$sliderThumbs.on('mouseenter mouseleave', function (evt) {
            evt.type === 'mouseenter' ? self.$scrollBtn.fadeIn(300) : self.$scrollBtn.fadeOut(300);
          });
        }
      },
      rightScroll: function rightScroll(event) {
        var self = this;
        var thWrapper = this.$thumbWrapper.last().offset();
        var thumbWidth = this.$thumbWrapper.width();
        var th = this.$thumbsImg.offset();
        var thWidth = th.left + this.$thumbsImg.width() - this.$thumbWrapper.width();

        if (thWrapper.left >= thWidth) {
          this.$scrollBtn.css('opacity', '0.6');
          this.$thumbWrapper.animate({
            right: '+=' + thumbWidth
          });
        } else {
          $(event.target).css('opacity', '0.3');
        }

        this.$scrollBtn.prop('disabled', true);
        setTimeout(function () {
          self.$scrollBtn.prop('disabled', false);
        }, 400);
        thWrapper = 0;
      },
      leftScroll: function leftScroll(event) {
        var self = this;
        var thWrapper = this.$thumbWrapper.first().offset();
        var thumbWidth = this.$thumbWrapper.width();
        var th = this.$thumbsImg.offset();

        if (thWrapper.left != th.left) {
          this.$scrollBtn.css('opacity', '0.6');
          this.$thumbWrapper.animate({
            right: '-=' + thumbWidth
          });
        } else {
          $(event.target).css('opacity', '0.3');
        }

        this.$scrollBtn.prop('disabled', true);
        setTimeout(function () {
          self.$scrollBtn.prop('disabled', false);
        }, 400);
        thWrapper = 0;
      },
      showImages: function showImages(data) {
        var thumbs = data;
        var imageSrc = [];
        var images = [];
        var i;

        for (i = 0; i < thumbs.length; i++) {
          imageSrc.push(thumbs[i].src);
        }

        for (i = 0; i < imageSrc.length; i++) {
          images[i] = new Image();
          images[i].src = imageSrc[i];
        }

        this.$sliderWiew.css('background-image', 'url(' + thumbs[0].src + '.' + thumbs[0].type + ')');

        for (i = 0; i < thumbs.length; i++) {
          this.$thumbsImg.append("<div class = \"thumb\">\n              <a href=\"".concat(thumbs[i].link, "\" class=\"thumb__link\">\n                <img class = \"thumb__img\" src = \"").concat(thumbs[i].src, "-thumb.").concat(thumbs[i].type, "\">\n              </a>\n            </div>"));
        }
      },
      changeBackImage: function changeBackImage(thumbs) {
        var self = this;
        this.$thumbnail.each(function (index) {
          $(this).on('click', function () {
            self.$sliderWiew.animate({
              opacity: 0
            }, 'fast', function () {
              self.$sliderWiew.css({
                'background-image': 'url(' + thumbs[index].src + '.' + thumbs[index].type + ')'
              }).animate({
                opacity: 1
              });
            });
          });
        });
      },
      showContent: function showContent() {
        this.$container.animate({
          opacity: '1'
        }, 1000);
        this.$spinner.fadeOut();
      }
    };
    $(document).ready(function () {
      app.init();
    });
  });
})();