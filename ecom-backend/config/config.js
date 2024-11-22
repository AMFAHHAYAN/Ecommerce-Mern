const apiKey = process.env.MONGO_URL

export const config = {
    local :{
        DB:{
            HOST:"",
            DB_NAME:"ECOM",
            DB_HOST:27017,
            USERNAME:"",
            PASSWORD:""
        },
        MONGO_URL : "mongodb://localhost:27017/ECOM",
        API_PORT:3002
    },
    stagging :{
        DB:{
            HOST:"",
            DB_HOST:"",
            USERNAME:"",
            PASSWORD:""
        },
        API_PORT:3002,
        MONGO_URL :apiKey
    },
    production :{
        DB:{
            HOST:"",
            DB_HOST:"",
            USERNAME:"",
            PASSWORD:""
        },
        API_PORT:3002
    }
}