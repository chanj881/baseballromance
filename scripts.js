
// add api key and spreadsheet ID
// make sure google sheets API is enabled
// https://support.google.com/googleapi/answer/6158862?hl=en

var API_KEY = 'AIzaSyDxA6wP77Cc7yKP5JJ4LlCIXfXfjsSsKfo';
var SPREADSHEET_ID = '1EzvBTrHrT3dLqO8C3WTz1jb_EkoID3pxBrVtZH_QbsQ';
var SHEET_NAME = 'Form Responses 1';


// get spreadsheet data... dont edit any of this
var response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${ SPREADSHEET_ID }/values/${ SHEET_NAME }?alt=json&key=${ API_KEY }`);
var data = await response.json();
var [header, ...rows] = data.values;
var entries = rows.map(row => Object.fromEntries(header.map((key, i) => [key.toLowerCase(), row[i] || ""])));

// log entries to the console
// console.log(entries);

// get the entries container
var mainElement = document.querySelector('.main');


// get URL parameters
var urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);

// get entry number
var featuredEntryNumber = urlParams.get('entry');
console.log(featuredEntryNumber);

// get entry 
var featuredEntry = (featuredEntryNumber) ? entries[Number(featuredEntryNumber)] : null;
console.log(featuredEntry)

if (featuredEntry) {

	// ... add a single entry to the DOM

	mainElement.innerHTML += `
		<div class="featured-entry">
			<summary class="entry-title"><img class=gif src="images/${ featuredEntry.team.toLowerCase() }.gif" />                
			<p class="entry-nickname">ID: ${ featuredEntry.nickname }</h2>
				</summary>
				<p class="entry-story">야구랑 사랑에 빠진 순간: ${ featuredEntry.story }</p>
				<p class="entry-story">가장 기억에 남는 작관 경기: ${ featuredEntry.favorite }</p>
		</div>
	`;


} else {

    // make entries container
    mainElement.innerHTML += `
        <div class="entries"></div>
    `;

    // get entries container
    var entriesContainer = document.querySelector('.entries');

	// add all the entries to the page
	entries.forEach((entry, i) => {

		//log the entry to the console
		// console.log(entry, i);

		// add entry to the entries container
		entriesContainer.innerHTML += `
			<a href="/baseballromance/?entry=${ i }">
				<div class="entry">
					<img class=gif src="images/${ entry.team.toLowerCase() }.gif" />                
					<p class="entry-nickname">ID: ${ entry.nickname }</h2>
				</div>
			</a>
		`;
	});

}