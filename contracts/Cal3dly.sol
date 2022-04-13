// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Cal3dly {
    struct Appointment {
        string title;
        string description;
        uint256 startTime;
        uint256 endTime;
        address attendee;
    }

    mapping(address => Appointment[]) apts;

    function getAppointments(address _owner)
        public
        view
        returns (Appointment[] memory)
    {
        return apts[_owner];
    }

    function addAppointment(
        address _owner,
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
        apts[_owner].push(apt);
        apt.attendee = _owner;
        apts[msg.sender].push(apt);
    }

    function cancelAppointment(address _owner, string memory _title) public {
        Appointment[] memory ownerApts = apts[_owner];
        for (uint256 i = 0; i < ownerApts.length; i++) {
            if (
                ownerApts[i].attendee == msg.sender &&
                (keccak256(abi.encodePacked(ownerApts[i].title)) ==
                    keccak256(abi.encodePacked(_title)))
            ) {
                delete apts[_owner][i];
                break;
            }
        }

        Appointment[] memory userApts = apts[msg.sender];
        for (uint256 i = 0; i < userApts.length; i++) {
            if (
                userApts[i].attendee == _owner &&
                (keccak256(abi.encodePacked(userApts[i].title)) ==
                    keccak256(abi.encodePacked(_title)))
            ) {
                delete apts[msg.sender][i];
                break;
            }
        }
    }

    function cancelAppointment(string memory _title, address _attendee) public {
        Appointment[] memory userApts = apts[msg.sender];
        for (uint256 i = 0; i < userApts.length; i++) {
            if (
                userApts[i].attendee == _attendee &&
                (keccak256(abi.encodePacked(userApts[i].title)) ==
                    keccak256(abi.encodePacked(_title)))
            ) {
                delete apts[msg.sender][i];
                break;
            }
        }

        Appointment[] memory ownerApts = apts[_attendee];
        for (uint256 i = 0; i < ownerApts.length; i++) {
            if (
                ownerApts[i].attendee == msg.sender &&
                (keccak256(abi.encodePacked(ownerApts[i].title)) ==
                    keccak256(abi.encodePacked(_title)))
            ) {
                delete apts[_attendee][i];
                break;
            }
        }
    }
}
