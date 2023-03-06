import { Room, Booking } from './index'

const roomData: Room = new Room ({
    name: "Suite",
    booking: [],
    rate: 14000,
    discount: 10
})
const bookingData: Booking = new Booking ({
    name: 'Foo Bar',
    email: 'prueba@prueba.com',
    checkin: 20230212,
    checkout: 20230214,
    discount: 35,
    room: roomData

})
// Test Rooms
describe('rooms', () => {
    test('Instanciate a room with name', () => {
        const testRoom = roomData
        expect(testRoom.name).toBe(roomData.name)
    })
    test('Instanciate a room with booking', () => {
        const testBooking = new Booking(bookingData)
        const testRoom = new Room({...roomData,  booking: [testBooking] })
        expect(testRoom.booking).toStrictEqual([bookingData])
    })
    test('Instanciate a room with rate', () => {
        const testBooking = new Booking(bookingData)
        const testRoom = new Room({...roomData,  booking: [testBooking] })
        expect(testRoom.rate).toBe(roomData.rate)
    })
    test('Instanciate a room with discount', () => {
        const testBooking = new Booking(bookingData)
        const testRoom = new Room({...roomData,  booking: [testBooking] })
        expect(testRoom.discount).toBe(roomData.discount)
    })
    test('Instanciate a room complet', () => {
        const testRoom = new Room(roomData)
        expect(testRoom).toEqual(roomData)
    })
})
describe('occupancy', () => {
    test('room occupied', () => {
        const testRoom = new Room({ ...roomData, booking: [bookingData] })
        expect(testRoom.isOccupied(20230213)).toBeTruthy()
    })
    test('room occupied in check in', () => {
        const testRoom = new Room({ ...roomData, booking: [bookingData] })
        expect(testRoom.isOccupied(20230212)).toBeTruthy()
    })
    test('room occupied in check out', () => {
        const testRoom = new Room({ ...roomData, booking: [bookingData] })
        expect(testRoom.isOccupied(20230214)).toBeTruthy()
    })
    test('room not occupied before check in', () => {
        const testRoom = new Room({ ...roomData, booking: [bookingData] })
        expect(testRoom.isOccupied(20230211)).toBeFalsy()
    })
    test('room not occupied after check out', () => {
        const testRoom = new Room({ ...roomData, booking: [bookingData] })
        expect(testRoom.isOccupied(20230215)).toBeFalsy()
    })
})
describe('occupancy Percentage', () => {
    // test('endDate !< startDate', () => {
    //     const testRoom = new Room({ ...roomData, booking: [bookingData] })
    //     expect(testRoom.occupancyPercentage('20230210', '20230208')).toBe("Check out cannot be greater than check in")
    // })
    test('percetage 0', () => {
        const testRoom = new Room({ ...roomData, booking: [bookingData] })
        expect(testRoom.occupancyPercentage(20230201, 20230210)).toBe(0)
    })
    test('one day in range: 25%', () => {
        const testRoom = new Room({ ...roomData, booking: [bookingData] })
        expect(testRoom.occupancyPercentage(20230209, 20230212))
            .toBe(25)
    })
    test('one day in range: 33%', () => {
        const testRoom = new Room({ ...roomData, booking: [bookingData] })
        expect(testRoom.occupancyPercentage(20230210, 20230212)).toBe(33)
    })
    test('one day in range: 50%', () => {
        const testRoom = new Room({ ...roomData, booking: [bookingData] })
        expect(testRoom.occupancyPercentage(20230211, 20230212)).toBe(50)
    })
    test('percentage 66', () => {
        const testRoom = new Room({ ...roomData, booking: [bookingData] })
        expect(testRoom.occupancyPercentage(20230211, 20230213)).toBe(66)
    })
    test('percentage 100', () => {
        const testRoom = new Room({ ...roomData, booking: [bookingData] })
        expect(testRoom.occupancyPercentage(20230212, 20230214)).toBe(100)
    })

})
describe('avalaible', () => {
    // test('endDate !< startDate', () => {
    //     const booking = new Booking({ ...bookingData })
    //     const room = new Room({ ...roomData, booking: [booking] })
    //     const booking2 = new Booking({ ...bookingData, checkin: '20230214', checkout: '20230218' })
    //     const room2 = new Room({ ...roomData, booking: [booking2] })
    //     const rooms = [room, room2]
    //     expect(Room.availableRooms(rooms, "20230212", "20230210")).toBe("Check out cannot be greater than check in")
    // })
    test('avalaible rooms', () => {
        const booking2 = new Booking({ ...bookingData, checkin: 20230214, checkout: 20230218 })
        const room = new Room({ ...roomData, booking: [booking2] })
        const booking = new Booking({ ...bookingData })
        const room2 = new Room({ ...roomData, booking: [booking] })
        const rooms = [room, room2]
        expect(Room.availableRooms(rooms, 20230224, 20230227)).toEqual(rooms)
    })
    test('is not avalaible rooms', () => {
        const booking2 = new Booking({ ...bookingData, checkin: 20230214, checkout: 20230218 })
        const room = new Room({ ...roomData, booking: [booking2] })
        const booking = new Booking({ ...bookingData })
        const room2 = new Room({ ...roomData, booking: [booking] })
        const rooms = [room, room2]
        expect(Room.availableRooms(rooms, 20230212, 20230218)).toEqual([])
    })
    test('avalaible only room', () => {
        const booking = new Booking({ ...bookingData })
        const room = new Room({ ...roomData, booking: [booking] })
        const booking2 = new Booking({ ...bookingData, checkin: 20230214, checkout: 20230218 })
        const room2 = new Room({ ...roomData, booking: [booking2] })
        const rooms = [room, room2]
        expect(Room.availableRooms(rooms, 20230210, 20230212)).toEqual([room2])
    })

})
describe('totalOccupancyPercentage', () => {
    test('totalpercentage must be 100', () => {
        const booking = new Booking(bookingData)
        const room = new Room({ ...roomData, booking: [booking] })
        const booking2 = new Booking({ ...bookingData, checkin: 20230212, checkout: 220230218 })
        const room2 = new Room({ ...roomData, booking: [booking2] })
        const rooms = [room, room2]
        expect(Room.totalOccupancyPercentage(rooms, 20230212, 20230214)).toEqual(100)

    })
    test('totalpercentage must be 83', () => {
        const booking = new Booking(bookingData)
        const room = new Room({ ...roomData, booking: [booking] })
        const booking2 = new Booking({ ...bookingData, checkin: 20230212, checkout: 220230218 })
        const room2 = new Room({ ...roomData, booking: [booking2] })
        const rooms = [room, room2]
        expect(Room.totalOccupancyPercentage(rooms, 20230213, 20230215)).toEqual(83)

    })
    test('totalpercentage must be 56', () => {
        const booking = new Booking(bookingData)
        const room = new Room({ ...roomData, booking: [booking] })
        const booking2 = new Booking({ ...bookingData, checkin: 20230212, checkout: 220230218 })
        const room2 = new Room({ ...roomData, booking: [booking2] })
        const rooms = [room, room2]
        expect(Room.totalOccupancyPercentage(rooms, 20230210, 20230217)).toEqual(56)
    })
    test('totalpercentage must be 33', () => {
        const booking = new Booking(bookingData)
        const room = new Room({ ...roomData, booking: [booking] })
        const booking2 = new Booking({ ...bookingData, checkin: 20230212, checkout: 220230218 })
        const room2 = new Room({ ...roomData, booking: [booking2] })
        const rooms = [room, room2]
        expect(Room.totalOccupancyPercentage(rooms, 20230210, 20230212)).toEqual(33)
    })
    test('totalpercentage must be 0', () => {
        const booking = new Booking(bookingData)
        const room = new Room({ ...roomData, booking: [booking] })
        const booking2 = new Booking({ ...bookingData, checkin: 20230212, checkout: 220230218 })
        const room2 = new Room({ ...roomData, booking: [booking2] })
        const rooms = [room, room2]
        expect(Room.totalOccupancyPercentage(rooms, 20230210, 20230211)).toEqual(0)
    })
})

//Test Booking
describe('Booking', () => {

    test('fee must be 10%', () => {
        const room = new Room({ ...roomData, discount: 10 })
        const testBooking = new Booking({ ...bookingData, room, discount: 0 })
        room.booking.push(testBooking)
        expect(testBooking.getFee()).toBe(1400)
    })
    test('fee must be 45%', () => {
        const room = new Room({ ...roomData })
        const testBooking = new Booking({ ...bookingData, room })
        room.booking.push(testBooking)
        expect(testBooking.getFee()).toBe(6300)
    })
    test('fee must be 50%', () => {
        const room = new Room({ ...roomData, discount: 10 })
        const testBooking = new Booking({ ...bookingData, room, discount: 40 })
        room.booking.push(testBooking)
        expect(testBooking.getFee()).toBe(7000)
    })


})