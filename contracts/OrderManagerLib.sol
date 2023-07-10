// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

library OrderManagerLib {
    struct Order {
        uint256 orderId;
        string productName;
        uint256 price;
        OrderStatus status;
        uint256 timestamp;
        address orderOwner;
    }

    // Enum representing the status of an order
    enum OrderStatus {
        Pending,
        Shipped,
        Accepted,
        Rejected
    }

    // Custom errors
    error InvalidOrderId(uint256 orderId);
    error NotPrivilegedAccount(address from, address orderOwner);

    // Event emitted when a new order is added
    event OrderAdded(uint256 orderId);

    // Event emitted when an order is updated
    event OrderUpdated(uint256 orderId, OrderStatus status);
}
