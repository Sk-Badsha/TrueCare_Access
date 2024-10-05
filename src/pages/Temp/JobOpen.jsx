import React, { useState } from "react";
import "../../styles/JobOpenStyles.css";
import axios from "axios";
import { message } from "antd";
import { hideLoading, showLoading } from "../../redux/features/alertSlice.js";
import { useDispatch } from "react-redux";
function JobOpen() {
  const [companyName, setCompanyName] = useState("N/A");
  const [openingFor, setOpeningFor] = useState("N/A");
  const [whomToContactName, setWhomToContactName] = useState("N/A");
  const [whomToContactProfileUrl, setWhomToContactProfileUrl] = useState("N/A");
  const [applyLink, setApplyLink] = useState("N/A");
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    console.log(
      companyName,
      openingFor,
      whomToContactName,
      whomToContactProfileUrl,
      applyLink
    );

    dispatch(showLoading());
    const res = await axios.post("/api/v1/temp/job-opening", {
      companyName: companyName.trim() === "" ? "N/A" : companyName,
      openingFor: openingFor.trim() === "" ? "N/A" : openingFor,
      whomToContact: {
        whomToContactName:
          whomToContactName.trim() === "" ? "N/A" : whomToContactName,
        whomToContactProfileUrl:
          whomToContactProfileUrl.trim() === ""
            ? "N/A"
            : whomToContactProfileUrl,
      },
      applyLink: applyLink.trim() === "" ? "N/A" : applyLink,
    });
    dispatch(hideLoading());

    if (res.data.success) {
      message.success("a Mail has been send successfully");
      setCompanyName("");
      setApplyLink("");
      setOpeningFor("");
      setWhomToContactName("");
      setWhomToContactProfileUrl("");
    } else {
      message.error(res.data.message);
    }
  };
  return (
    <>
      <div className="email-container">
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Opening For</th>
              <th>Whom to contact</th>
              <th>Link to Apply</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  required
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => setOpeningFor(e.target.value)}
                />
              </td>
              <td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setWhomToContactName(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="url"
                    placeholder="Profile URL"
                    onChange={(e) => setWhomToContactProfileUrl(e.target.value)}
                  />
                </td>
              </td>
              <td>
                <input
                  type="url"
                  onChange={(e) => setApplyLink(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={handleSubmit}
                >
                  Send Email
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default JobOpen;
