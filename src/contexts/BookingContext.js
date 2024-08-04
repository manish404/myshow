import supabase from "@/db/supabase";
import println from "@/helpers/print";
import { setNotice } from "@/store/slices/common";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import crypto from 'crypto';

const BookingContext = createContext({});

export const useBookingContext = () => {
    return useContext(BookingContext);
}

const bookingDetailsSchema = {
    date: '',
    booked_by: '',
    show: '',
    seats: null,
    booked: false,
    paymentID: null,
    hall: '',
    movie: '',//hall & movie, both are included in show
}

export default function BookingContextProvider({ children, show, uid, hall }) {
    const date = new Date();
    const today = date.toISOString().slice(0, 10);
    const maxDate = new Date(date.setDate(date.getDate() + 6)).toISOString().slice(0, 10);
    hall = parseInt(hall);
    show = parseInt(show);
    /**bookingDetails
     * hall, movie, show, date
     */
    const schema = {
        ...bookingDetailsSchema,
        ['date']: today,
        ['show']: show,
        ['booked_by']: uid,
        ['hall']: hall,
    };
    const [bookingDetails, setBookingDetails] = useState({ ...schema });
    const [movie, setMovie] = useState('');
    const [bookedSeatsRawData, setBookedSeatsRawData] = useState({});
    const [bookedSeats, setBookedSeats] = useState({});
    const [bSize, setBSize] = useState(0);
    const [reservedSeats, setReservedSeats] = useState({});
    const [rSize, setRSize] = useState(0);
    const dispatch = useDispatch();
    // let { data: raw_bookings, isLoading } = useBookings(hall, bookingDetails.movie, show);
    // 
    // 
    function generateRandomToken() {
        const buffer = crypto.randomBytes(10);
        return buffer.toString('hex');
    };

    function getBooking() {
        return {
            ...bookingDetails,
            ['seats']: Object.keys(reservedSeats)
        }
    }
    function reserveSeat(seat) {
        if (seat in reservedSeats) {
            delete reservedSeats[seat];
            setRSize(rSize - 1);
            return false;
        }
        else {
            setReservedSeats({
                ...reservedSeats, [seat]: ''
            });
            setRSize(rSize + 1);
            return true;
        }
    }
    function resetReservedSeats() {
        setReservedSeats({});
        setRSize(0);
    }
    function updateBookingDetails(name, value) {
        setBookingDetails({
            ...bookingDetails,
            [name]: value
        })
    }
    async function bookSeats() {
        const booking = getBooking();
        const { data, error } = await supabase.from('bookings').insert([booking]);
        if (error) {
            dispatch(setNotice('Seats booking failed!'));
            return;
        }
        setReservedSeats({});
        setRSize(0);
        dispatch(setNotice(`Seats for "${booking.movie}" in hall#${booking.hall} has been booked!`));
        setBookingDetails({ ...schema });
    }
    function extractBookedSeats(bookings) {
        bookings = bookings.reduce((acc, booking) => {
            booking.seats.forEach(seat => {
                acc[seat] = booking.booked
            })
            return acc;
        }, {});
        return bookings;
    }
    async function fetchBookings() {
        println("Fetching booked seats for", `"${hall}"`, `"${bookingDetails.movie}"`, `"${show}"`);
        let { data: bookings, error } = await supabase.from('bookings')
            .select('id, seats, booked')
            .eq('hall', hall).eq('movie', bookingDetails.movie).eq('show', show);
        if (error) return null;
        println('bookings', bookings);
        const rawbseats = listToObject(bookings);
        bookings = extractBookedSeats(bookings);
        // println('rawbseats', rawbseats);
        setBookedSeatsRawData(rawbseats);
        println('booked seats', bookings);
        setBookedSeats(bookings);
    }

    function listToObject(list) {
        const obj = {};
        for (const item of list) {
            const keyValue = item.id;
            obj[keyValue] = item.seats;
        }
        return obj;
    }
    const router = useRouter();
    useEffect(() => {
        if (!bookingDetails.movie) {
            if (!bookingDetails.booked_by) router.replace('/halls');
            return;
        }
        fetchBookings();
        const subscription = supabase
            .channel(`hall-${hall}:movie-${bookingDetails.movie}:show-${show}`)
            .on('postgres_changes',
                {
                    event: '*', schema: 'public', table: 'bookings',
                    filter: `show=eq.${show}`
                }, (payload) => {
                    // console.log('saved payload', payload);
                    if (payload.eventType === 'INSERT') {
                        println('Seats booked!');
                        const _seats = extractBookedSeats([payload.new]);
                        println('new bookings', _seats);
                        setBookedSeats(state => {
                            return { ...state, ..._seats };
                        });
                    }
                    else if (payload.eventType === 'UPDATE') {
                        const _seats = extractBookedSeats([payload.new]);
                        println('updated bookings', _seats);
                        setBookedSeats(state => {
                            return { ...state, ..._seats };
                        })
                    }
                    else if (payload.eventType === 'DELETE') {
                        println('Seats deleted!');
                        const id = payload.old;
                        println('deleting...', id, bookedSeatsRawData);
                        const seats = bookedSeatsRawData[id];
                        println(`Seats to be deleted!`, seats);
                        seats.forEach(seat => {
                            delete bookedSeats[seat];
                        })
                        delete bookedSeatsRawData[id];
                        println(`Deleted ${id}`);
                    }
                }).subscribe();
        return () => {
            if (!bookingDetails.movie) subscription.unsubscribe();
        }
    }, [bookingDetails.movie]);
    return (
        <BookingContext.Provider value={{
            movie: { movie, setMovie },
            info: { bookingDetails, setBookingDetails, updateBookingDetails, getBooking },
            booked: { bSize, setBSize, bookedSeats, setBookedSeats },
            reserved: { rSize, setRSize, reservedSeats, setReservedSeats, reserveSeat, resetReservedSeats },
            date: { today, maxDate },
            dbActions: { bookSeats }
        }}>
            {children}
        </BookingContext.Provider>
    )
}