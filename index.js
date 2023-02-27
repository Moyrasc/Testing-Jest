class Room {
    constructor({ name, bookings, rate, discount }) {
        this.name = name;
        this.bookings = bookings;
        this.rate = rate;
        this.discount = discount

    }
    isOccupied() {

    }
    occupancyPercentage() {

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