import { useState } from "react";
import "./contact.scss";
import { CiMail } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  function handleChange(e: any) {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function handleSubmit(e: any) {
    e.preventDefault();
    try {
      fetch("https://sportkosher-server.up.railway.app/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      alert("האימייל נשלח בהצלחה .");
    } catch (error) {
      console.error("Error sending email :", error);
      alert("שגיאה בשליחת האימייל. בבקשה תנסה שוב מאוחר יותר.");
    }
  }
  return (
    <>
      <div className="contact">
        <form onSubmit={handleSubmit} className="contact__form">
          <h2>צור קשר</h2>
          <input
            type="text"
            name="name"
            placeholder="שם מלא"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="כתובת הדואר האלקטרוני שלך"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="נושא הפנייה"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            className="contact__form--message-input"
            placeholder="תוכן ההודעה"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">שלח</button>
        </form>
        <div className="contactInfo">
          <div className="contactInfo_details">
            <h2>פרטי התקשרות</h2>
            <div className="mail">
              <p>sportkosher@gmail.com</p> <CiMail />{" "}
            </div>
            <div className="phone">
              <p>0526400640</p> <FiPhone />{" "}
            </div>
            <div className="time">
              <p>9:00-16:00</p> <IoMdTime />{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
