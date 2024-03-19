import React from "react";
import "./notification.css";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';


function Notification() {
  return (
    <div class="notification-container">
      <h2 class="text-center mb-5">Thông báo</h2>
      <p class="dismiss text-right">
        <Link to="/" id="dismiss-all">
          <DoneAllIcon className="mx-3 text-success"/>Đã đọc tất cả
        </Link>
      </p>
      <div class=" notification-card notification-invitation">
        <div class="card-body card-body-notification">
          <table>
            <tr>
              <td style={{ width: "70%" }}>
                <div class="card-title-notification">
                  Jane invited you to join '<b>Familia</b>' group
                </div>
              </td>
              <td style={{ width: "30%" }} className="d-flex py-2">
                <Link to="/" class="view-notification mx-2 invisible">
                  <VisibilityIcon />
                </Link>
                <Link to="/" class="dismiss-notification">
                  <CloseIcon />
                </Link>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div class=" notification-card notification-warning">
        <div class="card-body-notification">
          <table>
            <tr>
              <td style={{ width: "70%" }}>
                <div class="card-title-notification">
                  Your expenses for '<b>Groceries</b>' has exceeded its budget
                </div>
              </td>
              <td style={{ width: "30%" }} className="d-flex py-2">
                <Link to="/" class="view-notification mx-2 invisible">
                  <VisibilityIcon />
                </Link>
                <Link to="/" class="dismiss-notification">
                  <CloseIcon />
                </Link>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div class=" notification-card notification-danger">
        <div class="card-body-notification">
          <table>
            <tr>
              <td style={{ width: "70%" }}>
                <div class="card-title-notification">
                  Insufficient budget to create '<b>Clothing</b>' budget
                  category
                </div>
              </td>
              <td style={{ width: "30%" }} className="d-flex py-2">
                <Link to="/" class="view-notification mx-2 invisible">
                  <VisibilityIcon />
                </Link>
                <Link to="/" class="dismiss-notification">
                  <CloseIcon />
                </Link>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div class=" notification-card notification-reminder">
        <div class="card-body-notification">
          <table>
            <tr>
              <td style={{ width: "70%" }}>
                <div class="card-title-notification">
                  You have <b>2</b> upcoming payment(s) this week
                </div>
              </td>
              <td style={{ width: "30%" }} className="d-flex py-2">
                <Link to="/" class="view-notification mx-2 invisible">
                  <VisibilityIcon />
                </Link>
                <Link to="/" class="dismiss-notification">
                  <CloseIcon />
                </Link>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Notification;
