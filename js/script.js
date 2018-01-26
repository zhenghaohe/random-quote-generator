var quote;
var viewedQuotes = [];
var quotes = [
		{
				quoteText: "Believe you can and you're halfway there.",
				quoteAuthor: "Theodore Roosevelt"
		},
		{
				quoteText: "Do or do not, there is no try.",
				quoteAuthor: "Yoda"
		},
		{
				quoteText: "If things seem under control, you’re just not going fast enough.",
				quoteAuthor: "Mario Andretti"
		},
		{
				quoteText: "I do not fear computers. I fear the lack of them",
				quoteAuthor: "Isaac Asimov"
		},
		{
				quoteText: "I'll be back.",
				quoteAuthor: "Arnold Schwarznegger"
		},
		{
				quoteText: "I never said most of the things I said.",
				quoteAuthor: "Yogi Berra"
		},
		{
				quoteText: "All you need is love",
				quoteAuthor: "John Lennon"
		},
		{
				quoteText: "If I had nine hours to chop down a tree, I’d spend the first six sharpening my ax.",
				quoteAuthor: "Abraham Lincoln"
		}
];


  var localQuote = function() {
    var random = Math.floor(Math.random() * (quotes.length));
    quote = quotes.splice(random,1)[0];
    if (quotes.length == 0) {
      quotes = viewedQuotes;
      viewedQuotes = [];
    }
    viewedQuotes.push(quote);
    return quote;
  };

function generateQuote() {
    var APIendpoint = 'https://api.forismatic.com/api/1.0/?jsonp=?';
    var URLqueryOptions = {
        lang: 'en',
        method: 'getQuote',
        format: 'jsonp'
    };
    var successCallback = function (data, status) {
        console.log('The status is ' + status);
        renderQuote(data);
    };
    var failCallback = function (data, status, error) {
        console.log("Looks like an error");
        console.log(data.status + "  " + error);
        renderQuote(localQuote());
    };

    $.ajax({
        url: APIendpoint,
        data: URLqueryOptions,
        dataType: 'json',
        success: successCallback,
        error: failCallback,
        timeout: 1500
    });
}

function renderQuote(quote) {
    var a = $.Deferred();
    var b = $.Deferred();

    // error checking
    if (quote.quoteText === undefined) { quote.quoteText = ''; }
    if (quote.quoteAuthor === undefined) { quote.quoteAuthor = ''; }

    // display new quote
    $('#quote').fadeOut(function(){
        $(this).text(quote.quoteText).fadeIn(function() {a.resolve();});
    });
    $('#quotee').fadeOut(function(){
        $(this).text(quote.quoteAuthor).fadeIn(function() {b.resolve();});
    });
		$('#loadQuote').removeClass('active');

}

$(document).ready(function() {
    renderQuote(localQuote());
    $('#loadQuote').on('click tap',function(){
			$(this).addClass('active');
   		generateQuote();
		});
});

$(document).ready(function() {
    $('body').css('background-size', $(window).width()/3 + 'px ');
});
