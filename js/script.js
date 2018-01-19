// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
var quote;
var message;
var viewedQuotes = [];
var last ;

var quotes = [
	{
		quote: 'Raindrops, drop tops',
		source: "Migos",
    rapper: "migos"
	},
	{
		quote: "Gucci Gang Gucci Gang Gucci Gang",
		source: "Lil Pump",
    rapper: "lilPump"

	},
  {
    quote: "Man's not hot.",
    source: "Big Shaq",
    rapper: "bigShaq"
  },
  {
    quote: "I'm single like a pringle",
    source: "21 Savage",
    rapper: "Savage",
  },
  {
    quote: "I just dropped some new merch and it's selling like a god church",
    source: "Jake Pual",
    rapper: "jakePual"
  }

];



  var getRandomQuote = function() {
    last = viewedQuotes[viewedQuotes.length-1];
    var random = Math.floor(Math.random() * (quotes.length));
    quote = quotes.splice(random,1)[0];
    if (quotes.length == 0) {
      quotes = viewedQuotes;
      viewedQuotes = [];
    }
    viewedQuotes.push(quote);
    return [quote,last];
  };


function printQuote() {
  arr = getRandomQuote();
  quote = arr[0];
  last = arr[1];
  message = '<p class="quote">' + quote.quote + '</p>' + '<p class="source">'+ quote.source;
  document.getElementById('quote-box').innerHTML = message;
  var body = $('body');

  $('body').addClass(quote.rapper);
  $('body').removeClass(last.rapper);



}

function resetAnimation(jqNode) {
   var clone = jqNode.clone();
   jqNode.after( clone );
   jqNode.remove();
   jqNode[0] = clone[0];
   return jqNode[0]
}


document.getElementById('loadQuote').addEventListener("click", printQuote, false);
