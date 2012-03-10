/*
* returns a value for a url parameter 
*/
function getParam( url, sname )
{
  var params = url.substr(url.indexOf("?")+1);
  var sval = "";
  params = params.split("&");
    // split param and value into individual pieces
    for (var i=0; i<params.length; i++)
       {
         temp = params[i].split("=");
         if ( [temp[0]] == sname ) { sval = temp[1]; }
       }
  return sval;
}


$(function($) {
	
	var app = {
		init: function(config) {
			this.url = config.url;
			this.listItemTemplate = Handlebars.compile(config.listItemTemplate);
			this.pageTemplate = Handlebars.compile(config.pageTemplate);
			this.listContainer = config.listContainer;
			$.mobile.showPageLoadingMsg();
			this.getData();
		},
		
		render: function() {
			this.listContainer.append(this.listItemTemplate(this.posts));
			this.listContainer.listview('refresh');
			$.mobile.hidePageLoadingMsg();
			$('body').append(this.pageTemplate(this.posts));
			$('.post-page').each(function(page) {
				page.page();
			})
		},
		
		getData: function() {
			var self = this;
			$.getJSON(this.url, function(data) {
				console.log('json data retrieved:');
				console.log(data);
				self.posts = $.map(data.query.results.item, function(post, index) {
					var titles = post.title.split(':');
					return {
						index: index,
						maintitle: titles[0],
						subtitle: titles[1],
						link: post.link,
						description: post.description,
						imgsrc: $(post.encoded).find('img').first().attr('src'),
						content: post.encoded,
						tags: post.category 
					};
				});
				console.log('posts array mapped:');
				console.log(self.posts);
				self.render();
			})
		}
	};	
	
	//START APP
	var blog_link = 'http://thissongissick.com/blog/feed/';
	var query = "select * from rss where url='" + blog_link + "'";
	var url = 'http://query.yahooapis.com/v1/public/yql?q='+
		encodeURIComponent(query)+
		'&format=json&callback=?';
	console.log("requesting rss feed: \n" + url);
	var tsis = app.init({
		url: url,
		listItemTemplate: $('#list-item-template').html(),
		pageTemplate: $('#page-template').html(),
		listContainer: $('ul#list')
	});
	
});