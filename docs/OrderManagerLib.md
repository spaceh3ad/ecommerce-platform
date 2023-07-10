# OrderManagerLib










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

### InvalidOrderId

```solidity
error InvalidOrderId(uint256 orderId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| orderId | uint256 | undefined |

### NotPrivilegedAccount

```solidity
error NotPrivilegedAccount(address from, address orderOwner)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| from | address | undefined |
| orderOwner | address | undefined |


