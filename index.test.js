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
    test('Instanciar una room con nombre', () => {
        const testRoom = new Room({ name: roomData.name })
        expect(testRoom.name).toBe(roomData.name)
    })
    test('Instanciar una room con booking', () => {
        const testRoom = new Room({ booking: bookingData })
        expect(testRoom.booking).toBe(bookingData)
    })
    test('Instanciar una room con rate', () => {
        const testRoom = new Room({ rate: roomData.rate })
        expect(testRoom.rate).toBe(roomData.rate)
    })
    test('Instanciar una room con discount', () => {
        const testRoom = new Room({ discount: roomData.discount })
        expect(testRoom.discount).toBe(roomData.discount)
    })
    test('Instanciar una room completa', () => {
        const testRoom = new Room(roomData)
        expect(testRoom).toEqual(roomData)
    })
})
describe.only('occupancy', () => {
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

