
enum Sender {
    user = "user",
    other = "other"
}

export interface Message {
    id: number;
    text: string;
    sender: keyof typeof Sender;
    media: boolean | string | null;
    time: string;
}

export  const messages: Message[] = [
    { id: 1, text: "Hey, how are you?", sender: "other", media: null, time: "09:00 AM" },
    { id: 2, text: "I'm good! What about you?", sender: "user", media: null, time: "09:01 AM" },
    { id: 3, text: "Doing great, just working on a project.", sender: "other", media: null, time: "09:02 AM" },
    { id: 4, text: "Nice! Need any help?", sender: "user", media: null, time: "09:03 AM" },
    { id: 5, text: "Maybe later, I'll let you know.", sender: "other", media: null, time: "09:05 AM" },
    { id: 6, text: "Cool 👍", sender: "user", media: null, time: "09:06 AM" },
    { id: 7, text: "Check this out!", sender: "other", media: "image1.png", time: "09:10 AM" },
    { id: 8, text: "Looks awesome 😍", sender: "user", media: null, time: "09:11 AM" },
    { id: 9, text: "Thanks!", sender: "other", media: null, time: "09:12 AM" },
    { id: 10, text: "Are you free this evening?", sender: "other", media: null, time: "09:15 AM" },
    { id: 11, text: "Yes, after 6 PM.", sender: "user", media: null, time: "09:16 AM" },
    { id: 12, text: "Let's catch up then.", sender: "other", media: null, time: "09:17 AM" },
    { id: 13, text: "Sure, where?", sender: "user", media: null, time: "09:18 AM" },
    { id: 14, text: "Maybe a cafe nearby.", sender: "other", media: null, time: "09:19 AM" },
    { id: 15, text: "Sounds good ☕", sender: "user", media: null, time: "09:20 AM" },
    { id: 16, text: "Sharing location", sender: "other", media: "location_link", time: "09:22 AM" },
    { id: 17, text: "Got it, see you there!", sender: "user", media: null, time: "09:23 AM" },
    { id: 18, text: "Drive safe!", sender: "other", media: null, time: "09:24 AM" },
    { id: 19, text: "You too!", sender: "user", media: null, time: "09:25 AM" },
    { id: 20, text: "Bye 👋", sender: "other", media: null, time: "09:26 AM" }
];
export const messages_reversed = messages.reverse()