class Room {
    constructor({ name, booking, rate, discount }) {
        this.name = name;
        this.booking = booking;
        this.rate = rate;
        this.discount = discount;
    }

    isOccupied(date) {
        for (let i = 0; i <= this.booking.length; i++) {
            if (
                date >= this.booking[i].checkin &&
                date <= this.booking[i].checkout
            ) {
                return true
            }
            return false
        }
    }
    occupancyPercentage(startDate, endDate) {

    }
    static totalOccupancyPercentage() {

    }
    static availableRooms() {

    }
}

class Booking {
    constructor({ name, email, checkin, checkout, discount, room }) {
        this.name = name;
        this.email = email;
        this.checkin = checkin;
        this.checkout = checkout;
        this.discount = discount;
        this.room = room

    }
    get fee() {

    }
}

module.exports = { Room, Booking }