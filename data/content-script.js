$(document).ready(function() {

  window.setInterval(function() {
    console.log('reprocessing feed');
    $('.tweet-text').each(function(idx, el) {

      var originalTweet = $(el).parent().parent();

      if (!originalTweet.data('processed')) {
        originalTweet.data('processed', true);

        var data = {
          'text': el.textContent,
          'userId': originalTweet.data('userId'),
          'tweetId': originalTweet.data('tweetId')
        };

        $(originalTweet)
          .after('<div class="report-abuse"><a>ab</a></div>');

        $(originalTweet).siblings('.report-abuse').on('click', function(e) {
          console.log('clicked abuse');
          $(originalTweet).find('.tweet-text').text('You\'ve classified this tweet as abuse. We\'ve sent it to our sorting hat.');
          self.port.emit('registerAbuse', data);
        });

        self.port.emit('foundTweet', data);
      }
    });
  }, 5000);

  self.port.on('foundAbuse', function(data) {
    var $tweet = $('[data-tweet-id='+data.tweetId+']');
    $tweet.addClass('abuse');
    $tweet.find('.tweet-text').text('Abuse-Bayes has classified this tweet as abuse.');
  });
});



