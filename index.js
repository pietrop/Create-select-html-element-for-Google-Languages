'use strict';

const fs = require('fs');
const scraper = require('table-scraper');

var url = 'https://cloud.google.com/speech/docs/languages';

scraper
  .get(url)
  .then(function(tableData) {

  	var languages = tableData[0];

  	console.log("---------- Scraping languages ----------");

  	console.log(JSON.stringify(languages,null,2));

  	console.log("---------- Saving results locally ----------");

  	fs.writeFileSync("./languages.json",JSON.stringify(languages,null,2) );

  	console.log("---------- Saved results locally `./languages.json` ----------");
  	console.log("---------- Composing HTML select ----------");
	/**
	 * Composing HTML snippet 
	 */
	var selectHTML = createOptionForAllLanguages(languages);
	var resultHTML = createSelectElem(selectHTML);

	console.log("---------- Disaplying results ----------");
	console.log(resultHTML);

	console.log("---------- Saving results locally ----------");
	//saving result locally 
	fs.writeFileSync("./languages.html",resultHTML );
	console.log("---------- Saved results locally `./languages.html` ----------");
  });


/**
 * Helper functions 
 */

function createOptionForAllLanguages(languages){
	var result = "";
	
	languages.forEach(function(lang){
		result += createOneOption(lang); 
		
	});
	return result;
}


function createOneOption(lang){
	return `<option value="${lang.languageCode}">${lang["Language (English name)"]} </option>\n`
}

function createSelectElem(options){
	return `<div class="form-group">
        <label for="languageModelGoogle">Google Cloud Speech Languages:</label>
        <select class="form-control" id="languageModelGoogle">
        ${options}
         </select>
         <p class="help-block">choose the language of your media file.</p>
      </div>`
}
