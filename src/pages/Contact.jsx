import { useState } from 'react';
import emailjs from 'emailjs-com';
import { Toast } from '../components/ui/Toast';
import { IoSend } from "react-icons/io5";
import { Loader } from '../components/ui/Loader';

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        subject: '',
        reason: '',
    });
    const [toast, setToast] = useState(null);
    const [loading, setLoading] = useState(false); // New loading state

    const handleToastReset = () => {
        setTimeout(() => setToast(null), 3000);
    };

    const reasons = [
        "Error or bug", 
        "New feature", 
        "Support", 
        "Feedback", 
        "Developer contact", 
        "Need website/app like this", 
        "Others"
    ];

    const { subject, message, email, name, reason } = formData;
    const commonStyle = "px-3 py-[10px] my-2 w-full text-black rounded-2xl outline-none border-none resize-none";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if any field is empty
        if (Object.values(formData).some(value => value.trim() === '')) {
            setToast({ message: "Please fill all the fields!", type: "error" });
            handleToastReset();
            return;
        }

        setLoading(true); // Set loading to true before sending the email

        try {
            await emailjs.send(
                'service_ym73gwa',
                'template_vqwf5y3',
                formData,
                '91h2QU8cmIGFInB4d'
            );
            setToast({ message: "Your message is successfully sent! Please wait for the reply.", type: "success" });
            handleToastReset();
            setFormData({ name: '', email: '', message: '', subject: '', reason: '' });
        } catch (e) {
            setToast({ message: "Failed to send the message! Try again later.", type: "error" });
            handleToastReset();
        } finally {
            setLoading(false); // Set loading to false after the process is complete
        }
    };

    return (
        <div>
        <h1 className="text-3xl font-bold text-white text-center my-5">
        Contact Us </h1>
            <form className="max-w-[500px] mx-auto" onSubmit={handleSubmit}>
                <select
                    className={commonStyle}
                    onChange={handleChange}
                    name="reason"
                    value={reason}
                    required
                >
                    <option value="" disabled>Select a reason</option>
                    {reasons.map((reasonOption, index) => (
                        <option key={index} value={reasonOption}>
                            {reasonOption}
                        </option>
                    ))}
                </select>
                <input
                    onChange={handleChange}
                    name="subject"
                    type="text"
                    className={commonStyle}
                    value={subject}
                    placeholder="Subject"
                    required
                />
                <input
                    onChange={handleChange}
                    name="name"
                    type="text"
                    className={commonStyle}
                    value={name}
                    placeholder="Your name"
                    required
                />
                <input
                    onChange={handleChange}
                    name="email"
                    type="email"
                    className={commonStyle}
                    value={email}
                    placeholder="Your email"
                    required
                />
                <textarea
                    onChange={handleChange}
                    name="message"
                    className={commonStyle}
                    value={message}
                    placeholder="Your message"
                    required
                />
                <button
                    type="submit"
                    className="font-bold rounded-full py-2 px-5 bg-blue-500 flex items-center justify-center gap-2 w-full sm:max-w-sm mx-auto"
                >
                    {loading ? "Sending..." : "Send message"} <IoSend />
                </button>
            </form>

            {loading && <Loader />} {/* Show loader when loading is true */}
            {toast && <Toast message={toast.message} type={toast.type} />}
        </div>
    );
};