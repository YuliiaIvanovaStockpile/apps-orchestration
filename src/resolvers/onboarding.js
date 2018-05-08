const uuidv4 = require('uuid/v4');
const fetch = require('node-fetch');
const debug = require('debug')('app/onboarding')
import _ from 'lodash';

// the definition below has been moved to sp-notifications

// const errorMessage = {
//     id: "REQUIRED",
//     message: "Field Required",
//     code: 1
// }

// const validator = {
//     id: "REQUIRED",
//     error_message: errorMessage,
//     regex_pattern: "pattern here"
// }

// const firstNameField = {
//     id: "first_name",
//     type: "Text",
//     name: "first_name",
//     text: "Legal First Name",
//     placeholder: "Please enter your legal first name"
// }

// const lastNameField = {
//     id: "last_name",
//     type: "Text",
//     name: "last_name",
//     text: "Legal Last Name",
//     placeholder: "Please enter your legal last name"
// }

// const emailField = {
//     id: "email",
//     type: "Text",
//     name: "email",
//     text: "Email Address",
//     placeholder: "Please enter your email address"
// }

// const onboardingFields = [firstNameField, lastNameField, emailField];
// const onboarding = {
//     session : uuidv4(),
//     onboarding_fields : onboardingFields
// }


export default {
  Query: {
    getOnboardingFields: (root, args, context) => {
      return fetch(`http://localhost:8080/uiconfig/configs`)
              .then(res => res.json())
              .then(data => {
                debug('ONBOARDING FIELDS ', JSON.stringify(data, null, 4));
                return data;
              })
              .catch(error => {
                debug('ERROR Encountered');
              });
      // Promise.all(
      //     [
      //         fetch(`http://localhost:8080/uiconfig/configs`)
      //             .then(res => res.json())
      //             .then (data => {
      //                 console.log("CONFIGS " , data);
      //                 return data;
      //             }),
      //         fetch(`http://localhost:8080/uiconfig/validators`)
      //             .then(res => res.json())
      //             .then(data => {
      //                 console.log("VALIDATORS ", data);
      //                 return data;
      //             })
      //     ]
      // ).then(data =>{
      //     const result = _.flattenDeep(data);
      //     console.log("GET ONBOARDING FIELDS ", JSON.stringify(result, null, 2));
      //     return result;
      // })
    }
  }
}