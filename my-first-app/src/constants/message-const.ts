
enum Sender {
    user = "user",
    other = "other"
}

export interface Message {
    id: number;
    text: string;
    sender: keyof typeof Sender;
    media: null | string[];
    time: string;
    images?: string | string[],
    videos?: string | string[],
    location?: string | string[],
    documents?: string | string[],
}

export const messages: Message[] = [
    { "id": 1, "text": "Just landed! ✈️", "sender": "user", "media": null, "time": "09:00 AM" },
    { "id": 2, "text": "Welcome!! How’s the weather?", "sender": "other", "media": null, "time": "09:02 AM" },
    {
        "id": 3, "text": "Sunny and perfect ☀️", "sender": "user", "media": ["images"], "time": "09:05 AM",
        "images": ["https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg"]
    },

    { "id": 4, "text": "Heading to the hotel now", "sender": "user", "media": null, "time": "09:15 AM" },

    {
        "id": 5, "text": "Check this view 😍", "sender": "user", "media": ["images"], "time": "10:00 AM",
        "images": [
            "https://images.pexels.com/photos/21014/pexels-photo.jpg",
            "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg"
        ]
    },

    { "id": 6, "text": "That’s insane!", "sender": "other", "media": null, "time": "10:02 AM" },

    {
        "id": 7, "text": "Hotel location 📍", "sender": "user", "media": ["location"], "time": "10:05 AM",
        "location": "Hotel Paradise, Beach Road"
    },

    { "id": 8, "text": "Let’s explore the market", "sender": "other", "media": null, "time": "11:00 AM" },

    {
        "id": 9, "text": "Street vibes!", "sender": "user", "media": ["videos"], "time": "11:30 AM",
        "videos": ["https://player.vimeo.com/external/370467553.sd.mp4?s=pexels"]
    },

    { "id": 10, "text": "Try local food 🤤", "sender": "other", "media": null, "time": "11:32 AM" },

    {
        "id": 11, "text": "Got the menu", "sender": "user", "media": ["documents"], "time": "11:40 AM",
        "documents": ["https://www.pexels.com/photo/food-menu-placeholder.pdf"]
    },

    {
        "id": 12, "text": "Food is here!", "sender": "user", "media": ["images"], "time": "12:00 PM",
        "images": ["https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg"]
    },

    { "id": 13, "text": "Looks delicious!", "sender": "other", "media": null, "time": "12:02 PM" },

    { "id": 14, "text": "Walking to the fort", "sender": "user", "media": null, "time": "01:00 PM" },

    {
        "id": 15, "text": "Historic vibes", "sender": "user", "media": ["images"], "time": "01:20 PM",
        "images": ["https://images.pexels.com/photos/161815/pexels-photo-161815.jpeg"]
    },

    { "id": 16, "text": "Send location!", "sender": "other", "media": null, "time": "01:21 PM" },

    {
        "id": 17, "text": "Here it is", "sender": "user", "media": ["location"], "time": "01:22 PM",
        "location": ["Old Fort", "Main City"]
    },

    {
        "id": 18, "text": "Watch this!", "sender": "user", "media": ["videos"], "time": "02:00 PM",
        "videos": ["https://player.vimeo.com/external/320982686.sd.mp4?s=pexels"]
    },

    { "id": 19, "text": "So cool 😎", "sender": "other", "media": null, "time": "02:05 PM" },

    {
        "id": 20, "text": "Museum tickets", "sender": "user", "media": ["documents"], "time": "02:30 PM",
        "documents": ["https://www.pexels.com/photo/ticket-placeholder.pdf"]
    },

    {
        "id": 21, "text": "Inside museum", "sender": "user", "media": ["images"], "time": "03:00 PM",
        "images": [
            "https://images.pexels.com/photos/256369/pexels-photo-256369.jpeg",
            "https://images.pexels.com/photos/2372978/pexels-photo-2372978.jpeg"
        ]
    },

    { "id": 22, "text": "Love this place", "sender": "user", "media": null, "time": "03:10 PM" },

    { "id": 23, "text": "Evening beach time 🌊", "sender": "user", "media": null, "time": "05:30 PM" },

    {
        "id": 24, "text": "Sunset video", "sender": "user", "media": ["videos"], "time": "06:00 PM",
        "videos": ["https://player.vimeo.com/external/357126239.sd.mp4?s=pexels"]
    },

    { "id": 25, "text": "WOW 😍", "sender": "other", "media": null, "time": "06:02 PM" },

    {
        "id": 26, "text": "Dinner place", "sender": "user", "media": ["location"], "time": "07:00 PM",
        "location": "Seafood Shack"
    },

    {
        "id": 27, "text": "Night vibes", "sender": "user", "media": ["images"], "time": "08:00 PM",
        "images": ["https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg"]
    },

    {
        "id": 28, "text": "Music here is amazing", "sender": "user", "media": ["videos"], "time": "08:15 PM",
        "videos": ["https://player.vimeo.com/external/310802990.sd.mp4?s=pexels"]
    },

    { "id": 29, "text": "Send me that clip!", "sender": "other", "media": null, "time": "08:16 PM" },

    {
        "id": 30, "text": "Sharing itinerary", "sender": "user", "media": ["documents"], "time": "09:00 PM",
        "documents": ["https://www.pexels.com/photo/itinerary-placeholder.pdf"]
    },

    { "id": 31, "text": "Next stop tomorrow 🚗", "sender": "user", "media": null, "time": "09:10 PM" },

    {
        "id": 32, "text": "Road trip playlist 🎶", "sender": "user", "media": ["documents"], "time": "09:20 PM",
        "documents": ["https://www.pexels.com/photo/playlist-placeholder.pdf"]
    },

    { "id": 33, "text": "Can’t wait!", "sender": "other", "media": null, "time": "09:25 PM" },

    { "id": 34, "text": "Good night 🌙", "sender": "user", "media": null, "time": "10:00 PM" },
    { "id": 35, "text": "Good night!", "sender": "other", "media": null, "time": "10:01 PM" }
]

export const messages_reversed = messages.reverse()