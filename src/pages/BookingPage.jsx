import React, { useEffect, useState } from "react";
import { Container } from "../components/index.js";
import { useParams } from "react-router-dom";
import { message, DatePicker, TimePicker } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice.js";

function BookingPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const [doctor, setDoctor] = useState({});
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const user = useSelector((state) => state.auth.userData);
  const getDoctorDetails = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorDetailsByID",
        {
          doctorId: params.doctorId,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data?.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };
  useEffect(() => {
    getDoctorDetails();
  }, []);

  // handle booking
  const handleBooking = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/users/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          date: date,
          userInfo: user,
          time: time,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(hideLoading());
      setIsAvailable(false);
      console.log(res.data?.data);

      if (res.data?.success) {
        message.success(res.data?.message);
      } else {
        message.error(res.data?.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleBookingAvailability = async () => {
    try {
      if (!date || !time) {
        return alert("Date & Time is required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/users/booking-availability",
        {
          doctorId: params.doctorId,
          date: date,
          time: time,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(hideLoading());

      if (res.data.data === true) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        setIsAvailable(false);
        message.error(res.data?.message);
      }
    } catch (error) {
      console.log(error);
      message.error(error);
    }
  };

  return (
    <Container>
      <h3 className="text-center">Booking Page: </h3>
      <div className="container m-2">
        {doctor && (
          <>
            <h3>
              Dr. {doctor.firstName} {doctor.lastName}
            </h3>
            <h4>Fees: {doctor.feesPerConsultation}</h4>
            <h4>
              Timings: {doctor.timings?.start} - {doctor.timings?.end}
            </h4>
            <div className="d-flex flex-column w-25">
              <DatePicker
                className="my-2"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setDate(value.format("DD-MM-YYYY"));
                  setIsAvailable(false);
                }}
              />
              <TimePicker
                className="my-1"
                format="HH:mm"
                required
                onChange={(value) => {
                  setTime(value ? value.format("HH:mm") : null);
                  setIsAvailable(false);
                }}
              />
              <button
                className="btn btn-primary mt-2"
                onClick={handleBookingAvailability}
              >
                Check Availability
              </button>
              {isAvailable && (
                <button className="btn btn-dark mt-2" onClick={handleBooking}>
                  Book Now
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </Container>
  );
}

export default BookingPage;
