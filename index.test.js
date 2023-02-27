const { Room } = require('./index')

const roomData = {
    name: "Suite",
    booking: [],
    rate: 14000,
    discount: 10
}
const bookingData = {
    name: 'Foo Bar',
    email: 'prueba@prueba.com',
    checkin: '20230212',
    checkout: '20230214',
    discount: 35,
    room: {}

}

describe('rooms', () => {
    test('Instanciate a room with name', () => {
        const testRoom = new Room({ name: roomData.name })
        expect(testRoom.name).toBe(roomData.name)
    })
    test('Instanciate a room with booking', () => {
        const testRoom = new Room({ booking: bookingData })
        expect(testRoom.booking).toBe(bookingData)
    })
    test('Instanciate a room with rate', () => {
        const testRoom = new Room({ rate: roomData.rate })
        expect(testRoom.rate).toBe(roomData.rate)
    })
    test('Instanciate a room with discount', () => {
        const testRoom = new Room({ discount: roomData.discount })
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
        expect(testRoom.isOccupied('20230213')).toBeTruthy()
    })
    test('room occupied in check in', () => {
        const testRoom = new Room({ ...roomData, booking: [bookingData] })
        expect(testRoom.isOccupied('20230212')).toBeTruthy()
    })
    test('room occupied in check out', () => {
        const testRoom = new Room({ ...roomData, booking: [bookingData] })
        expect(testRoom.isOccupied('20230214')).toBeTruthy()
    })
    test('room not occupied before check in', () => {
        const testRoom = new Room({ ...roomData, booking: [bookingData] })
        expect(testRoom.isOccupied('20230211')).toBeFalsy()
    })
    test('room not occupied after check out', () => {
        const testRoom = new Room({ ...roomData, booking: [bookingData] })
        expect(testRoom.isOccupied('20230215')).toBeFalsy()
    })
})
describe('occupancy Percentage', () => {
    test('percentage 100', () => {
        const testRoom = new Room({ ...roomData, booking: [bookingData] })
        expect(testRoom.occupancyPercentage('20230212', '20230214')).toBe(100)
    })
    test('percetage 0', () => {
        const testRoom = new Room({ ...roomData, booking: [bookingData] })
        expect(testRoom.occupancyPercentage('20230201', '20230210')).toBe(0)
    })
})
