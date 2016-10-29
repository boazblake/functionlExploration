const { map, compose, replace , prop} = require('ramda')
const { getJSON } = require('jquery')
const Task = require('data.task')

const Http = {
  //get :: url -> Task Error JSON
  get: (url) => new Task((rej, res) => getJSON(url).error(rej).done(res))
}

const Url = String

const baseUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e31bab641365cfc26645871758f1525d&tags={TAGS}&extras=url_s&format=json&jsoncallback=p`

//makeUrl :: String -> Url
const makeUrl = (t) => replace("{TAGS}", t, baseUrl)

//extractUrls :: JSON ->[url_s]
const extractUrl = compose(prop('url_s'), prop('photo'), prop('photos'))

// flickrSearch :: String -> Task, Error [URL]
const flickrSearch = compose(map(extractUrl), Http.get, makeUrl )
module.exports = { flickrSearch }