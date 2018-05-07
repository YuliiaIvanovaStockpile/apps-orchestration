import { find } from 'lodash';
import { 
  User,
  UserInput,
  UserInputMessage,
  Address, 
  AddressInput,
  StatusMessage 
} from '../common/index';


const myFavoriteArtists = [
  {
    id: "K8vZ9171C-f",
    first_name: "Everett",
    last_name: "Quebral",
    address: "San Jose",
    email: "everett@stockpile.com",
    password: "secret"
  },
  {
    id: "K8vZ9174v57",
    first_name: "Aparup",
    last_name: "Banerjee",
    address: "San Jose",
    email: "aparup@stockpile.com",
    password: "secret secret"
  },
  {
    id: "K8vZ9171CVV",
    first_name: "Manoj",
    last_name: "Manoj",
    address: "San Jose",
    email: "manoj@stockpile.com",
    password: "moresecret"
  }
];

export default {
  Query: {
    findUser: (root, args, context) => {
      const id = args.id;
      const user = find(myFavoriteArtists, { 'id' : id });
      return user;
    },
    getUsers: (root, args, context) => {
      return myFavoriteArtists;
    }
  },
  Mutation: {
    addUser: (root, args, context) => {
      // const user = new UserInput(content, author);
      // console.log(user);
      console.log(args);
      const user = args.input;
      console.log(user);
      const statusMessage = new StatusMessage(200, 'SUCCESS', 'Successfully entered the new User');
      return statusMessage;
    }
  }
}