export class User  {
    constructor(
        public name: string,
        public password: string,
        public repassword: string,
        public code: number,
        public ci:string,
        public permise: boolean,
    ){}
}

