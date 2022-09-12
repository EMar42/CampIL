const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/CampIL", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < cities.length; i++) {
        const random50 = Math.floor(Math.random() * 50);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: "630a57cb3e94e39524e148d5", //After register one user, put his ID here.
            location: `${cities[i].city}, ${cities[i].admin_name}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [cities[i].lng, cities[i].lat],
            },
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
            price: random50,
            images: [
                {
                    url: "https://images.unsplash.com/photo-1533575770077-052fa2c609fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
                    filename: "CampIL/jieh2qusobrbvrdguorg",
                },
                {
                    url: "https://res.cloudinary.com/diuytoipw/image/upload/v1662719576/CampIL/ujbjj7qk9obkqrzw3l0u.jpg",
                    filename: "CampIL/lzfpvmhb55pojkceiuuu",
                },
            ],
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
