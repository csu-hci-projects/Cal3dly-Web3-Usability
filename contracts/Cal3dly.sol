// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Cal3dly {
    address public owner;

    struct Appointment {
        string title;
        string description;
        uint256 startTime;
        uint256 endTime;
        address attendee;
    }

    Appointment[] apts;

    constructor() {
        owner = msg.sender;
    }

    function getAppointments() public view returns (Appointment[] memory) {
        return apts;
    }

    function addAppointment(
        string memory _title,
        string memory _description,
        uint256 _startTime,
        uint256 _endTime
    ) public {
        Appointment memory apt = Appointment(
            _title,
            _description,
            _startTime,
            _endTime,
            msg.sender
        );
        apts.push(apt);
    }

    function cancelAppointment() public {
        for (uint256 i = 0; i < apts.length; i++) {
            if (apts[i].attendee == msg.sender) {
                delete apts[i];
            }
        }
    }

    function cancelAppointment(address _attendee) public {
        require(msg.sender == owner);
        for (uint256 i = 0; i < apts.length; i++) {
            if (apts[i].attendee == _attendee) {
                delete apts[i];
            }
        }
    }
}
