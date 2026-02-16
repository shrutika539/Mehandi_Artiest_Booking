// 🚀 INIT EMAILJS + LOAD ADMIN PAGE
document.addEventListener("DOMContentLoaded", () => {
    emailjs.init("VuNDCmZTbRA4DjOvd");
    checkAdmin();
    loadBookings();
});

// 🔒 ADMIN PROTECTION
function checkAdmin() {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");
    if (adminLoggedIn !== "true") {
        window.location.href = "admin-login.html";
    }
}

// 📋 LOAD BOOKINGS
function loadBookings() {
    const table = document.getElementById("bookingTable");
    const totalBookings = document.getElementById("totalBookings");
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    table.innerHTML = "";
    totalBookings.innerText = bookings.length;

    bookings.forEach((b, index) => {
        table.innerHTML += `
        <tr>
            <td data-label="SR.No">${index + 1}</td>
            <td data-label="Name">${b.name}</td>
            <td data-label="Service">${b.service}</td>
            <td data-label="Date">${b.date}</td>
            <td data-label="Status">${b.status || "Pending"}</td>
            <td data-label="Action">
                <button onclick="approveBooking(${index})">✅</button>
                <button onclick="rejectBooking(${index})">❌</button>
            </td>
        </tr>`;
    });
} // ✅ THIS WAS MISSING


// ✅ APPROVE
function approveBooking(index) {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const booking = bookings[index];

    if (!booking || !booking.email) {
        alert("❌ Customer email missing. Cannot send email.");
        return;
    }

    booking.status = "Approved";
    localStorage.setItem("bookings", JSON.stringify(bookings));

    emailjs.send("service_b9e1i8p", "Henna Artistry", {
        to_email: booking.email,
        name: booking.name,
        service: booking.service,
        status: "Approved"
    }).then(
        () => alert("✅ Booking Approved Successfully"),
        err => {
            console.error("❌ Email failed:", err);
            alert("✅ Booking Approved (email not sent)");
        }
    );

    loadBookings();
}


// ❌ REJECT
function rejectBooking(index) {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const booking = bookings[index];

    if (!booking || !booking.email) {
        alert("❌ Customer email missing. Cannot send email.");
        return;
    }

    booking.status = "Rejected";
    localStorage.setItem("bookings", JSON.stringify(bookings));

    emailjs.send("service_b9e1i8p", "template_45ghhxx", {
        to_email: booking.email,
        name: booking.name,
        service: booking.service,
        status: "Rejected"
    }).then(
        () => alert("❌ Booking Rejected Successfully"),
        err => {
            console.error("❌ Email failed:", err);
            alert("❌ Booking Rejected (email not sent)");
        }
    );

    loadBookings();
}


// 🚪 LOGOUT
function adminLogout() {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminName");
    window.location.href = "admin-login.html";
}
