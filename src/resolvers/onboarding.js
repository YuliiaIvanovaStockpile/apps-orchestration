const uuidv4 = require('uuid/v4');

const errorMessage = {
    id: "REQUIRED",
    message: "Field Required",
    code: 1
}

const validator = {
    id: "REQUIRED",
    error_message: errorMessage,
    regex_pattern: "pattern here"
}

const firstNameField = {
    id: "first_name",
    type: "Text",
    name: "first_name",
    text: "Legal First Name",
    placeholder: "Please enter your legal first name"
}

const lastNameField = {
    id: "last_name",
    type: "Text",
    name: "last_name",
    text: "Legal Last Name",
    placeholder: "Please enter your legal last name"
}

const emailField = {
    id: "email",
    type: "Text",
    name: "email",
    text: "Email Address",
    placeholder: "Please enter your email address"
}

const onboardingFields = [firstNameField, lastNameField, emailField];
const onboarding = {
    session : uuidv4(),
    onboarding_fields : onboardingFields
}

export default {
    Query: {
        getOnboardingFields: (root, args, context) => {
            console.log('onboarding fields ', onboarding);
            return onboarding;
        }
    }
}