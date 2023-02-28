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
        if (endDate < startDate) return "Check out cannot be greater than check in"
        let count = 0;
        let numberStartDate = +startDate
        let numberEndDate = +endDate
        const range = []
        while (numberStartDate <= numberEndDate) {
            range.push(numberStartDate)
            numberStartDate++
        }
        if (range.length > 0) {
            range.forEach((item) => {
                if (this.isOccupied(item)) count++
            })
        }
        return Math.floor((count * 100) / range.length);
    }

    static totalOccupancyPercentage(rooms, startDate, endDate) {
        let totalOccupancy = 0
        rooms.forEach(room => {
            totalOccupancy += room.occupancyPercentage(startDate, endDate)
        })
        const totalPercentage = !isNaN(totalOccupancy) ? totalOccupancy / rooms.length : totalOccupancy
        return totalPercentage
    }

    static availableRooms(rooms, startDate, endDate) {
        if (endDate < startDate) return "Check out cannot be greater than check in"
        const availablerooms = [];
        rooms.forEach((room) => {
            if (room.occupancyPercentage(startDate, endDate) === 0) {
                availablerooms.push(room);
            }
        });
        return availablerooms;
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
    getFee() {
        // el descuento nunca puede ser del 100%
        const totalValue = ((this.discount + this.room.discount) >= 90) ? 90 : this.discount + this.room.discount

        return (
            Math.floor(this.room.rate * (totalValue / 100)))
    }

}

module.exports = { Room, Booking }