document.addEventListener("DOMContentLoaded", () => {
    emailjs.init("VuNDCmZTbRA4DjOvd");
});

function bookService(event) {
    event.preventDefault(); // ⛔ stop browser popup

    const statusMsg = document.getElementById("statusMsg");

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const payment = document.getElementById("paymentMode").value;
    const message = document.getElementById("message").value.trim();

    // ✅ MANUAL VALIDATION
    if (!name || !email || !phone || !service || !date || !payment) {
        statusMsg.style.color = "red";
        statusMsg.innerText = "❌ Please fill all required fields";
        return;
    }

    const booking = {
        name,
        email,
        phone,
        service,
        date,
        payment,
        message,
        status: "Pending",
        bookedAt: new Date().toLocaleString()
    };

    // 💾 SAVE BOOKING
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    statusMsg.style.color = "green";
    statusMsg.innerText = "✅ Booking successful. Sending confirmation...";

    // 📩 ADMIN EMAIL
    emailjs.send("service_b9e1i8p", "template_2anhz2j", {
        to_email: "adeshrutika57@gmail.com",
        name,
        email,
        phone,
        service,
        date,
        payment,
        message
    }).catch(err => console.error("Admin email failed", err));

    // 📩 CUSTOMER EMAIL
    emailjs.send("service_b9e1i8p", "template_45ghhxx", {
        to_email: email,
        name,
        service,
        date,
        status: "Pending"
    }).then(() => {
        statusMsg.style.color = "green";
        statusMsg.innerText =
            "✅ Booking successful! Confirmation email sent.";
    }).catch(() => {
        statusMsg.style.color = "orange";
        statusMsg.innerText =
            "✅ Booking successful, but email could not be sent. We will contact you soon.";
    });

    document.getElementById("bookingForm").reset();
}
