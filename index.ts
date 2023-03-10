interface RoomInter {
    name: string;
    booking: Booking[];
    rate: number;
    discount: number
}
interface BookingInter {
    name: string;
    email: string;
    checkin: number;
    checkout: number;
    discount: number;
    room: Room
}

class Room implements RoomInter {
        name: string;
        booking: Booking[];
        rate: number;
        discount: number
        constructor(room: RoomInter) {
        this.name = room.name;
        this.booking = room.booking;
        this.rate = room.rate;
        this.discount = room.discount;
    }
    isOccupied(date: number): boolean {
        for(let i = 0; i <= this.booking.length; i++) {
            if (
                date >= this.booking[i].checkin &&
                date <= this.booking[i].checkout
            ) {
                return true
            }   
        }
        return false
    }
    occupancyPercentage(startDate: number, endDate: number) : string | number {
        if (endDate < startDate) return "Check out cannot be greater than check in"
        let count = 0;
        let numberStartDate: number = Number(startDate)
        let numberEndDate : number = Number(endDate)
        const range: number[] = []
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
    static totalOccupancyPercentage(rooms: Room[], startDate: number, endDate: number): number {
        let totalOccupancy: number = 0
        rooms.forEach(room => {
            const result = room.occupancyPercentage(startDate, endDate);
            typeof result === 'number' ? totalOccupancy += result : totalOccupancy = 0
        })
        const totalPercentage = !isNaN(totalOccupancy) ? totalOccupancy / rooms.length : totalOccupancy
        return totalPercentage
    }
    static availableRooms(rooms: Room[], startDate: number, endDate: number): Room[] {
        // if (endDate < startDate) return "Check out cannot be greater than check in"
        const availablerooms: Room[]= [];
        rooms.forEach((room) => {
            if (room.occupancyPercentage(startDate, endDate) === 0) {
                availablerooms.push(room);
            }
        });
        return availablerooms || [];
    }

}


class Booking implements BookingInter{
    name: string;
    email: string;
    checkin: number;
    checkout: number;
    discount: number;
    room: Room
    constructor(booking: BookingInter) {
        this.name = booking.name;
        this.email = booking.email;
        this.checkin = booking.checkin;
        this.checkout = booking.checkout;
        this.discount = booking.discount;
        this.room = booking.room
    }
    getFee() : number{
        // el descuento nunca puede ser del 100%
        const totalValue = ((this.discount + this.room.discount) >= 90) ? 90 : this.discount + this.room.discount
        return (
            Math.floor(this.room.rate * (totalValue / 100)))
    }

}

export  { Room, Booking }