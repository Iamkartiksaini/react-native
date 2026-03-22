import React from 'react';
import { FlatList } from 'react-native';
import UserProfileCard from './user-profile-card';


export default function List() {
    const chatsList = [
        { title: "Aarav Sharma", message: "Hey! Are we still meeting today?", time: "09:15 AM", message_status: "seen" },
        { title: "Emily Watson", message: "Got the files, thanks!", time: "10:02 AM", message_status: "seen" },
        { title: "Rahul Verma", message: "Call me when you're free.", time: "11:30 AM", message_status: "delivered" },
        { title: "Sophia Lee", message: "That sounds great 😄", time: "12:05 PM", message_status: "seen" },
        { title: "Michael Brown", message: "I'll check and update you.", time: "01:22 PM", message_status: "sent" },
        { title: "Priya Singh", message: "Lunch was amazing!", time: "02:10 PM", message_status: "seen" },
        { title: "David Miller", message: "Running a bit late.", time: "yesterday", message_status: "delivered" },
        { title: "Ananya Gupta", message: "Can you send the document?", time: "04:05 PM", message_status: "sent" },
        { title: "James Wilson", message: "Sure, no problem.", time: "04:30 PM", message_status: "seen" },
        { title: "Neha Kapoor", message: "Let’s plan for the weekend!", time: "05:15 PM", message_status: "delivered" },
        { title: "Chris Evans", message: "Done with the task.", time: "06:00 PM", message_status: "seen" },
        { title: "Simran Kaur", message: "Thanks a lot 🙌", time: "06:25 PM", message_status: "seen" },
        { title: "Daniel Garcia", message: "Will revert shortly.", time: "07:10 PM", message_status: "sent" },
        { title: "Karan Mehta", message: "Check your email.", time: "07:45 PM", message_status: "delivered" },
        { title: "Olivia Martin", message: "Perfect 👍", time: "08:05 PM", message_status: "seen" },
        { title: "Rohit Jain", message: "Let me know your thoughts.", time: "08:40 PM", message_status: "sent" },
        { title: "Isabella Clark", message: "I agree with that.", time: "09:15 PM", message_status: "seen" },
        { title: "Arjun Nair", message: "Can we reschedule?", time: "09:50 PM", message_status: "delivered" },
        { title: "Lucas Anderson", message: "Sounds good to me.", time: "10:20 PM", message_status: "seen" },
        { title: "Meera Iyer", message: "Good night 🌙", time: "11:00 PM", message_status: "sent" }
    ].map((v: any) => {
        v.id = Math.random().toString()
        return v
    })


    return (
        <FlatList data={chatsList}
            renderItem={(item) => <UserProfileCard {...item.item} avatarSize={48} />}
            className='flex-1 '>
        </FlatList>
    )
}