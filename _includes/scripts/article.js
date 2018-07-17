(function() {
  var SOURCES = window.TEXT_VARIABLES.sources;
  window.Lazyload.js(SOURCES.jquery, function() {
    $(function() {
      var $this ,$scroll;
      var $articleContent = $('.js-article-content');
      var hasSidebar = $('.js-page-root').hasClass('layout--page--sidebar');
      var scroll = hasSidebar ? '.js-page-main' : 'html, body';
      $scroll = $(scroll);

      $articleContent.find('.highlight').each(function() {
        $this = $(this);
        $this.attr('data-lang', $this.find('code').attr('data-lang'));
      });
      $articleContent.find('h1, h2, h3, h4, h5, h6').each(function() {
        $this = $(this);
        $this.append($('<a class="anchor" aria-hidden="true"></a>').html('<i class="fas fa-anchor"></i>'));
      });
      $articleContent.on('click', '.anchor', function() {
        $scroll.scrollToAnchor('#' + $(this).parent().attr('id'), 400);
      });
    });
  });
})();
var backButton=$('.back_to_top');
    function backToTop() {
        $('html,body').animate({
            scrollTop: 0
        }, 800);
    }
    backButton.on('click', backToTop);
 
    $(window).on('scroll', function () {/*当滚动条的垂直位置大于浏览器所能看到的页面的那部分的高度时，回到顶部按钮就显示 */
        if ($(window).scrollTop() > $(window).height())
            backButton.fadeIn();
        else
            backButton.fadeOut();
    });
    $(window).trigger('scroll');/*触发滚动事件，避免刷新的时候显示回到顶部按钮*