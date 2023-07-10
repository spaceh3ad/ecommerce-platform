// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {OrderManagerLib} from "./OrderManagerLib.sol";

contract OrderManager {
    address public admin;
    uint256 public orderId = 1;
    mapping(uint256 => OrderManagerLib.Order) public orderMapping;

    // Contract constructor
    constructor() {
        admin = msg.sender;
    }

    /**
     * @dev Adds a new order to the orderMapping.
     * @param _productName The name of the product for the order.
     * @param _price The price of the product for the order.
     * @return _orderId The ID of the newly added order.
     */
    function addOrder(
        string memory _productName,
        uint256 _price
    ) external returns (uint256 _orderId) {
        OrderManagerLib.Order memory order = OrderManagerLib.Order({
            orderId: orderId,
            productName: _productName,
            price: _price,
            status: OrderManagerLib.OrderStatus.Pending,
            timestamp: block.timestamp,
            orderOwner: msg.sender
        });

        orderMapping[orderId] = order;

        emit OrderManagerLib.OrderAdded(orderId);

        orderId++;
        return orderId;
    }

    /**
     * @dev Retrieves the order information for a given order ID.
     * @param _orderId The ID of the order to retrieve information for.
     * @return OrderManagerLib.Order The order information.
     */
    function getOrderInfo(
        uint256 _orderId
    ) external view returns (OrderManagerLib.Order memory) {
        return orderMapping[_orderId];
    }

    /**
     * @dev Updates the status of an order.
     * @param _orderId The ID of the order to update.
     * @param _orderStatus The new status of the order.
     * @return bool A boolean indicating whether the update was successful.
     * @dev Throws an exception if the caller is not the admin or the order owner.
     */
    function updateOrder(
        uint256 _orderId,
        OrderManagerLib.OrderStatus _orderStatus
    ) external returns (bool) {
        if (
            msg.sender == admin ||
            msg.sender == orderMapping[_orderId].orderOwner
        ) {
            orderMapping[_orderId].status = _orderStatus;

            emit OrderManagerLib.OrderUpdated(_orderId, _orderStatus);
            return true;
        } else {
            revert OrderManagerLib.NotPrivilegedAccount(
                msg.sender,
                orderMapping[_orderId].orderOwner
            );
        }
    }
}
