export const checkSignupValidData = (name, email, phone, city) => {
    const isNameValid = /\b([-,a-z,A-Z. ']+[ ]*)+/.test(name);
    const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPhone = /^\S+$/u.test(phone);
    const isCity = /^\S+$/u.test(city);
    
    if(!isNameValid) return "Name is not valid";
    if(!isEmailValid) return "Email is not valid";
    if(!isPhone) return "Phone is empty";
    if(!isCity) return "City is empty";
    
    return null;
};
