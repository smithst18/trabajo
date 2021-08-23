export class Report  {
    constructor(
        public _id:any,
        public ci: String,
        public name:String,
        public date: String,
        public department: String,
        public problemDescription: String,
        public toolName: String,
        public toolNumber: Number,
        public lastDate: String,
        public status: String,
    ){}
}