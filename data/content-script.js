$(document).ready(function() {
  $('.tweet-text').each(function(idx, el) {
    var data = {
      'text': el.textContent,
      'tweetId': $(el).parent().parent().data('tweetId')
    };
    self.port.emit('foundTweet', data);
  });

  self.port.on('foundAbuse', function(data) {
    var $tweet = $('[data-tweet-id='+data.tweetId+']');
    $tweet.addClass('abuse');
    $tweet.find('.tweet-text').text('Abuse-Bayes has classified this tweet as abuse.');
  });
});



