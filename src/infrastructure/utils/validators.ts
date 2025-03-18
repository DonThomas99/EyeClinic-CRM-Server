class Validations {
    constructor() {}
  
    emailValidation(email:string) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    }
  
    passwordValidation(password:string) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      return passwordRegex.test(password);
    }
  
    usernameValidation(username:string) {
      const userNameMinLength = 3;
      const userNameMaxLength = 20;
      const nameRegex = new RegExp(`^[a-zA-Z ]{${userNameMinLength},${userNameMaxLength}}$`);
      return nameRegex.test(username);
    }
  
    otpValidation(otp:string) {
      const otpRegex = /^[1-9][0-9]{3}$/;
      return otpRegex.test(otp);
    }
  
    zipValidation(zip:string) {
      const zipRegex = /^[1-9][0-9]{5}$/;
      return zipRegex.test(zip);
    }
  
    mobileValidation(mobile:string) {
      const mobileRegex = /^[1-9][0-9]{9}$/;
      return mobileRegex.test(mobile);
    }
  
  }
  
  export default new Validations();  
  export const userNameMinLength = 3;
  export const userNameMaxLength = 20;
  export const passwordLength = 8;
  
  export const signUp = {
    message: "",
    resendOtp: "",
    formattedTime: "",
    otpResendCount: 0,
    showOtpResend: false,
  };
  