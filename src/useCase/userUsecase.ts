import UserRepository from "./interfaces/userRepository";

class userUsecase{
    private UserRepository:UserRepository
    constructor(UserRepository:UserRepository){
        this.UserRepository = UserRepository
    }
}

export default userUsecase