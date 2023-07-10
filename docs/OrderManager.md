# OrderManager









## Methods

### addOrder

```solidity
function addOrder(string _productName, uint256 _price) external nonpayable returns (uint256 _orderId)
```



*Adds a new order to the orderMapping.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _productName | string | The name of the product for the order. |
| _price | uint256 | The price of the product for the order. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _orderId | uint256 | The ID of the newly added order. |

### admin

```solidity
function admin() external view returns (address)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### getOrderInfo

```solidity
function getOrderInfo(uint256 _orderId) external view returns (struct OrderManagerLib.Order)
```



*Retrieves the order information for a given order ID.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderId | uint256 | The ID of the order to retrieve information for. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | OrderManagerLib.Order | OrderManagerLib.Order The order information. |

### orderId

```solidity
function orderId() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### orderMapping

```solidity
function orderMapping(uint256) external view returns (uint256 orderId, string productName, uint256 price, enum OrderManagerLib.OrderStatus status, uint256 timestamp, address orderOwner)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| orderId | uint256 | undefined |
| productName | string | undefined |
| price | uint256 | undefined |
| status | enum OrderManagerLib.OrderStatus | undefined |
| timestamp | uint256 | undefined |
| orderOwner | address | undefined |

### updateOrder

```solidity
function updateOrder(uint256 _orderId, enum OrderManagerLib.OrderStatus _orderStatus) external nonpayable returns (bool)
```



*Updates the status of an order.Throws an exception if the caller is not the admin or the order owner.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderId | uint256 | The ID of the order to update. |
| _orderStatus | enum OrderManagerLib.OrderStatus | The new status of the order. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | bool A boolean indicating whether the update was successful. |



## Events

### OrderAdded

```solidity
event OrderAdded(uint256 orderId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| orderId  | uint256 | undefined |

### OrderUpdated

```solidity
event OrderUpdated(uint256 orderId, enum OrderManagerLib.OrderStatus status)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| orderId  | uint256 | undefined |
| status  | enum OrderManagerLib.OrderStatus | undefined |



## Errors

### NotPrivilegedAccount

```solidity
error NotPrivilegedAccount(address from, address orderOwner)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| from | address | undefined |
| orderOwner | address | undefined |


