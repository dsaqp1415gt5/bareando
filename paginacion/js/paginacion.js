var API_BASE_URL = "https://api.github.com";
var USERNAME = "makitos666";
var PASSWORD = "morolandia666";

$.ajaxSetup({
    headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
});

$(document).ready(function(){
	var url = API_BASE_URL + '/users/' + USERNAME + '/gists?per_page=5';
    console.log(url);
	getRepos(url);
});



function RepoCollection(repoCollection){
	this.repos = repoCollection;
	var instance = this;

	this.buildLinks = function(header){
		if (header != null ) {
			this.links = weblinking.parseHeader(header);
		} else {
			this.links = weblinking.parseHeader('');
		}
	}

	this.getLink = function(rel){
                return this.links.getLinkValuesByRel(rel);
	}

    this.toHTML = function(){
		var html = '';
		$.each(this.repos, function(i, v) {
			var repo = v;
            html = html.concat("<div class='row'><div class='col-md-7'><a href='#'><img class='img-responsive' src='" + repo.owner.avatar_url + "' alt=''></a></div><div class='col-md-5'><h3>"+ repo.description +"</h3><p>" + repo.files[Object.keys(repo.files)[0]].raw_url + "</p></div></div><hr>");
		});

		html = html.concat(' <br> ');

        var prev = this.getLink('prev');

        if (prev.length == 1) {
			html = html.concat(' <a onClick="getRepos(\'' + prev[0].href + '\');" style="cursor: pointer; cursor: hand;">[Prev]</a> ');
		}

        var next = this.getLink('next');

		if (next.length == 1) {
			html = html.concat(' <a onClick="getRepos(\'' + next[0].href + '\');" style="cursor: pointer; cursor: hand;">[Next]</a> ');
		}

 		return html;
	}

}

function getRepos(url) {
	$("#pepe").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
        var response = data;
        var repoCollection = new RepoCollection(response);
        var linkHeader = jqxhr.getResponseHeader('Link');
        repoCollection.buildLinks(linkHeader);
		var html = repoCollection.toHTML();
		$("#pepe").html(html);
	}).fail(function(jqXHR, textStatus) {
		console.log(textStatus);
	});

}
