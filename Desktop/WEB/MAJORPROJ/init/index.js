const mongoose = require("mongoose");
let Initdata = require("./data.js");
const listing = require("../models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connection done");
    } catch (error) {
        console.error(error);
    }
}

main();

const initDb = async () => {    
    try {
        await listing.deleteMany({});
        Initdata.data = Initdata.data.map((obj) => ({
            ...obj,
            owner: "655f9013043385e4c1430567",
        }));
        await listing.insertMany(Initdata.data);
        console.log("Data was saved");
    } catch (error) {
        console.error(error);
    }
};

initDb();
