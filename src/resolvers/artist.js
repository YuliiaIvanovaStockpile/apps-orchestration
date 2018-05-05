import _ from 'lodash';
const fetch = require('node-fetch');

const myFavoriteArtists = [
  {
    name: "Kansas",
    id: "K8vZ9171C-f"
  },
  {
    name: "Lil Yachty",
    id: "K8vZ9174v57"
  },
  {
    name: "Jason Mraz",
    id: "K8vZ9171CVV"
  }
];
  

export default {
    Query: {
      myFavoriteArtists: (root, args, context) => {
        return Promise.all(
          myFavoriteArtists.map(({ name, id }) => {
            return fetch(
              `https://app.ticketmaster.com/discovery/v2/attractions/${id}.json?apikey=${
                context.secrets.TM_API_KEY
              }`
            )
              .then(res => res.json())
              .then(data => {
                console.log(data);
                return Object.assign({ name, id }, data);
              });
          })
        );
      },
      myFavoriteArtist: (root, args, context) => {
        console.log(root);
        console.log(args);
        const id = args.id;
        const artist = _.find(myFavoriteArtists, { 'id' : id });
        console.log('Artist Here ', artist);
        return artist;
      }
    },
    Artist: {
      twitterUrl: artist => {
        return artist.externalLinks.twitter[0].url;
      },
      image: artist => artist.images[0].url,
      events: (artist, args, context) => {
        return fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=${
            context.secrets.TM_API_KEY
          }&attractionId=${artist.id}`
        )
          .then(res => res.json())
          .then(data => {
            // Sometimes, there are no upcoming events
            return (data && data._embedded && data._embedded.events) || [];
          });
      }
    },
    Event: {
      image: event => event.images[0].url,
      startDateTime: event => event.dates.start.dateTime
    }
};